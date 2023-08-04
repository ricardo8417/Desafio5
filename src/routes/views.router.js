import { Router } from "express";
// import ProductManager from "../manager/ProductManager.js";
import productModel from "../Dao/models/Product.models.js";
import messageModel from "../Dao/models/messages.models.js"
// import cartModel from "../Dao/models/cart.model.js";
const router = Router()
// const productos = new ProductManager("./dataBase/productos.json");

// router.get('/',(req,res)=>{
//     res.render('index',{})
// })


router.get("/chat", async (req, res) => {
  const messages = await messageModel.find().lean().exec()
  res.render("chat", {messages});
});

// //Consultamos la lista de productos de Nuestra BD
router.get("/products", async (req, res) => {
  try {
    const products = await productModel.find().lean().exec();

    res.render("products", { products });
  } catch (e) {
    console.error(e);
  }
});


router.get("/products-realtime", async (req, res) => {
  try {
    const products = await productModel.find().lean().exec()

res.render("products_realtime", { products });
  } catch (e) {
    console.error(e);
  }
});


//   //Ruta de formulario de Productos.
  router.get("/form-products", async (req, res) => {

  try {
    
    res.render("form", {});
    
  } catch(e) {
    console.error(e)
  }

});

//Creamos el post para el formulario
 router.post("/form-products", async (req, res) => {
   try {
     //Se instancia en el body cada campo.
     const title = req.body.title;
     const descripcion = req.body.descripcion;
     const price = req.body.price;
     const thumbnail = req.body.thumbnail;
     const code = req.body.code;
     const stock = req.body.stock;
     const newProduct = {
       title,
       descripcion,
       price,
       thumbnail,
       code,
       stock,
     };
     const result = await productModel.create(newProduct);

     //  res.send({ status: "success", payload: result });

     res.redirect("/products");
     //  res.render("form", {});
   } catch (e) {
     console.error(e);
   }
 });
   //Borrar Productos
router.delete('/:pid',async(req,res)=>{
  try{
    const id = req.params.pid;
       await productModel.deleteOne({_id:id})
      res.redirect("/products");

  }catch(error){
    res.send({ result: "error", error });
  }
})
 

export default router