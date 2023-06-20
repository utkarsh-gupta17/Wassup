const socket = io();
let naam;

let textarea = document.querySelector("#textarea")
let messagearea = document.querySelector(".message_area")

do{

    naam = prompt("Please enter UserName: ")
}while(!naam);

textarea.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user: naam,
        message:message.trim()
    }
    //Append
    appendMessage(msg,"outgoing");
    textarea.value = "";
    scrollToBottom();

    //Send to Server
    socket.emit('message',msg);
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);

}

//Receive messages

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom();
})

function scrollToBottom(){
    messagearea.scrollTop = messagearea.scrollHeight;
}