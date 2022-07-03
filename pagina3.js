
let tituloQuizz
let imgQuizzURL
let quizzCriado = localStorage.getItem("quizzCriado")
let userInfo = localStorage.getItem("userQuizzes")
let listaQuizzes = []
let pagina = document.querySelector('.page')
let definicoesQuizz = []
let qntPerg = 0
let perguntas = []
let niveis = []
let qntNiveis = 0
let postNiveis
let postPerguntas = []
// let quest= resposta.data.questions;
// let resp= resposta.data.questions.answers;
//Pagina 3.1
function abrePagina3() {
    pagina.innerHTML =
        `
    <div class="pagina3">
            <h1>Começando pelo começo</h1>
            <div class="caixa-defineQuizz">
                <div>
                    <input placeholder="Título do seu quizz" type="text">
                    <input placeholder="URL da imagem do seu quizz" type="text">
                    <input placeholder="Quantidade de perguntas do quizz" type="number">
                    <input placeholder="Quantidade de níveis do quizz" type="number">
                </div>
            </div>
            <div onclick="guardaInputs()" class="button">Prosseguir para criar perguntas</div>
        </div>
    `
    scrollTop();
}
function guardaInputs() {

    definicoesQuizz = []
    //Pega todos os inputs:
    let inputsList = pagina.querySelectorAll('input')
    inputsList.forEach(input => {
        definicoesQuizz.push(input.value)
    });
    tituloQuizz = definicoesQuizz[0]
    imgQuizzURL = definicoesQuizz[1]
    qntPerg = definicoesQuizz[2]
    qntNiveis = definicoesQuizz[3]

    //Passa os inputs para verificação:
    verificaRequisitosCriacao()
}
function verificaRequisitosCriacao() {
    let urlOK = true
    let tituloOK = false
    let qntPergOK = false
    let qntNiveisOK = false


    //verifica se as informaçoes batem com os requisitos:
    if (imgQuizzURL !== "") {
        if (isURL(imgQuizzURL) === false) {
            urlOK = false;
            alert('O link não é válido')
        }
        else { urlOK = true };
    }

    if (tituloQuizz.length >= 20 && tituloQuizz.length <= 65) {
        tituloOK = true
    } else if (tituloQuizz === "") { return } else { alert(`Seu título tem apenas ${tituloQuizz.length} caracteres, quando deveria ter entre 20 a 65 caracteres.`) }

    if (qntPerg >= 3) {
        qntPergOK = true
    } else if (qntPerg === "") { return } else { alert('A quantidade de perguntas deve ter no mínimo três perguntas.') }

    if (qntNiveis >= 2) {
        qntNiveisOK = true
    } else if (qntNiveis === "") { return } else { alert('É necessário que se tenham ao menos dois niveis.') }

    // Se tudo estiver ok:
    if (tituloOK === true && urlOK === true && qntPergOK === true && qntNiveisOK === true) {
        crieSuasPerguntas()
    }
    console.log(urlOK)
}
//Pagina 3.2
function crieSuasPerguntas() {
    let perguntasHTML = ''

    for (let i = 1; i <= qntPerg; i++) {
        perguntasHTML +=
            `
<div onclick="abreGaveta(this, 'gaveta-perguntas')" class="caixa-pergunta pergunta${i}">
                <div class="gaveta-titulo">
                    <h1>Pergunta ${i}</h1>
                    <img src="img/createicon.svg">
                </div>
                <div class="gaveta-perguntas hidden">
                    <div>
                        <h1>Pergunta ${i}</h1> 
                        <input placeholder="Texto da pergunta" type="text">
                        <div onclick="trocaInput(this)" class="input-change">
                        <p> Alternar input </p> <ion-icon name="eyedrop"></ion-icon>
                        </div>
                        <input placeholder="Cor de fundo da pergunta" type="text" class= "input-color">
                    </div>
                    <div>
                        <h1>Resposta correta</h1>
                        <input placeholder="Resposta correta" type="text">
                        <input placeholder="URL da imagem" type="text">
                    </div>
                    <div>
                        <h1>Respostas incorretas</h1>
                        <input placeholder="Resposta incorreta 1" type="text">
                        <input placeholder="URL da imagem 1" type="text">
                    </div>
                    <div>
                        <input placeholder="Resposta incorreta 2" type="text">
                        <input placeholder="URL da imagem 2" type="text">
                    </div>
                    <div>
                        <input placeholder="Resposta incorreta 3" type="text">
                        <input placeholder="URL da imagem 3" type="text">
                    </div>
                </div>
            </div>
`
    }
    pagina.innerHTML =
        `
    <div class="pagina3">
            <h1>Crie suas perguntas</h1>
            ${perguntasHTML}
            <div onclick="recebePerguntas()" class="button">Prosseguir para criar níveis</div>
        </div>
    `
    //Depois de criar o HTML, abre a primeira gaveta:
    document.querySelector('.gaveta-titulo').classList.add('hidden')
    document.querySelector('.gaveta-perguntas').classList.remove('hidden')
    scrollTop();
}
function trocaInput(inputCLKD) {
    parentNode = inputCLKD.parentNode
    if (parentNode.querySelector('.input-color').type === "color") {
        parentNode.querySelector('.input-color').type = "text"
    }
    else {
        parentNode.querySelector('.input-color').type = "color"
    }
}

