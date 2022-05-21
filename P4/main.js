//-- Cargar el módulo de electron
const electron = require('electron');
const http = require('http');
const express = require('express');
const colors = require('colors');
const ip = require('ip');
PUERTO = 9090;
console.log("Arrancando electron...");

//-- Crear una nueva aplciacion web
const app = express();
//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);
//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

io.on('connect', (socket) => {
  io.send("El usuario se ha unido al chat")
  console.log('** Nueva conexión **'.yellow );
  usuarios = usuarios + 1;
  //-- Enviar numero de usuarios 
  win.webContents.send('users', usuarios);
   socket.send('Bienvenido' + "!" );
  //-- Evento de desconexión
  socket.on('disconnect', function(){
    io.send("El usuario ha dejado el chat")
    console.log('** Conexión terminada **'.yellow);
    usuarios = usuarios - 1;
    win.webContents.send('users', usuarios);
  });  

if(msg.includes("/")){
  if (msg == "/help") {
      content = '<h4> Comandos disponibles:</h4>'
                  + '<br> /hello: Recibir saludo' + 
                  + '<br> /help: ayuda con los comandos disponibles'
                  + '<br> /list: Ver el nº de usuarios conectados'
                  + '<br> /date: Fecha'
                  + '<br> /users: usuarios en linea '
      socket.send(content);
  }else if (msg == "/list") {
    content="Nº de usuarios conectados: " + "<b>"+ usuarios   
    socket.send(content);
  }else if (msg == "/hello") {
    content= "HOLA"
    socket.send(content);
  }else if (msg == "/date") {
    let date = new Date().toDateString();
    socket.send("fecha actual:" + date);
    
  }else if (msg == "/users") {
    console.log("Todavia no hago nada***")
    
  }else{
  io.send(msg);
}    
}
});
//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;

app.get('/', (req, res) => {
  let dir = __dirname + '/public/index.html';
  res.sendFile(dir);
  console.log("Acceso a la página principal");
});

app.use('/', express.static(__dirname +'/'));
app.use(express.static('public'));




//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,   //-- Anchura 
        height: 600,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  //-- En la parte superior se nos ha creado el menu
  //-- por defecto
  //-- Si lo queremos quitar, hay que añadir esta línea
  //win.setMenuBarVisibility(false)

  //-- Cargar contenido web en la ventana
  //-- La ventana es en realidad.... ¡un navegador!
  //win.loadURL('https://www.urjc.es/etsit');

  //-- Cargar interfaz gráfica en HTML
  win.loadFile("index.html");

  //-- Esperar a que la página se cargue y se muestre
  //-- y luego enviar el mensaje al proceso de renderizado para que 
  //-- lo saque por la interfaz gráfica
  win.on('ready-to-show', () => {
    win.webContents.send('ip', 'http://' + ip.address() + ':' + PUERTO);
  });

  //-- Enviar un mensaje al proceso de renderizado para que lo saque
  //-- por la interfaz gráfica
  win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");

});


//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola
electron.ipcMain.handle('test', (event, msg) => {
    io.send(msg);
    win.webContents.send('msg', msg);

});
//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);