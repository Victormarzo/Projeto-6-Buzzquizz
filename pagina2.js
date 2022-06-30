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
    `
    
    
    
    
    
    
    
    `
}