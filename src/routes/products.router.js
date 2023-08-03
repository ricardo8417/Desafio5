import {Router} from 'express'
// import ProductManager from "../manager/ProductManager.js";
import productModel from '../Dao/models/Product.models.js'

const router = Router()
// const producto = new ProductManager("./dataBase/productos.json");


router.post("/", async (req, res) => {
  try {
    // const product = req.body
    // const result= await productModel.create(product)
    //  res.send({ status: "success", payload: result });

    //1 creo un objeto:

    const newProduct = {
      title,
      descripcion,
      price,
      thumbnail,
      code,
      stock,
    };

    //2 uso el modelo para subir el objeto a la base de datos:

    const result = await productModel.create(newProduct);

    res.send({ status: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.send({ result: "error", error });
  }
});

//Borrar Productos
router.get('/delete/:pid',async(req,res)=>{
  try{
    const id = req.params.pid;
       await productModel.deleteOne({_id:id})
      res.redirect("/products");

  }catch(error){
    res.send({ result: "error", error });
  }
})


router.get('/',async(req,res)=>{
  try{
    const products= await productModel.find()
    res.send(products)
  }catch(e){
    res.send(e)
  }
 
})



// router.get("/", async (req, res) => {
//   const limit = parseInt(req.query.limit);

//   if (limit) {
//     try {
//       const products = await producto.getProduct();

//       const limitProducts = products.slice(0, limit);

//       return res.status(200).json(limitProducts);
//     } catch (error) {
//       return res
//         .status(404)
//         .json({ error: "Error al obtener la lista de productos" });
//     }
//   } else {
//     const products = await producto.getProduct();
//     console.log("ruta productos", products);
//     return res.status(200).json(products);
//   }
// });

// router.get("/:pid", async (req, res) => {
//   const id = parseInt(req.params.pid);

//   const products = await producto.getProductById(id);

//   if (!products) res.send({ error: "Productos not found" });
//   else res.send(products);
// });

// router.post('/', async(req,res)=>{

//   //Se instancia en el body cada campo.
//   const title= req.body.title
//   const descripcion = req.body.descripcion
//   const price = req.body.price
//   const thumbnail= req.body.thumbnail
//   const code = req.body.code
//   const stock= req.body.stock

  
// const result = await producto.addProduct(title,descripcion,price,thumbnail,code,stock);
// res.send(result)
// })

// router.put('/:pid',async(req,res)=>{
//   let pid=req.params.pid
//   const title = req.body.title;
//   const descripcion = req.body.descripcion;
//   const price = req.body.price;
//   const thumbnail = req.body.thumbnail;
//   const code = req.body.code;
//   const stock = req.body.stock;

//   const actualizar = await producto.updateProduct(pid,title,descripcion,price,thumbnail,code,stock)
//   res.send(actualizar)
// })


export default router