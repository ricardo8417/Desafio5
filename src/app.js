import  express from "express";
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import mongoose from "mongoose";
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'

import __dirname from './utils.js'
import productModel from "./Dao/models/Product.models.js";


const app = express()

//Para traer información POST como JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Configurar los motores de plantilla
app.engine('handlebars',handlebars.engine())
app.set('views', __dirname + '/views' )
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/products',productsRouter)
app.use('/api/carts',cartRouter)

//Configuración socket.io
const runServer = () => {
  const httpServer= app.listen(8080,()=>console.log('Listening...'));
  const io = new Server(httpServer);
  io.on('connection', socket=>{
      socket.on('new-product', async data=>{
          try{
              const productManager = productModel()
              await productManager.create(data)
  
  const productos= await productModel.find()
  io.emit('reload-table',productos)
            }catch(e){
          console.error(e)
            } 
      })
  })
}
//Conección a la Database
// mongoose.set("strictQuery", false);
console.log('conectando...')
const URL =
  "mongodb+srv://ricardo:Matrix39@cluster0.e5qotqq.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(URL, {dbName: "ecommerce",})

.then(()=>{
  console.log('DB connected!!')
  runServer()

})
  .catch(e=> console.log("Can't connected to DB"))

