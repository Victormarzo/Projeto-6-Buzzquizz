function abrePagina2(elemento){
    console.log(elemento);
    
    const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${elemento}`)
    promise.then(exibeQuizz);
    promise.catch(error);
}
function error(erro){
    console.log(erro.response.status);
}

function exibeQuizz(resposta){
    let titulo=document.querySelector(".caixaTituloQuizz");
    let quest=resposta.data.questions;
    let resp=resposta.data.questions.answers;
    console.log(resposta);
    titulo.innerHTML=
    
    `
    <div class="tituloQuizz">
    <div class="caixaTitulo">
        <img src="${resposta.data.image}" >
        <p>${resposta.data.title}</p>
    </div>
    </div>
    
    `
    pagina.innerHTML='<div class="listaQuizz"></div>';
    let listaQ=document.querySelector(".listaQuizz");
    for(let i=0;i<quest.length;i++){
        
        
        listaQ.innerHTML+=
        `            
        <div class="caixaQuizz caixa${[i]}">
            <div class="perguntaQuizz "><p>${quest[i].title}</p></div>
        </div>
        
        `
        


        for(let y=0;y<quest[i].answers.length;y++){
            
            let caixaQ=document.querySelector(`.caixa${i}`);
            caixaQ.innerHTML+=
            `
            <div class="opcao ">
            <img src="${quest[i].answers[y].image}" >
            <p>${quest[i].answers[y].text}</p>
            </div>
            `
            

        }
        
    }


}
