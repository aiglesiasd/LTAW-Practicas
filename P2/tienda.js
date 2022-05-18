// PRACTICA 1: Alberto Iglesias

//-- Importar los siguientes modulos 
const http = require('http');
const fs = require('fs');
//-- Definir el puerto a utilizar 9090 como dicen las especificaciones
const PUERTO = 9090;
const form = fs.readFileSync('Formulario.html','utf-8');
const RES = fs.readFileSync('permitido.html', 'utf-8');
const ERROR = fs.readFileSync('error.html');
const equipos = fs.readFileSync('ordenadoresSobremesa.html','utf-8');

const J_SON = fs.readFileSync('tienda.json','utf-8');
//-- Mensaje de arranque
console.log("Arrancando servidor...");
//-- Función de retrollamada de petición recibida
//-- Cada vez que un cliente realiza una petición
//-- Se llama a esta función
function get_cookie(req){

  //-- Leer las cookies
  const cookie = req.headers.cookie;

  if (cookie) {
      console.log("Cookie: " + cookie);

      //-- Obtener un array con todos los pares nombre-valor
      let pares = cookie.split(";");
      
      pares.forEach((element, index) => {
  
          //-- Obtener los nombres y valores por separado
          let [nombre, valor] = element.split('=');

          //-- Leer el usuario
          //-- Solo si el nombre es 'user'
          if (nombre.trim() === 'user') {
              user = valor;
          }
      });
   
  } else {
      console.log('No hay cookie');
  }
}
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
    
    let mime = Extensions[ext];
    FICHERO1 = FICHERO.substr(2);
    console.log(FICHERO1);
    
    
        
    switch (FICHERO1) {
      case '':
          date = equipos;
          get_cookie(req);
          break;
      case 'procesar':
        date = RES;
        break;
      case 'Formulario.html':
          date = form;
          get_cookie(req);
          break; 
        case 'permitido.html':
            date = RES;
            get_cookie(req);
            break; 
            // si no --> error
        default:
          res.setHeader('date-Type','text/html');
          res.statusCode = 404;
          res.statusMessage = "Not Found";
          console.log("Error");
          res.write(ERROR);
          res.end();
          return;
  }
          //-- Si hay datos en el cuerpo, se imprimen
        req.on('data', (cuerpo) => {

          req.setEncoding('utf8');
          console.log(`Cuerpo (${cuerpo.length} )`);
          console.log(` ${cuerpo}`);
        });
      
    //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud
    req.on('end', ()=> {

        //-- Generar respuesta
        res.setHeader('date-Type', mime);
        res.write(date);
        res.end();
        
    });
});

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);
//Mensaje inicial
console.log("Servidor de ControlTec en funcionamiento. Escuchando en puerto: " + PUERTO);