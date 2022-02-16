//Importamos modulos http y fs 
const http = require('http');
const fs = require('fs');

//-- Crear el servidor
const server = http.createServer();
//-- Definir el puerto a utilizar 9090 como dicen las especificaciones
const PUERTO = 9090;
//-- Función de retrollamada de petición recibida
//-- Cada vez que un cliente realiza una petición
//-- Se llama a esta función
function atender(req, res) {
    //-- Indicamos que se ha recibido una petición
    console.log(" " +"Petición recibida!" + " ");
    //-- pero no enviamos respusta (todavía)
}
//tipos de extensiones
const Extensions = {
    "html" : "text/html",
    "png"  : "image/png",
    "css"  : "text/css",
    "jpg"  : "image/jpg",
    "JPG"  : "image/jpg"
  };
//-- Activar la función de retrollamada del servidor
server.on('request', atender);

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);
//Mensaje inicial
console.log("Servidor de ControlTec en funcionamiento. Escuchando en puerto: " + PUERTO);