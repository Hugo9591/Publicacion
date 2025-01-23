const formulario = document.querySelector('#formulario');
const listaTweet = document.querySelector('#lista-tweets');
// const listaTweet = document.querySelector('#twe');
// const time = document.querySelector('#time');

let arrayTweets = [];

//EventListener
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () =>{
        arrayTweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(arrayTweets);

        crearHTML();
    })
}

function agregarTweet(e){
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value; 

    if(tweet === ''){
        mostrarError('No hay Tweet');
        return;
    }

    const tweetObjeto = {
        id: Date.now(),
        tweet,
        time: new Date().toLocaleDateString('es-ES',{day:'2-digit', month:'2-digit', year:'2-digit'})
    }

    arrayTweets = [...arrayTweets, tweetObjeto];

    console.log(arrayTweets);

    crearHTML();

    formulario.reset(); 
}

function crearHTML(){
    limpiarHTML();

    if(arrayTweets.length > 0){
        arrayTweets.forEach( tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'x';

            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');

            const tweetText = document.createElement('span');
            tweetText.textContent = tweet.tweet;
            li.appendChild(tweetText);

            const tweetTime = document.createElement('span');
            tweetTime.textContent = tweet.time;
            tweetTime.style.marginLeft = '10px';
            tweetTime.style.fontSize = '0.9em';
            tweetTime.style.color = 'gray';
            li.style.listStyle = 'none'

            li.appendChild(tweetTime);
            li.appendChild(btnEliminar)
            listaTweet.appendChild(li);



            // listaTweet.appendChild(btnEliminar);


            // const li = document.createElement('li');
            // li.innerText = tweet.tweet;
            

            // const lih = document.createElement('li');
            // li.innerHTML = Date();

            // listaTweet.appendChild(li);
            // listaTweet.appendChild(lih);
        })
    }
    sincronizacionStorage();
}


function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.classList.add('error', 'animacion');
    mensajeError.textContent = error;

    //Agrega e mmensaje al contenedor
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina el mensaje
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function sincronizacionStorage(){
    localStorage.setItem('tweets', JSON.stringify(arrayTweets));
}

function limpiarHTML(){
    while(listaTweet.firstChild){
        listaTweet.removeChild(listaTweet.firstChild);
    }
}

function borrarTweet(id){
    arrayTweets = arrayTweets.filter( tweet => tweet.id !== id);

    crearHTML();
}