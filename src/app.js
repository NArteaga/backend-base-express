const express = require('express')
const { json } = require('body-parser')
const fileUpload = require('express-fileupload');
const cors = require('cors')
const { createServer } = require('http')
const { config } = require('dotenv')
const { dependecies, routes } = require('./common/load')
const requestIp = require('request-ip');
config()

const app = express()
const socketApp = express()
//INFO configuracion inicial

app.use(json({ limit: '10mb' }))
app.use(cors())
app.use(requestIp.mw())
socketApp.use(cors())
app.use(express.static(process.env.PATH_FILE_PUBLIC))
app.use(fileUpload())

const serverSocket = createServer(socketApp);

const io = require('socket.io')(serverSocket, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const load = async (app, io) => {
  const config = await dependecies(__dirname, io)
  app.use('/api', routes(__dirname, config))
}
io.on('connection', (socket) => {
  socket.on('mode', (msg) => {
    console.log('message: ' + msg);
  });
});
load(app, io)

app.get('/api/status', (_, res) => {
  const date = new Date();
  return res.status(200).send({
    finalizado: true,
    mensaje: 'Funcionando correctamente',
    datos: {
      code: Buffer.from(date.toString()).toString('base64'),
      anio: date.getFullYear(),
      mes: date.getMonth() + 1,
      dia: date.getDate()
    }
  })
})

app.use((err, req, res, next) => {
  if (!err) next()
  if (err?.message?.match(/not found/)) return res.status(404).send({ error: err.message })
  if (err?.message?.match(/jwt expired/))
    return res.status(401).send({ error: 'Su sesión ha expirado, ingrese nuevamente al sistema.' })
  if (err?.message?.match(/No authorization/))
    return res.status(403).send({ error: 'No tiene permisos para realizar esta operación.' })
  if (err?.message?.match(/EAI_AGAIN/))
    return res.status(400).send({ error: 'Uno de los servicios no se encuentra activo en estos momentos, vuelva a intentar dentro de unos minutos.' })
  res.status(500).send({ error: err.message })
})

const server = createServer(app);

serverSocket.listen(process.env.SOCKET_PORT || 3200, () => {
  console.log(`
    ███████╗██╗███████╗ ██████╗ ███████╗██████╗     ███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
    ██╔════╝██║██╔════╝██╔════╝ ██╔════╝██╔══██╗    ██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
    ███████╗██║███████╗██║  ███╗█████╗  ██████╔╝    ███████╗██║   ██║██║     █████╔╝ █████╗     ██║   
    ╚════██║██║╚════██║██║   ██║██╔══╝  ██╔══██╗    ╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║   
    ███████║██║███████║╚██████╔╝███████╗██║  ██║    ███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║   
    ╚══════╝╚═╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝                                                                                                  
  `)
  console.log(`server listening on port ${process.env.SOCKET_PORT}`);
})


server.listen(process.env.PORT || 3000, () => {
    console.log(`
    ███████╗██╗███████╗ ██████╗ ███████╗██████╗     ██████╗  █████╗  ██████╗██╗  ██╗███████╗███╗   ██╗██████╗ 
    ██╔════╝██║██╔════╝██╔════╝ ██╔════╝██╔══██╗    ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝████╗  ██║██╔══██╗
    ███████╗██║███████╗██║  ███╗█████╗  ██████╔╝    ██████╔╝███████║██║     █████╔╝ █████╗  ██╔██╗ ██║██║  ██║
    ╚════██║██║╚════██║██║   ██║██╔══╝  ██╔══██╗    ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██║╚██╗██║██║  ██║
    ███████║██║███████║╚██████╔╝███████╗██║  ██║    ██████╔╝██║  ██║╚██████╗██║  ██╗███████╗██║ ╚████║██████╔╝
    ╚══════╝╚═╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝                                                                                                    
    `)
    console.log(`server listening on port ${process.env.PORT}`);

    console.log(`🚀🚀🚀   RUTAS: APP   🚀🚀🚀`);
    console.log(`   -`, { method: 'GET', url: '/api/status'})
})