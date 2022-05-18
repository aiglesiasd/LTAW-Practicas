// PRACTICA 2: Alberto Iglesias

//-- Importar los siguientes modulos 
const http = require('http');
const fs = require('fs');
//-- Definir el puerto a utilizar 9090 como dicen las especificaciones
const PUERTO = 9090;
const form = fs.readFileSync('Formulario.html','utf-8');
const form2 = fs.readFileSync('compra.html','utf-8');
const RES = fs.readFileSync('permitido.html', 'utf-8');
const ERROR = fs.readFileSync('error.html');
const equipos = fs.readFileSync('ordenadoresSobremesa.html','utf-8');
const confirmaCompra = fs.readFileSync('confirmaCompra.html','utf-8');
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

const server = http.createServer(function (req, res) {

    console.log("Petición recibida!");

    //-- Crear el objeto URL del mensaje de solitud (req)
    //-- y coger el recurso (url)
    let myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("\nSe ha solicitado el recurso: " + myURL.pathname);    

    let FICHERO = "";
    if (myURL.pathname == "/"){
      FICHERO += "tienda.html";  //-- Abrir home
    }else{
      FICHERO = myURL.pathname;  
    }



    let ext = FICHERO.split(".")[1];
    FICHERO = "." + FICHERO;
    //Extensions
    const Extensions = {
        "html" : "text/html",
        "jpg"  : "image/jpg",
        "css"  : "text/css",
        "png"  : "image/png",
        "JPG"  : "image/jpg",
        "ico"  : "image/x-icon",
        "json" : "application/json"

    };
    
    console.log("Tipo solicitado: " + Extensions);
    
    let mime = Extensions[ext];
    FICHERO1 = FICHERO.substr(2);
    console.log(FICHERO1);



    switch (FICHERO1) {
        case '':
            date = equipos;
            get_cookie(req);
            break;
        case 'compra':
              //-- Leer los parámetros
            let usuari = myURL.searchParams.get('usuario');
            let direccion = myURL.searchParams.get('direccion');
            let tarjeta = myURL.searchParams.get('tarjeta');
            console.log(" Usuario----> " + usuari);
            console.log(" Envio ----> " + direccion);
            console.log(" tarjeta---------> " + tarjeta);
            info_pedidos = JSON.parse(J_SON);
            info_pedidos = info_pedidos["pedidos"][1];
            //-- Mostrar informacion sobre la tienda
            console.log("Productos en la tienda *****************" + info_pedidos);
            date = confirmaCompra;
            date = date.replace("USUARIO", usuari);
            date = date.replace("DIRECCION", direccion);
            date = date.replace("TARJETA", tarjeta);
           
            mime = "text/html";
            break;
        case 'procesar':
            let correo = myURL.searchParams.get('correo');
            let name1 = JSON.parse(J_SON)['usuarios'][0]['nombre'];
            let hotmail = JSON.parse(J_SON)['usuarios'][0]['correo'];
            
            let name2 = JSON.parse(J_SON)['usuarios'][1]['nombre'];
            let hotmail2 = JSON.parse(J_SON)['usuarios'][1]['correo'];

            let name3 = JSON.parse(J_SON)['usuarios'][2]['nombre'];
            let hotmail3 = JSON.parse(J_SON)['usuarios'][2]['correo'];
            date = RES;
            if (correo==hotmail) {
                console.log("Datos Recibidos de: " + name1 + " con " + "correo: " + hotmail );
                date = date.replace("NOMBRE", name1);
                date = date.replace("CORREO", hotmail);
                mime= "text/html";

            }else if (correo==hotmail2){
                console.log("Datos Recibidos de: " + name2 + " con " + "correo: " + hotmail2 );
                date = date.replace("NOMBRE", name2);
                date = date.replace("CORREO", hotmail2);
                mime= "text/html";

            }else if (correo==hotmail3){
                console.log("Datos Recibidos de: " + name3 + " con " + "correo: " + hotmail3 );
                date = date.replace("NOMBRE", name3);
                date = date.replace("CORREO", hotmail3);
                date = date.replace(":)", "Welcome");
                mime = "text/html";
            }else{
                date = date.replace(":)", "no estas registrado!");
                mime = "text/html";
            }
    
            break;
        case 'estilos.css':
            date = fs.readFileSync(FICHERO1);
            break;
        case 'tipos.css':
            date = fs.readFileSync(FICHERO1);
            break;
        case 'images/LOGO.JPG':
            date = fs.readFileSync(FICHERO1);
            break;
        case 'images/licencia.JPG':
            date = fs.readFileSync(FICHERO1);
            break;
        case 'carrito.JPG':
            date = fs.readFileSync(FICHERO1);
            break;  
        case 'images/HP1.JPG':
            date = fs.readFileSync(FICHERO1);
            break; 
        case "images/HP2.JPG":
            date = fs.readFileSync(FICHERO1);
            break;
        case "images/V35.JPG":
            date = fs.readFileSync(FICHERO1);
            break; 
        case "images/M70SPFF.JPG":
            date = fs.readFileSync(FICHERO1);
            break;  
        case "images/Tiny.JPG":
            date = fs.readFileSync(FICHERO1);
            break; 
        case 'images/ASUS1.JPG':
            date = fs.readFileSync(FICHERO1);
            break; 
        case 'images/ASUS2.JPG':
            date = fs.readFileSync(FICHERO1);
            break;
        case "images/fondo.jpg":
            date = fs.readFileSync(FICHERO1);
            break;
        case 'ordenadoresSobremesa.html':
            date = equipos;
            get_cookie(req);
            break; 
        case 'error.html':
            date = ERROR;
            get_cookie(req);
            break;
        case 'Formulario.html':
            date = form;
            get_cookie(req);
            break; 
        case 'permitido.html':
            date = RES;
            get_cookie(req);
            break; 
        case "confirmaCompra.html":
            date = confirmaCompra;
            get_cookie(req);
            break; 
        case "compra.html":
          date = form2;
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