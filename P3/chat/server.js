//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const fs = require('fs');
const PUERTO = 9090;
cliente = 0;
//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send(fs.readFileSync('./public/chat.html', 'utf-8'));
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  cliente += 1;
  console.log('** NUEVA CONEXIÓN **'.yellow);
  io.send('Usuario conectado');
  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    cliente -= 1;
    io.send('Usuario se ha desconectado');
  });  

socket.on("message", (msg)=> {  
    console.log("Mensaje Recibido!: " + msg.green); 
        if (msg[0] == "/") {
            switch (msg) {
                case '/hello':
                    socket.send('Hola!');
                    break;
                case '/list':
                    socket.send('Usuarios en linea: ' + cliente);
                    break;
                case '/help':
                    socket.send('Comandos: <br> /help: ayuda con todos los comandos <br> /list: Lista de usuarios en linea .<br> /hello: Servidor devuelve un "hola".<br> /date: fecha actual.');
                    break;
                case '/date':
                    let fecha = new Date(Date.now());
                    let fecha1 = "Fecha ->" + fecha;
                    socket.send(fecha1);
                    break;
                default:
                    break;
            }
    }else {
        //-- Reenviarlo a todos los clientes conectados
        io.send(msg);
    }

  });
});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);