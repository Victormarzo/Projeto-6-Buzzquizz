let quizzCriado = false



function abrePagina3() {
    alert('ainda não esta pronta')
}

function crieSuasPerguntas() {
    pagina.innerHTML =
        `
    <div class="pagina3">
            <h1>Crie suas perguntas</h1>
            <div class="caixa-pergunta">
                <div>
                    <h1>Pergunta 1</h1>
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
            <div class="caixa-pergunta">
                <h1>Pergunta 2</h1>
            </div>
            <div class="button">Prosseguir para criar níveis</div>
        </div>
    `
}