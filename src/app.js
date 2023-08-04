import  express from "express";
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import mongoose from "mongoose";
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import productModel from "./Dao/models/Product.models.js";
import messagesModel from "./Dao/models/messages.models.js";
import __dirname from './utils.js'



const app = express()

//Para traer información POST como JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static(__dirname + "/public"));

//Configurar los motores de plantilla
app.engine('handlebars',handlebars.engine())
app.set('views', __dirname + '/views' )
app.set('view engine', 'handlebars')







app.use('/', viewsRouter)
app.use('/api/products',productsRouter)
app.use('/api/carts',cartRouter)

 

//Conección a la Database
// mongoose.set("strictQuery", false);
console.log('conectando...')
const URL =
  "mongodb+srv://ricardo:Matrix39@cluster0.e5qotqq.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(URL, {dbName: "ecommerce"})

.then(()=>{
  console.log('DB connected!!')

//Configuración socket.io
  const httpServer= app.listen(8080,()=>console.log('Listening...'));
  const io = new Server(httpServer);
io.on("connection", (socket) => {
  socket.on("new-product", async (product) => {
    
      // const productManager = productModel()
      // await productManager.create(data)

      await productModel.create(product);
      const dataproduct = await productModel.find().lean().exec()
      io.emit("reload-table", dataproduct);
    })
    socket.on("new", (user) => console.log(`${user} se acaba de conectar`));

socket.on("message", async data => {
          const message = data.message;
          const user = data.user;
          const filter = { user: user };
          const updateData = { $push: { message: message } };
          try {
            await messagesModel.updateOne(filter, updateData);
  
            io.emit("logs", data);
          } catch (error) {
            console.error("Error al agregar el mensaje al usuario:", error);
          }
          
        })
  });
})
  .catch(e=> console.log("Can't connected to DB"))


  