function abreGaveta(caixa, caixaFechada) {
    let gaveta = caixa.querySelector('.gaveta-titulo')
    gaveta.classList.add('hidden')
    let caixaF = caixa.querySelector(`.${caixaFechada}`)
    caixaF.classList.remove('hidden')
    console.log(caixaFechada)
}


function recebePerguntas() {
    perguntas = []
    let dataPerg = []
    postPerguntas = []

    for (i = 1; i <= qntPerg; i++) {
        let pergunta = document.querySelector(`.pergunta${i}`);
        let inputsList = pergunta.querySelectorAll('input');
        //salva em dataPerg apenas as informações de cada caixa de perguntas:
        inputsList.forEach(input => { dataPerg.push(input.value) });
        //coloca dento do perguntas um objeto com as informações do array anterior, para facilitar a manipulação:
        perguntas.push(
            {
                textoDaPergunta: dataPerg[0],
                corDeFundoDaPergunta: dataPerg[1],
                respostaCorreta: dataPerg[2],
                urlDaImagem: dataPerg[3],
                respostaIncorreta1: dataPerg[4],
                urlDaImagem1: dataPerg[5],
                respostaIncorreta2: dataPerg[6],
                urlDaImagem2: dataPerg[7],
                respostaIncorreta3: dataPerg[8],
                urlDaImagem3: dataPerg[9]
            });
        if (dataPerg[6] === "" && dataPerg[8] === "") {
            postPerguntas.push(
                {
                    title: dataPerg[0],
                    color: dataPerg[1],
                    answers: [
                        {
                            text: dataPerg[2],
                            image: dataPerg[3],
                            isCorrectAnswer: true
                        },
                        {
                            text: dataPerg[4],
                            image: dataPerg[5],
                            isCorrectAnswer: false
                        }
                    ]
                },
            );
        }
        if (dataPerg[6] !== "" && dataPerg[8] === "") {
            postPerguntas.push(
                {
                    title: dataPerg[0],
                    color: dataPerg[1],
                    answers: [
                        {
                            text: dataPerg[2],
                            image: dataPerg[3],
                            isCorrectAnswer: true
                        },
                        {
                            text: dataPerg[4],
                            image: dataPerg[5],
                            isCorrectAnswer: false
                        },
                        {
                            text: dataPerg[6],
                            image: dataPerg[7],
                            isCorrectAnswer: false
                        }
                    ]
                },
            );
        }
        if (dataPerg[6] === "" && dataPerg[8] !== "") {
            postPerguntas.push(
                {
                    title: dataPerg[0],
                    color: dataPerg[1],
                    answers: [
                        {
                            text: dataPerg[2],
                            image: dataPerg[3],
                            isCorrectAnswer: true
                        },
                        {
                            text: dataPerg[4],
                            image: dataPerg[5],
                            isCorrectAnswer: false
                        },
                        {
                            text: dataPerg[8],
                            image: dataPerg[9],
                            isCorrectAnswer: false
                        }
                    ]
                },
            );
        }
        if (dataPerg[6] !== "" && dataPerg[8] !== "") {
            postPerguntas.push(
                {
                    title: dataPerg[0],
                    color: dataPerg[1],
                    answers: [
                        {
                            text: dataPerg[2],
                            image: dataPerg[3],
                            isCorrectAnswer: true
                        },
                        {
                            text: dataPerg[4],
                            image: dataPerg[5],
                            isCorrectAnswer: false
                        },
                        {
                            text: dataPerg[6],
                            image: dataPerg[7],
                            isCorrectAnswer: false
                        },
                        {
                            text: dataPerg[8],
                            image: dataPerg[9],
                            isCorrectAnswer: false
                        }
                    ]
                },
            );
        }


        // limpa dataPerg para que ao voltar no inicio do loop, fiquem apenas as informações da próxima caixa de pergunta.
        dataPerg = [];
    }
    verificaRequisitosPerguntas()
    console.log(perguntas)
}

