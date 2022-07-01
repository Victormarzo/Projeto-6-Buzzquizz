function abrePagina2(elemento){
    console.log(elemento);
    
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elemento}`)
    promise.then(exibeQuizz);
    promise.catch(error);
}
function error(erro){
    console.log(erro.response.status);
}

function exibeQuizz(resposta){
    let titulo=document.querySelector(".tituloQuizz")
    titulo.innerHTML=
    
    `
    
    
    <div class="caixaTitulo">
        <img src="img\Rectangle 34 (1).png" >
        <p>Titulo do quizz</p>
    
        <div class="listaQuizz">
        <div class="caixaQuizz">
            
        <div class="caixaQuizz">
            <div class="perguntaQuizz"><p>qual o castelo</p></div>
            <div class="opcao"><img src="img\Rectangle 34 (1).png" ><p>Castelo</p></div>
            <div class="opcao"><img src="img\Rectangle 34 (1).png" ><p>Castelo</p></div>
            <div class="opcao"><img src="img\Rectangle 34 (1).png" ><p>Castelo</p></div>
            <div class="opcao"><img src="img\Rectangle 34 (1).png" ><p>Castelo</p></div>
        </div>
    </div>
    </div>
    
    
    `
}