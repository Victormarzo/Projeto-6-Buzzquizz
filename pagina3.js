let pagina = document.querySelector('.page')
let quizzCriado = false
let definicoesQuizz = []
let qntPerg = null
let perguntas = []

function abrePagina3() {
    pagina.innerHTML =
        `
    <div class="pagina3">
            <h1>Começando pelo começo</h1>
            <div class="caixa-defineQuizz">
                <div>
                    <input placeholder="Título do seu quizz" type="text">
                    <input placeholder="URL da imagem do seu quizz" type="text">
                    <input placeholder="Quantidade de perguntas do quizz" type="text">
                    <input placeholder="Quantidade de níveis do quizz" type="text">
                </div>
            </div>
            <div onclick="guardaInputs()" class="button">Prosseguir para criar perguntas</div>
        </div>
    `
}
function guardaInputs() {
    let titulo, url, qntNiveis
    definicoesQuizz = []
    //Pega todos os inputs:
    let inputsList = pagina.querySelectorAll('input')
    inputsList.forEach(input => {
        definicoesQuizz.push(input.value)
    });
    console.log(definicoesQuizz)
    titulo = definicoesQuizz[0]
    url = definicoesQuizz[1]
    qntPerg = definicoesQuizz[2]
    qntNiveis = definicoesQuizz[3]
    //Passa os inputs para verificação:
    verificaRequisitosCriacao(titulo, url, qntPerg, qntNiveis)
}
function verificaRequisitosCriacao(titulo, url, qntPerg, qntNiveis) {
    let urlOK = true
    let tituloOK = false
    let qntPergOK = false
    let qntNiveisOK = false


    //verifica se as informaçoes batem com os requisitos:
    if (url !== "") {
        if (isURL(url) === false) {
            urlOK = false;
            alert('O link não é válido')
        }
        else { urlOK = true };
    }

    if (titulo.length >= 20 && titulo.length <= 65) {
        tituloOK = true
    } else if (titulo === "") { return } else { alert(`Seu título tem apenas ${titulo.length} caracteres, quando deveria ter entre 20 a 65 caracteres.`) }

    if (qntPerg >= 3) {
        qntPergOK = true
    } else if (qntPerg === "") { return } else { alert('Deve-se ter no mínimo três perguntas.') }

    if (qntNiveis >= 2) {
        qntNiveisOK = true
    } else if (titulo === "") { return } else { alert('É necessário que se tenham ao menos dois niveis.') }

    // Se tudo estiver ok:
    if (tituloOK === true && urlOK === true && qntPergOK === true && qntNiveisOK === true) {
        crieSuasPerguntas(titulo, url, qntNiveis)
    }
    console.log(urlOK)

}

function crieSuasPerguntas(titulo, url, qntNiveis) {
    let perguntasHTML = ''

    for (let i = 1; i <= qntPerg; i++) {
        perguntasHTML +=
            `
<div onclick="abreGaveta(this)" class="caixa-pergunta pergunta${i}">
                <div class="gaveta-titulo">
                    <h1>Pergunta ${i}</h1>
                    <img src="img/createicon.svg">
                </div>
                <div class="gaveta-perguntas hidden">
                    <div>
                        <h1>Pergunta ${i}</h1>
                        <input placeholder="Texto da pergunta" type="text">
                        <input placeholder="Cor de fundo da pergunta" type="text">
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
}

function abreGaveta(caixaPerguntas) {
    let gaveta = caixaPerguntas.querySelector('.gaveta-titulo')
    gaveta.classList.add('hidden')
    let perguntas = caixaPerguntas.querySelector('.gaveta-perguntas')
    perguntas.classList.remove('hidden')
}


function recebePerguntas() {
    perguntas = []
    let dataPerg = []

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
        // limpa dataPerg para que ao voltar no inicio do loop, fiquem apenas as informações da próxima caixa de pergunta.
        dataPerg = [];
    }
    verificaRequisitosPerguntas()
    console.log(perguntas)
}

function verificaRequisitosPerguntas() {
    let tudoNosConformes = 0
    perguntas.forEach((item, indice) => {

        if ((item.textoDaPergunta).length < 20 && item.textoDaPergunta !== "") {
            alert('O texto das perguntas devem ter no mínimo 20 caracteres. ')
        }
        if (item.corDeFundoDaPergunta !== "") {
            let isHexadecimal = verificaHexadecimial(item.corDeFundoDaPergunta)
            if (((item.corDeFundoDaPergunta).length !== 7 || item.corDeFundoDaPergunta[0] !== "#" || isHexadecimal === false))
                alert('Cor de fundo: deve ser uma cor em hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)')
        }
        if (item.urlDaImagem !== "") {
            if (isURL(item.urlDaImagem) === false) {
                alert(`O link da imagem da resposta correta na pergunta ${indice + 1} não é válido.`)
            }
        }
        if (item.urlDaImagem1 !== "") {
            if (isURL(item.urlDaImagem1) === false) {
                alert(`O link da imagem da resposta incorreta(1) na pergunta ${indice + 1} não é válido.`)
            }
        }
        if (item.urlDaImagem2 !== "") {
            if (isURL(item.urlDaImagem2) === false) {
                alert(`O link da imagem da resposta incorreta(2) na pergunta ${indice + 1} não é válido.`)
            }
        }
        if (item.urlDaImagem3 !== "") {
            if (isURL(item.urlDaImagem3) === false) {
                alert(`O link da imagem da resposta incorreta(3) na pergunta ${indice + 1} não é válido.`)
            }
        }
        else {
            // adiciona +1 pra cada caixa de pergunta preenchida corretamente
            tudoNosConformes++
        }
    })
    console.log(tudoNosConformes, qntPerg)
    if (tudoNosConformes == qntPerg) {

        verificaAntesPostagem()
    }
    else {
        alert('Algo deu errado, verifique as caixas de texto.')
    }
}
function verificaAntesPostagem() {
    let tudoNosConformes = 0
    perguntas.forEach((item, indice) => {
        if (item.textoDaPergunta !== ""){
           if(item.respostaCorreta === "" || item.respostaIncorreta1 === "") {
            alert(`Erro na pergunta(${indice + 1}): Toda pergunta deve ter ao menos uma resposta correta e uma incorreta.`)
           }
           //Se toda resposta precisar de uma imagem, adicionar a verificação aqui.
        }
        else {
            tudoNosConformes++
        }
    })
    if(tudoNosConformes == qntPerg){
        //add função de postagem aqui:
        alert('Postagem não está pronta')
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