function verificaRequisitosPerguntas() {
    let tudoNosConformes = 0
    //Verifica requisitos:
    perguntas.forEach((item, indice) => {
        let isHexadecimal = verificaHexadecimial(item.corDeFundoDaPergunta)

        if ((item.textoDaPergunta).length < 20 && item.textoDaPergunta !== "") {
            alert('O texto das perguntas devem ter no mínimo 20 caracteres. ')
            tudoNosConformes--
        }
        if ((item.corDeFundoDaPergunta !== "") && ((item.corDeFundoDaPergunta).length !== 7 || item.corDeFundoDaPergunta[0] !== "#" || isHexadecimal === false)) {
            alert('Cor de fundo: deve ser uma cor em hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)')
            tudoNosConformes--
        }
        if ((item.urlDaImagem !== "") && (isURL(item.urlDaImagem) === false)) {
            alert(`O link da imagem da resposta correta na pergunta ${indice + 1} não é válido.`)
            tudoNosConformes--
        }
        if ((item.urlDaImagem1 !== "") && (isURL(item.urlDaImagem1) === false)) {
            alert(`O link da imagem da resposta incorreta(1) na pergunta ${indice + 1} não é válido.`)
            tudoNosConformes--
        }
        if ((item.urlDaImagem2 !== "") && (isURL(item.urlDaImagem2) === false)) {
            alert(`O link da imagem da resposta incorreta(2) na pergunta ${indice + 1} não é válido.`)
            tudoNosConformes--
        }
        if ((item.urlDaImagem3 !== "") && (isURL(item.urlDaImagem3) === false)) {
            alert(`O link da imagem da resposta incorreta(3) na pergunta ${indice + 1} não é válido.`)
            tudoNosConformes--
        }
        if (item.respostaCorreta !== "" && item.urlDaImagem === "") {
            alert(`Erro na pergunta(${indice + 1}): Adicione um URL. `)
            tudoNosConformes--
        }
        if (item.respostaIncorreta1 !== "" && item.urlDaImagem1 === "") {
            alert(`Erro na pergunta(${indice + 1}): Adicione um URL na resposta incorreta 1. `)
            tudoNosConformes--
        }
        if (item.respostaIncorreta2 !== "" && item.urlDaImagem2 === "") {
            alert(`Erro na pergunta(${indice + 1}): Adicione um URL na resposta incorreta 2. `)
            tudoNosConformes--
        }
        if (item.respostaIncorreta3 !== "" && item.urlDaImagem3 === "") {
            alert(`Erro na pergunta(${indice + 1}): Adicione um URL na resposta incorreta 3. `)
            tudoNosConformes--
        }
        if (item.textoDaPergunta === "" && (item.respostaCorreta !== "" || item.respostaIncorreta1 !== "")) {
            alert(`Erro na pergunta(${indice + 1}): veja o campo de texto da pergunta e tente novamente. `)
            tudoNosConformes--
        }
        if (item.corDeFundoDaPergunta === "" && (item.textoDaPergunta !== "" || item.respostaCorreta !== "" || item.respostaIncorreta1 !== "")) {
            alert(`Erro na pergunta(${indice + 1}): adicione uma cor de fundo. `)
            tudoNosConformes--
        }
        else {
            // adiciona +1 pra cada caixa de pergunta preenchida corretamente
            tudoNosConformes++
        }
    })
    if (perguntas[0].textoDaPergunta === "" || perguntas[1].textoDaPergunta === "" || perguntas[2].textoDaPergunta === "") {
        alert('Deve ter ao menos 3 perguntas preenchidas.')
        tudoNosConformes--;
    }
    console.log(tudoNosConformes, qntPerg)
    if (tudoNosConformes == qntPerg) {

        verificaAntesPostagem()
    }
}
function verificaAntesPostagem() {
    let tudoNosConformes = 0
    perguntas.forEach((item, indice) => {
        if ((item.textoDaPergunta !== "") && (item.respostaCorreta === "" || item.respostaIncorreta1 === "")) {
            alert(`Erro na pergunta(${indice + 1}): Toda pergunta deve ter ao menos uma resposta correta e uma incorreta.`)
            //Se toda resposta precisar de uma imagem, adicionar a verificação aqui.
        }
        else {
            tudoNosConformes++
        }
    })
    if (tudoNosConformes == qntPerg) {
        crieSeusNiveis();
    }
    else {
        alert('Algo deu errado, veja os campos e tente novamente...')
    }
}

