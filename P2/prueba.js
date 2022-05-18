
const http = require('http');
const fs = require('fs');
const PUERTO = 9090;

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('Formulario.html','utf-8');

//-- HTML de la página de respuesta
const RESPUESTA = fs.readFileSync('permitido.html', 'utf-8');
const RESPUESTA_PEDIDO = fs.readFileSync('confirmaCompra.html', 'utf-8');

//-- Cargar la Página de error
const ERROR = fs.readFileSync('error.html');

//-- Cargar pagina web de Sobremesa
const MAIN = fs.readFileSync('ordenadoresSobremesa.html','utf-8');

//-- Leer filename JSON con los productos
const TIENDA_JSON = fs.readFileSync('tienda.json','utf-8');

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


//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => { 

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);  
    console.log("");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("  Ruta: " + myURL.pathname);
    console.log("  Parametros: " + myURL.searchParams);

    //-- Leer recurso y eliminar la / inicial
    let filename = myURL.pathname;
    filename = filename.substr(1); 
    console.log("Fiiiil++++++++++++++++++",filename);
    var mime = {
        '/' : 'text/html',
        'html' : 'text/html',
        'css'  : 'text/css',
        'jfif'  : 'image/jfif',
        "png"  : "image/png",
        "JPG"  : "image/jpg",
        'json' : 'application/json',
        "ico"  : "image/x-icon"
      
    };
    
    let hastaPunto = myURL.pathname.lastIndexOf(".");
    let type = myURL.pathname.slice(hastaPunto+1);
    mime1 = mime
    console.log("ficehro" + filename);
    switch (filename) {
        case '':
            content = MAIN;
            get_cookie(req);
            break;

        case 'procesar':
            //-- Leer los parámetros
            let nombre = myURL.searchParams.get('nombre');
            let usuario = myURL.searchParams.get('usuario');
            let correo = myURL.searchParams.get('correo');
            console.log(" Nombre---------> " + nombre);
            console.log(" Usuario----> " + usuario);
            console.log(" Correo----> " + correo);
            res.setHeader('Set-Cookie', "user="+ usuario);

            //-- Obtener el array de productos
            //-- Crear la estructura tienda a partir del contenido del filename
            let info = JSON.parse(TIENDA_JSON);
            info_usuarios = info["usuarios"][0];
            //-- Mostrar informacion sobre la tienda
            console.log("Productos en la tienda*******************" + info_usuarios);

           //-- Recorrer el array de productos
            info["usuarios"].forEach((element, index)=>{
            console.log("Usuario registrado ------------------------>: " + (index + 1) + ": " + element["nombre"]+"/"+ element["user"]+"/"+ element["correo"]);
            
            content = RESPUESTA;
            let html_extra = "";
            if (correo==element["correo"] && usuario==element["user"]) {
                console.log("coincideeee");
                html_extra = "<h2>No necesita registrarse!!</h2>";
            
                //-- Reemplazar las palabras claves por su valores en la plantilla HTML
                content = RESPUESTA.replace("NOMBRE", nombre);
                content = content.replace("USUARIO", usuario);
                content = content.replace("CORREO", correo);
                content = content.replace("HTML_EXTRA", html_extra);
                mime[type]= "text/html";
            }else{
                content = fs.readFileSync('error.html','utf-8'); 
                mime[type]= "text/html";
            }

            });
            break;

        case 'productos':
            info_productos = JSON.parse(TIENDA_JSON);
            productos = info_productos["productos"];
            //-- Mostrar informacion sobre la tienda
            console.log("Productos en la tienda*******************" + productos[1]["nombre"]);
            content_type = "application/json";

            //-- Leer los parámetros
            let param1 = myURL.searchParams.get('param1');

            param1 = param1.toUpperCase();

            console.log("Param: " +  param1);

            let result = [];

            for (let prod of productos) {

                console.log("oooo",prod["nombre"]);

                //-- Pasar a mayúsculas
                prodU = prod["nombre"].toUpperCase();
                //-- Si el producto comienza por lo indicado en el parametro
                //-- meter este producto en el array de resultados
                if (prodU.startsWith(param1)) {
                    result.push(prod);
                }
                
            }

            //-- Pasar una variable a formato JSON. Se hace con el método:
            console.log(result[0]);
            content = JSON.stringify(result);
            mime[type] ="text/html";
            break;
            
        case 'pedidos':
            content = fs.readFileSync('confirmaCompra.html', 'utf-8'); 
            //-- Leer los parámetros
            let usuari = myURL.searchParams.get('usuario');
            let direccion = myURL.searchParams.get('direccion');
            let tarjeta = myURL.searchParams.get('tarjeta');
            console.log(" Usuario----> " + usuari);
            console.log(" Envio ----> " + direccion);
            console.log(" tarjeta---------> " + tarjeta);
            res.setHeader('Set-Cookie', usuari);

            info_pedidos = JSON.parse(TIENDA_JSON);
            info_pedidos = info_pedidos["pedidos"][1];
            //-- Mostrar informacion sobre la tienda
            console.log("Productos en la tienda *****************" + info_pedidos);

              
            //-- Reemplazar las palabras claves por su valores en la plantilla HTML
            content = content.replace("USUARIO", usuari);
            content = content.replace("DIRECCION", direccion);
            content = content.replace("TARJETA", tarjeta);
            //content = content.replace("HTML_EXTRA", html_extra);
            mime[type]= "text/html";

            
        case 'ordenadoresSobremesa':
            content = MAIN;
            get_cookie(req);
            break; 
        case 'Formulario.html':
            content = FORMULARIO;
            break; 
        case 'compra.html':
            content = fs.readFileSync(filename,'utf-8');
            break;
        case 'ordenadoresSobremesa.html':
            content = fs.readFileSync(filename,'utf-8');
            break; 
        case 'tipos.css':
            content = fs.readFileSync(filename);
            break;
        case 'images/HP1.JPG':
            content = fs.readFileSync(filename);
            break; 
        case "images/HP2.JPG":
            content = fs.readFileSync(filename);
            break;
        case "images/V35.JPG":
            content = fs.readFileSync(filename);
            break; 
        case "images/M70SPFF.JPG":
            content = fs.readFileSync(filename);
            break;  
        case "images/Tiny.JPG":
            content = fs.readFileSync(filename);
            break; 
        case 'images/ASUS1.JPG':
            content = fs.readFileSync(filename);
            break; 
        case 'images/ASUS2.JPG':
            content = fs.readFileSync(filename);
            break;
        case "images/fondo.jpg":
            content = fs.readFileSync(filename);
            break;
        //-- Si no es ninguna de las anteriores devolver mensaje de error
        default:
            res.setHeader('Content-Type','text/html');
            res.statusCode = 404;
            res.write(ERROR);
            res.end();
            return;
    }
            let code = 200;
            let code_msg = "OK";
    fs.readFile(filename, function(err, data){
        if ((filename == 'error.html')){
            res.statusCode = 404;
            res.statusMessage = "Not Found";
            res.setHeader('Content-Type',mime);
            console.log("Error");
        } else {
        console.log("Lectura completada, 200 OK")
        res.setHeader('Content-Type', mime);
        res.statusCode = code; 
        res.statusMessage = code_msg;
        } 
        res.write(data); 
        res.end(); //Terminar y enviar
    });
  });
  
  server.listen(PUERTO);
  console.log("Escuchando en puerto: " + PUERTO);