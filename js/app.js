const tweet = document.querySelector("#tweet")
const formulario = document.querySelector("#formulario")
formulario.addEventListener("submit",validarCampos)
const listaTweets = document.querySelector("#lista-tweets")

let arrayTweets = JSON.parse(localStorage.getItem("arrayTweets")) || []

let editando = false

document.addEventListener("DOMContentLoaded",function(){
    //console.log("esto es array tweets en el documento cargado", arrayTweets)
    mostrarTweetsHtml()
})

const objetoTweet = {
   id: Date.now().toString(12),
   tweet:""
}
tweet.addEventListener("change",agregarValorAlObjeto)

function agregarValorAlObjeto(e){
   objetoTweet[e.target.id] = e.target.value
}
function validarCampos(e){
    e.preventDefault()
    if(tweet.value.trim() == ""){
        mostraraAlerta("el tweet no puede ir vacio")
        return;
    }

    if(editando){
       editarTweet({...objetoTweet})
      // console.log("esto es el objetoTweet en if editando",objetoTweet)
       editando = false
    }else{
       // objetoTweet.mensaje = tweet.value
        arrayTweets = [...arrayTweets,{...objetoTweet}]
        localStorage.setItem("arrayTweets", JSON.stringify(arrayTweets))
    }
      objetoTweet.id = Date.now().toString(12)
      mostrarTweetsHtml()
      formulario.reset()
      resetearObjeto()
}

function conseguirTweet(id){
    let objtweet =  arrayTweets.find( t => t.id == id)
    ponerValoresAlosInputsYalObjeto(objtweet)
    editando = true
}

function ponerValoresAlosInputsYalObjeto(objeto){
   document.querySelector("#tweet").value = objeto.tweet
   Object.assign(objetoTweet,{
      id:objeto.id,
      mensaje:objeto.tweet
   })
   //console.log("esto es objetoTweet en ponerValoresAlosInputsYalObjeto",objetoTweet)
}

function editarTweet(objeto){
    arrayTweets = arrayTweets.map(t => t.id == objeto.id ? objeto : t)
    localStorage.setItem("arrayTweets",JSON.stringify(arrayTweets))
}

function eliminarTweet(id){
    arrayTweets = arrayTweets.filter( t => t.id != id)
    localStorage.setItem("arrayTweets",JSON.stringify(arrayTweets))
    mostrarTweetsHtml()
}

function mostrarTweetsHtml(){
    limpiarHtml()
    if(arrayTweets.length > 0 ) {
        arrayTweets.forEach( tweet =>  {

            const botonEditar = document.createElement("button")
            botonEditar.classList.add("editar-tweet")
            botonEditar.textContent = "editar"
            botonEditar.onclick = ()=> conseguirTweet(tweet.id)
             // crear boton de eliminar
             const botonBorrar = document.createElement('a');
             botonBorrar.classList = 'borrar-tweet';
             botonBorrar.innerText = 'X';
             botonBorrar.onclick = ()=> eliminarTweet(tweet.id)
   
             // Crear elemento y añadirle el contenido a la lista
             const li = document.createElement('li');

             // Añade el texto
             li.innerText = tweet.tweet;
              
             li.appendChild(botonEditar)
             // añade el botón de borrar al tweet
             li.appendChild(botonBorrar);

             // añade un atributo único...
             li.dataset.tweetId = tweet.id;

             // añade el tweet a la lista
             listaTweets.appendChild(li);
        });
   }
}

function resetearObjeto(){
    Object.assign(objetoTweet,{
        id:Date.now().toString(12),
        tweet:""
    })
}

function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}
function mostraraAlerta(error){
    limpiarAlerta()
    const mensajeEerror = document.createElement('p');
    mensajeEerror.textContent = error;
    mensajeEerror.classList.add('error'); 

    formulario.appendChild(mensajeEerror)

    setTimeout(() => {
       mensajeEerror.remove()
    },3000);
}

function limpiarAlerta(){
    const existe = document.querySelector(".error")
    if(existe){
        existe.remove()
    }
}
/* const mensajeEerror = document.createElement('p');
mensajeEerror.textContent = error;
mensajeEerror.classList.add('error'); 




botonBorrar.classList = 'borrar-tweet';

*/



























/* function mostrarTweetsHtml(){
    limpiarHtml()
    if(arrayTweets.length > 0 ) {
        arrayTweets.forEach( tweet =>  {

            const botonEditar = document.createElement("button")
            botonEditar.classList.add("editar-tweet")
            botonEditar.textContent = "editar"
             // crear boton de eliminar
             const botonBorrar = document.createElement('a');
             botonBorrar.classList = 'borrar-tweet';
             botonBorrar.innerText = 'X';
   
             // Crear elemento y añadirle el contenido a la lista
             const li = document.createElement('li');

             // Añade el texto
             li.innerText = tweet.mensaje;
              
             li.appendChild(botonEditar)
             // añade el botón de borrar al tweet
             li.appendChild(botonBorrar);

             // añade un atributo único...
             li.dataset.tweetId = tweet.id;

             // añade el tweet a la lista
             listaTweets.appendChild(li);
        });
   }
} */