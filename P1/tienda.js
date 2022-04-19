// PRACTICA 1: Alberto Iglesias

//-- Importar los siguientes modulos 
const http = require('http');
const fs = require('fs');
//-- Definir el puerto a utilizar 9090 como dicen las especificaciones
const PUERTO = 9090;

//-- Mensaje de arranque
console.log("Arrancando servidor...");
//-- Función de retrollamada de petición recibida
//-- Cada vez que un cliente realiza una petición
//-- Se llama a esta función
const server = http.createServer(function (req, res) {

    console.log("Petición recibida!");

    //-- Crear el objeto URL del mensaje de solitud (req)
    //-- y coger el recurso (url)
    let myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("\nSe ha solicitado el recurso: " + myURL.pathname);
    //-- Definir la variable fichero
    let FICHERO = "";
    if (myURL.pathname == "/"){
      FICHERO += "tienda.html";  //-- Abrir home
    }else{
      FICHERO = myURL.pathname;  
    }

    //-- Ruta asignada
    console.log('Fichero a devolver: ' + FICHERO);

    let ext = FICHERO.split(".")[1];
    FICHERO = "." + FICHERO;
    
    //Extensions de extensiones
    const Extensions = {
        "html" : "text/html",
        "jpg"  : "image/jpg",
        "css"  : "text/css",
        "png"  : "image/png",
        "JPG"  : "image/jpg",
        "ico"  : "image/x-icon"
    };
    let code = 200;
    let code_msg = "OK";
    //-- Asignar que tipo de mime leer
    let mime = Extensions[ext];
    console.log("Tipo solicitado: " + mime);
    
    fs.readFile(FICHERO, function(err, data){
        if ((err) || (FICHERO == 'error.html')){
            res.statusCode = 404;
            res.statusMessage = "Not Found";
            res.setHeader('Content-Type',mime);
            console.log("Error");
        }else{
        console.log("Lectura completada, 200 OK")
        res.setHeader('Content-Type', mime);
        res.statusCode = code; 
        res.statusMessage = code_msg;
        } 
        res.write(data); 
        res.end(); //Terminar y enviar
    });
  });

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);
//Mensaje inicial
console.log("Servidor de ControlTec en funcionamiento. Escuchando en puerto: " + PUERTO);