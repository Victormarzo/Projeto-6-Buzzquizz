

function criaQuizz() {
    abrePagina3()
}


function button() {
    if (quizzCriado === false) {

        pagina.innerHTML =
            `
            <div class="pagina1">

            <div class="button-container">
                <div>
                    <p>Você não criou nenhum quizz ainda :(</p>
                </div>
                <button onclick="abrePagina3()">Criar Quizz</button>
            </div>
        </div>
        `
    }
    else {
        pagina.innerHTML = 
        `
        <div class="pagina1">
            <div class="small-button">
                <h1>SeusQuizzes</h1>
                <ion-icon onclick="abrePagina3()" name="add-circle"></ion-icon>
            </div>
        </div>
        `
    }
}
button();