function verificaHexadecimial(cor) {
    let isHex = false
    for (let i = 0; i < cor.length; i++) {
        if (isNaN(cor[i])) {
            let letra = cor[i].toLowerCase()
            if (letra === "a" || letra === "b" || letra === "c" || letra === "d" || letra === "e" || letra === "f" || letra === "#") {
                isHex = true
            }
            else {
                isHex = false
                return false
            }
        }
        else {
            isHex = true
        }
    }
    return isHex;
}
function isURL(url) {
    try { promessaUrl = new URL(url); } catch (_) {
        return false
    }
}

//Pagina 3.3

function crieSeusNiveis() {
    let niveisHTML = ''
    for (let i = 1; i <= qntNiveis; i++) {
        niveisHTML +=
            `
<div onclick="abreGaveta(this, 'gaveta-niveis')" class="caixa-nivel nivel${i}">
    <div class="gaveta-titulo">
        <h1>Nivel ${i}</h1>
        <img src="img/createicon.svg">
    </div>
    <div class="gaveta-niveis hidden">
        <div>
            <h1>Nivel ${i}</h1>
            <input placeholder="Título do nível" type="text">
            <input placeholder="% de acerto mínima" type="number">
            <input placeholder="URL da imagem do nível" type="text">
            <input placeholder="Descrição do nível" type="text">
        </div>
    </div>
</div>
`
    }
    pagina.innerHTML =
        `
<div class="pagina3">
    <h1>Agora, decida os níveis</h1>
    ${niveisHTML}
    <div onclick="recebeNiveis()" class="button">Finalizar Quizz</div>
</div>
`
    document.querySelector('.gaveta-titulo').classList.add('hidden')
    document.querySelector('.gaveta-niveis').classList.remove('hidden')
    scrollTop();
}
function scrollTop() {
    document.querySelector('h1').scrollIntoView()
}
function recebeNiveis() {
    niveis = []
    let dataInputs = []
    postNiveis = []

    for (i = 1; i <= qntNiveis; i++) {
        let nivel = document.querySelector(`.nivel${i}`);
        let inputsList = nivel.querySelectorAll('input');
        //salva em dataPerg apenas as informações de cada caixa de perguntas:
        inputsList.forEach(input => { dataInputs.push(input.value) });
        //coloca dento do perguntas um objeto com as informações do array anterior, para facilitar a manipulação:
        if (dataInputs[1] === "") {
            alert(`Adicione um numero válido no nivel${i}`)
            return;
        }
        niveis.push({
            tituloDoNivel: dataInputs[0],
            acertoMinimo: dataInputs[1],
            urlDaImagem: dataInputs[2],
            descNivel: dataInputs[3]
        })
        
        if (i === qntNiveis){
            postNiveis.push({
                title: dataInputs[0],
                image: dataInputs[2],
                text: dataInputs[3],
                minValue: dataInputs[1]
            }
            )
        }
        else {
            postNiveis.push({
                title: dataInputs[0],
                image: dataInputs[2],
                text: dataInputs[3],
                minValue: dataInputs[1]
            },
            )
        }
        console.log(postNiveis)
        ;
        // limpa inputsList para que ao voltar no inicio do loop, fiquem apenas as informações da próxima caixa de pergunta.
        dataInputs = [];
    }
    verificaNiveis()
    console.log(niveis)
}

