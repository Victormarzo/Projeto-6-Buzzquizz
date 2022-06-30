

function criaQuizz() {
    abrePagina3()
}


function button() {
    if (quizzCriado === false) {

        pagina.innerHTML =
            `
            

            <div class="button-container">
                <div>
                    <p>Você não criou nenhum quizz ainda :(</p>
                </div>
                <button onclick="abrePagina3()">Criar Quizz</button>
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
procuraQuizz();

function procuraQuizz(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(carregaQuizz);
    promise.catch(error);
    
}
function error(erro){
    console.log(erro.response.status);
}
function carregaQuizz(resposta){
    pagina.innerHTML+=`<div class="quizzList">
            
    </div>`
    
    let list=document.querySelector(".quizzList")
    for( let i=2;i<8;i++){
    list.innerHTML+= `
    
            
        
    <div class="thumb"><div class="background"><img src="${resposta.data[i].image}"></div><p>${resposta.data[i].title} </p></div>
    
    `
}}