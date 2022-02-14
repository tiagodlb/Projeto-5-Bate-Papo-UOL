/* Variáveis Globais */
let nomeUsuario = prompt("Qual o seu nome? ");
let listaMensagem = [];
/* Funções */

function postarUsuario(resposta) {
    //Ela pede o nome do usuario
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", { name: nomeUsuario });
    promise.catch(tratarErros);
    console.log("postarUsuario deu certo!")
    console.log(promise)
    buscarMensagens()
}

function buscarMensagens() {
    //Busca certas mensagens
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    console.log("buscarMensagens deu certo!")
    promise.then(carregarMensagens)
    promise.catch(tratarErros);
    setInterval(() => checkIfUserOnline(nomeUsuario), 5000);
}

function carregarMensagens(resposta) {
    listaMensagem = resposta.data
    postarMensagem()
}

function postarMensagem() {
    //Carrega as mensagens dentro da API
    let input = document.querySelector("input").value;
    let mensagens = document.querySelector(".mensagem")
    mensagens.innerHTML = "";

    for (let i = 0; i < listaMensagem.length; i++) {
        const mensagem = listaMensagem[i];
        mensagens.innerHTML += mensagemDiv(mensagem);
        console.log("dando certo")
    }
    const UltimoElemento = document.querySelector("section:last-child");
    UltimoElemento.scrollIntoView({ behavior: 'smooth', block: 'center' });;
}

function postarMensagemInput() {
    //Posta mensagem do input

    let inputs = document.querySelector("input").value;
    let mensagem = {
        from: nomeUsuario,
        to: "Todos",
        text: inputs,
        type: "message"
    }
    inputs.innerHTML += mensagemDivInput(mensagem)
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagem);
    promise.then(buscarMensagens);
    promise.catch(() => {
        alert(`Eita amigo, deu alguma coisa 😭 \nTenta novamente, vai dar certo`);
    });
    const UltimoElemento = document.querySelector("section:last-child");
    UltimoElemento.scrollIntoView({ behavior: 'smooth', block: 'center' });;

}

function mensagemDiv(mensagem) {
    if (mensagem.type === "status") {
        return ` 
        <section data-identifier="message" class=${mensagem.type}> 
        <span class="hora">${mensagem.time}</span><strong class="strong">${mensagem.from}</strong> ${mensagem.text}</section>
        `;
    }
    else if (mensagem.type === "message") {
        return ` 
        <section data-identifier="message" class=${mensagem.type}>
        <span class="hora">${mensagem.time}</span><strong class="strong">${mensagem.from}</strong> para  <strong class="strong2"> ${mensagem.to}</strong>: ${mensagem.text}</section>
        `;
    }
    else if (mensagem.type === "private_message" && mensagem.from === nomeUsuario) {
        return ` 
        <section data-identifier="message" class=${mensagem.type}>
        <span class="hora">${mensagem.time}</span><strong class="strong">${mensagem.from}</strong> para  <strong class="strong2"> ${mensagem.to}</strong>: ${mensagem.text}</section>
        `;
    }
    else if (mensagem.type === "private_message" && mensagem.from !== nomeUsuario) {
        return ` 
        <section data-identifier="message" class="${mensagem.type} escondido">
        <span class="hora">${mensagem.time}</span><strong class="strong">${mensagem.from}</strong> para  <strong class="strong2"> ${mensagem.to}</strong>: ${mensagem.text}</section>
        `;
    }
}

function mensagemDivInput(mensagem) {
    return ` 
        <section data-identifier="message" class=${mensagem.type} mensagemth> <span class="hora">${mensagem.time}</span><strong class="strong">${mensagem.from}</strong> ${mensagem.text}</section>
        `;
}

function checkIfUserOnline(User) {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", User);
    promise.catch(UsuarioOffline);
}

function UsuarioOffline() {
    alert("Usuário offline!");
    window.location.reload();
}


/* Funções auxiliares */

function tratarErros(erro) {
    console.log("Status Code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data)
    if (parseInt(erro.response.status) === 400) {
        alert("Esse usuário já está em uso. Por favor, inserir outro.")
        recarregarPagina()
    }
}

function recarregarPagina() {
    //recarrega a página
    window.location.reload(); // atualiza a página
}

/* Executa as funções (caso necessario) */
postarUsuario()
setInterval("buscarMensagens()", 3000)
let inputz = document.querySelector("button");


// Não está funcionando :)
inputz.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector(".icone-baixo").click();
    }
});
