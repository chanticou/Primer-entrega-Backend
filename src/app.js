const express = require('express')
const app = express()
const foodRoutes = require('./routes/Foods')
const cartRoutes = require('./routes/Cart')
const {Server} = require('socket.io') 

let PORT = process.env.PORT||8040
const server =  app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)}) 
const io = new Server(server)  

//Midleware
app.use(express.static(__dirname+('/public')))

//Midleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//Para pdoer utilizar mis midleware 
//Cuando accedas a la ruta food, quiero que ejecutes mi router de foods 
app.use('/food', foodRoutes)
app.use('/api/cart', cartRoutes)






let log = []
io.on('connection',(socket)=>{
    console.log('Socket connected')

    socket.on('message', data=>{
        log.push(data)
        socket.emit('history', log)
    })
})












// io.on('connection',(socket)=>{
//     socket.on('message', data=>{
//         console.log(data)
//     })
// })