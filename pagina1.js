
function criaQuizz() {
    abrePagina3()
}

function button() {
    if(quizzCriado === "true" && userInfo === null){
        quizzCriado = localStorage.setItem("quizzCriado", "false")
    }

    if (quizzCriado === "true") {
     let uQuizzes = JSON.parse(userInfo)
     let userHTML = ''
for ( let i = 0; i < uQuizzes.length; i++){
    userHTML +=
    `
    <div class="thumb">
        <div onclick="abrePagina2(${uQuizzes[i].id})"class="background"><img src="${uQuizzes[i].image}"></div>
        <p>${uQuizzes[i].title} </p>
    </div>
    `
}
        pagina.innerHTML = 
   
        `
    <div class="pagina1">
        <div class="seus-quizzes">
            <div onclick="abrePagina3()" class="small-button">
                <h1>SeusQuizzes</h1>
                <ion-icon onclick="abrePagina3()" name="add-circle"></ion-icon>
            </div>
            <div class="container-quizz">
               ${userHTML} 
            </div>
        </div>
    </div>
        `
    }
    else {
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
}
button();
procuraQuizz();

function procuraQuizz(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes")
    promise.then(carregaQuizz);
    promise.catch(error);
    
}
function error(erro){
    console.log(erro.response.status);
}
function carregaQuizz(resposta){
    
    
    let uQuizzes = JSON.parse(userInfo)
    pagina.innerHTML+=`
    
    <div class="quizzTodos" <h1>Todos os Quizzes</h1></div>
    <div class="quizzList">
        
    </div>`
    
    let list=document.querySelector(".quizzList");
    for( let i=0;i<resposta.data.length;i++){
       if(uQuizzes!==null){
        for (let y=0;y < uQuizzes.length;y++){
        if(resposta.data[i].id !== uQuizzes[y].id){
            list.innerHTML+= `
    
            
        
        <div class="thumb" onclick="abrePagina2(${resposta.data[i].id})">
        <div class="background"><img src="${resposta.data[i].image}"></div>
        <p>${resposta.data[i].title} </p>
        </div>
    
    `
    }}
}else{
    list.innerHTML+= `

        <div class="thumb" onclick="abrePagina2(${resposta.data[i].id})">
        <div class="background"><img src="${resposta.data[i].image}"></div>
        <p>${resposta.data[i].title} </p>
        </div>
    
    `
}



}}