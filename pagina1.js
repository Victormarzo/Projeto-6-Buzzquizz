let pagina = document.querySelector('.page')

function button() {
    pagina.innerHTML =
        `
<div class="button-container">
    <div>
        <p>Você não criou nenhum quizz ainda :(</p>
    </div>
    <button onclick="criaQuizz()">Criar Quizz</button>
</div>
`
}
function criaQuizz() {
    abrePagina3()
}
button();