function verificaNiveis() {
    let umNivel0 = false
    let tudoNosConformes = 0
    niveis.forEach((item, index) => {
        if (item.tituloDoNivel !== "" && item.tituloDoNivel.length < 10) {
            alert(`Erro no nivel(${index + 1}): Título do nível deve ter no mínimo 10 caracteres. `)
            tudoNosConformes--
        }
        if (item.acertoMinimo !== "" && (item.acertoMinimo > 100 || item.acertoMinimo < 0)) {
            alert(`Erro no nivel(${index + 1}): O numero deve estar entre 0 e 100. `)
            tudoNosConformes--
        }
        if (item.urlDaImagem !== "" && (isURL(item.urlDaImagem) === false)) {
            alert(`Erro no nivel(${index + 1}): Deve inserir um URL válido. `)
            tudoNosConformes--
        }
        if (item.descNivel !== "" && item.descNivel.length < 30) {
            alert(`Erro no nivel(${index + 1}): A descrição deve ter mais que 30 caracteres. `)
            tudoNosConformes--
        }
        if (item.tituloDoNivel !== "" && item.urlDaImagem === "") {
            alert(`Erro no nivel(${index + 1}): Adicione um URL. `)
            tudoNosConformes--
        }
        if (item.descNivel === "" && (item.acertoMinimo !== "" || item.tituloDoNivel !== "" || item.urlDaImagem !== "")) {
            alert(`Erro no nivel(${index + 1}): Adicione uma descrição. `)
            tudoNosConformes--
        }
        if (item.acertoMinimo !== "" && (item.acertoMinimo == 0)) {
            tudoNosConformes++
            umNivel0 = true
            return
        }
        else { tudoNosConformes++ }
    })
    if (umNivel0 === false) {
        alert('Deve haver ao menos um nivel com 0% de acerto mínimo.')
        return;
    }
    if ((niveis[0].tituloDoNivel === "" || niveis[0].descNivel === "" || niveis[0].descNivel === "") || (niveis[1].tituloDoNivel === "" || niveis[1].descNivel === "" || niveis[1].descNivel === "")) {
        alert('Você deve preencher ao menos 2 niveis.')
        return
    }
    if (tudoNosConformes == qntNiveis && umNivel0 === true) {
        postagemAPI()
    }
}
function postagemAPI() {
    document.querySelector('.background-loading').classList.remove('hidden')
    const quizz =
    {
            title: tituloQuizz,
            image: imgQuizzURL,
            questions: postPerguntas,
            levels: postNiveis
        };
        let promise = axios.post("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes", quizz)
        promise.then(quizzFinalizado)
    }
    
    function quizzFinalizado(resposta){
        document.querySelector('.background-loading').classList.add('hidden')
        pagina.innerHTML =

        `<div class="pagina3">
        <h1>Seu quizz está pronto!</h1>
        <div class="thumb" onclick="abrePagina2(${resposta.data.id})"><div class="background"><img src="${resposta.data.image}"></div><p>${resposta.data.title} </p></div>
        <div onclick="abrePagina2(${resposta.data.id})" class="button">Acessar Quizz</div>
        <h4 on onclick="restartPage()"> Voltar para a home </h4> 
        </div>
        `


        if ( quizzCriado === "true"){
            listaQuizzes = localStorage.getItem("userQuizzes")
            listaQuizzes = JSON.parse(listaQuizzes)
            listaQuizzes.push(resposta.data)
            listaQuizzes = JSON.stringify(listaQuizzes)
            localStorage.setItem("userQuizzes", listaQuizzes)
        }
        else {

            listaQuizzes.push(resposta.data)
            listaQuizzes = JSON.stringify(listaQuizzes)
            localStorage.setItem("userQuizzes", listaQuizzes)
        }
            
            quizzCriado = localStorage.setItem("quizzCriado", "true")
    }
