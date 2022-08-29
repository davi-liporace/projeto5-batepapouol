let arrayMensagens = [];
const usuario = { name:''}
let Nome

function login(){
   const Nome = prompt("Qual o seu nome");
   usuario.name = Nome;
   const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario)
   promessa.then(pegarDados);
   promessa.catch(login);
   setInterval(usuarioOnline, 5000);
   setInterval(pegarDados, 3000);
}

function usuarioOnline(){
    const usuarioOnline = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario);
}
function pegarDados() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(dadosChegaram);    
}
pegarDados();
function dadosChegaram(promessa){
    arrayMensagens = promessa.data;
    console.log(arrayMensagens); 
    RenderizarRespostas();
    }

//arrayMensagens agora está preenchido com as informações

function RenderizarRespostas(){
    const ul = document.querySelector('.mensagens');
    ul.innerHTML = '';
    for (let i = 0; i < arrayMensagens.length; i++) {
        if(arrayMensagens[i].type=== "status"){
        ul.innerHTML = ul.innerHTML + `
            <li class="mensagemStatus"> 
            <h1>(${arrayMensagens[i].time})</h1><strong> ${arrayMensagens[i].from}</strong>  ${arrayMensagens[i].text}
            </li>
        `
    }
    if(arrayMensagens[i].type=== "message"){
        ul.innerHTML = ul.innerHTML + `
            <li class="mensagemNormal"> 
            <h1>(${arrayMensagens[i].time})</h1> <strong>${arrayMensagens[i].from}</strong>  para <strong>${arrayMensagens[i].to}</strong>:<h2> ${arrayMensagens[i].text}</h2>
            </li>
        `
    }
    if(arrayMensagens[i].type=== "private_message"){
        ul.innerHTML = ul.innerHTML + `
            <li class="mensagemPrivada" ><h1>(${arrayMensagens[i].time})</h1> <strong><h2>${arrayMensagens[i].from}</strong> para <strong>${arrayMensagens[i].to}</strong>: ${arrayMensagens[i].text}</h2>
            </li>
        `
    }
}
    ul.lastElementChild.scrollIntoView();
}
RenderizarRespostas()
function enviarMensagem() {

    // pegar os dados preenchidos nos inputs
    const elementoMensagem = document.querySelector('.barraInferior input');
    
    // criar uma nova receita no formato certinho
    const novaMensagem = {
        from: usuario.name,
        to: 'Todos',
        text: elementoMensagem.value,
        type: 'message',
    };
    console.log(novaMensagem);
const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMensagem);
promessa.then(pegarDados);
promessa.catch(MensagemErro);
arrayMensagens.push(novaMensagem);
elementoMensagem.value = "";
};
function mensagemOk(){
    alert("deu certo");
}
function MensagemErro(){
    alert("deu erro")
}