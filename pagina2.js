let cont=0;
let qtdPerguntas;
let acertos=0;
let resultadosP;
let id;

function abrePagina2(elemento){
    //console.log(elemento);
    id=elemento;
    const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${elemento}`)
    promise.then(exibeQuizz);
    promise.catch(error);
}
function error(erro){
    //console.log(erro.response.status);
}
function comparador() { 
	return Math.random() - 0.5; 
}
function exibeQuizz(resposta){
    
    let titulo=document.querySelector(".caixaTituloQuizz");
    let quest=resposta.data.questions;
    
    let listaResposta =[];
    //console.log(resposta);
    
    titulo.innerHTML=
    
    `
    <div class="tituloQuizz">
    <div class="caixaTitulo opaco">
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
        <div class="caixaQuizz caixa${[i]} naoClicado">
            <div class="perguntaQuizz "><p>${quest[i].title}</p></div>
        </div>
        
        `
        let perguntaQ=document.querySelector(`.caixa${i} .perguntaQuizz`);
            perguntaQ.style.background=`${quest[i].color}`;
        let caixaQ=document.querySelector(`.caixa${i}`);

        for(let y=0;y<quest[i].answers.length;y++){
            
            
            respostaTemplate =
            `
            <div class="opcao ${quest[i].answers[y].isCorrectAnswer} " onclick="escolheOpcao(this)">
            <img src="${quest[i].answers[y].image}" >
            <p>${quest[i].answers[y].text}</p>
            </div>
            `

            listaResposta.push(respostaTemplate);
        }
        listaResposta.sort(comparador);
        for(let c=0;c<listaResposta.length;c++){
        caixaQ.innerHTML += listaResposta[c];
        
    }listaResposta=[];
    }

    let scrol =document.querySelector(".tituloQuizz");
    scrol.scrollIntoView();

    armazenaResultado(resposta);
}
function armazenaResultado(resposta){
    qtdPerguntas= resposta.data.questions.length;
    resultadosP =resposta.data.levels;
    
    
}



function escolheOpcao (elemento){
    elemento.classList.add("escolha");
    let pai=elemento.parentNode;
    pai.classList.add ("clicado");
    pai.classList.remove ("naoClicado");
    let listaOpcoes=document.querySelectorAll(".clicado .opcao");
    
    for(let i =0;i<listaOpcoes.length;i++){
       listaOpcoes[i].removeAttribute("onclick");
        if(listaOpcoes[i].classList.contains("true")){
            listaOpcoes[i].classList.add("verde");
        }else{
            listaOpcoes[i].classList.add("vermelho");
        }
        if(listaOpcoes[i].classList.contains("escolha")){
            
        }else{
            listaOpcoes[i].classList.add("branco");
        }
    }

    if(elemento.classList.contains("true")){
        acertos++;
        
    }
    setTimeout(proximaPergunta,2000);
    
    cont++;
    if(cont===qtdPerguntas){
        setTimeout(exibeResultado,2000);
        
    
    }

}
function proximaPergunta(){
    let prox=document.querySelector(".naoClicado");
    if(prox != null){
        prox.scrollIntoView();
}}
function mostraResultado(){
    let prox=document.querySelector(".caixaResultado");
    if(prox != null){
        prox.scrollIntoView();
}}



function exibeResultado(){
    let index=0;
    let valor =0;
    let porcentagem=Math.floor(acertos/qtdPerguntas*100);
    
    
        for(let i =0;i<resultadosP.length;i++){
            let valorMin=resultadosP[i].minValue;
            
            if(porcentagem>=valorMin){
               if(valorMin>=valor){
                valor=valorMin;
                index=i;
                console.log(porcentagem,valorMin,i,index);
            }}
            
        }  
        
        pagina.innerHTML+=
            `
                <div class="caixaResultado">
                    <span class="tituloResultado"><p>${resultadosP[index].title}</p></span>
                    <div class="resultado">
                        <div class="caixa1"><img src="${resultadosP[index].image}" ></div>
                        <div class="caixa2">
                        <p>${resultadosP[index].text}</p>
                        </div>
                    </div>
                </div>
                <div class="botao"onclick="restartQuizz()">Reiniciar Quizz</div>
                <div class="restart" onclick="restartPage()">Voltar pra Home</div>
                
                `
        mostraResultado();
        
    }
function restartQuizz(){
    abrePagina2(id);
    cont=acertos=0;
}
function restartPage(){
    window.location.reload();
}