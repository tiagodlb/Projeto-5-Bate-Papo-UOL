/* Variáveis Globais */
let nomeUsuario = prompt("Qual o seu nome? ");
/* Funções */

function buscarMensagens() {
    let promise =axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    console.log(promise)
    promise.then(mensagensTela)
}

function entrarSala() {
    //Ela pede o nome do usuario
    const objeto = {
        name: nomeUsuario
    };
    console.log(objeto)
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", objeto);
    promise.then(mensagemUsuario);
    promise.catch(tratarErros);
}

function mensagensTela(resposta){
    const pessoa = resposta.data
    //escreve o nome na tela
    const elementoMensagem = document.querySelector(".mensagem")
    elementoMensagem.innerHTML = `
    <div class="Entrou"> <span class="hora">(14:31:02)</span><strong class="strong">${pessoa.name}</strong> entrou na
    sala... </div>
    `

}

function mensagemUsuario(resposta){
    const alerta = alert("nome cadastrado com sucesso!");
    //escreve o nome na tela
    const elementoMensagem = document.querySelector(".mensagem")
    elementoMensagem.innerHTML = `
    <div class="Entrou"> <span class="hora">(14:31:02)</span><strong class="strong">${nomeUsuario}</strong> entrou na
    sala... </div>
    `
}

function tratarErros(erro){
    console.log("Status Code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data)
}

/* Executa as funções (caso necessario) */
buscarMensagens()
entrarSala()
