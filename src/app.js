import  express from "express";
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import mongoose from "mongoose";
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'

import __dirname from './utils.js'


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

//Conección a la Database
mongoose.set("strictQuery", false);
const URL =
  "mongodb+srv://ricardo:Matrix39@cluster0.e5qotqq.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(URL, {dbName: "ecommerce",})
.then(() => {console.log("DB connected!!");
     //Corremos el Servidor o Server
    //  const io = new Server(server);
    const server = app.listen(8080, () => console.log("Listening..."));
    server.on("error", (e) => console.error(e));
  })
  .catch((e) => {
    console.log("Can't connected to DB");
  });


// //Configuración socket.io
// const httpServer= app.listen(8080);


// io.on('connection', socket=>{
//     socket.on('new-product', async data=>{
//         try{
             
//               const { title, descripcion, price,thumbnail, code, stock } =data;
//             //    const thumbnail = Array.isArray(data.thumbnail)
//             //      ? data.thumbnail
//             //      : [data.thumbnail];
//                   if (!title ||!descripcion ||!price ||!code ||!stock 
//                   ) {
//                     console.log("All fields are required");
//                   }
//            const productManager = new ProductManager("./dataBase/productos.json");

// await productManager.addProduct(title,descripcion,price,thumbnail,code,stock);

// const productos= await productManager.getProduct()
// socket.emit('reload-table',productos)


//         }catch(e){
//         console.error(e)
//         }
        
//     })
// })