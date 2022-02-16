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
const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let page = pagina_main;

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    if (url.pathname != '/') {
        code = 404;
        code_msg = "Not Found";
        page = pagina_error;
    }

    //-- Generar la respusta en función de las variables
    //-- code, code_msg y page
    res.statusCode = code;
    res.statusMessage = code_msg;
    res.setHeader('Content-Type','text/html');
    res.write(page);
    res.end();
});

//Definimos extensiones
const Extensions = {
    "html" : "text/html",
    "png"  : "image/png",
    "css"  : "text/css",
    "jpg"  : "image/jpg",
    "JPG"  : "image/jpg"
  };


//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);
//Mensaje inicial
console.log("Servidor de ControlTec en funcionamiento. Escuchando en puerto: " + PUERTO);