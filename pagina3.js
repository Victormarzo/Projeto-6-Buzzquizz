let pagina = document.querySelector('.page')
let quizzCriado = false
let definicoesQuizz = []



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
    let titulo, url, qntPerg, qntNiveis
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
    let promessaUrl

        
    //verifica se as informaçoes batem com os requisitos:
    if (url !== "") {
        try { promessaUrl = new URL(url); } catch (_) {
            urlOK = false
            alert('O link não é válido')
        }
    }

    if (titulo.length >= 20 && titulo.length <= 65) {
        tituloOK = true
    } else if (titulo === "") {return} else { alert(`Seu título tem apenas ${titulo.length} caracteres, quando deveria ter entre 20 a 65 caracteres.`) }
    
    if (qntPerg >= 3) {
        qntPergOK = true
    } else if (qntPerg === "") {return} else { alert('Deve-se ter no mínimo três perguntas.') }
    
    if (qntNiveis >= 2) {
        qntNiveisOK = true
    } else if (titulo === "") {return} else { alert('É necessário que se tenham ao menos dois niveis.') }

    // Se tudo estiver ok:
    if (tituloOK === true && urlOK === true && qntPergOK === true && qntNiveisOK === true) {
        crieSuasPerguntas(titulo, url, qntPerg, qntNiveis)
    }

}

function crieSuasPerguntas(titulo, url, qntPerg, qntNiveis) {
    let perguntasHTML = ''
    qntPerg++
    for (let i = 1; i < qntPerg; i++){
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
            <div class="button">Prosseguir para criar níveis</div>
        </div>
    `
    //Depois de criar o HTML, abre a primeira gaveta:
    document.querySelector('.gaveta-titulo').classList.add('hidden')
    document.querySelector('.gaveta-perguntas').classList.remove('hidden')
}

function abreGaveta(caixaPerguntas){
let gaveta = caixaPerguntas.querySelector('.gaveta-titulo')
gaveta.classList.add('hidden')
let perguntas = caixaPerguntas.querySelector('.gaveta-perguntas')
perguntas.classList.remove('hidden')
}