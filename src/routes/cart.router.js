import { Router } from "express";
// import CartManager from "../manager/CartManager.js";
// import ProductManager from "../manager/ProductManager.js";

const router = Router();
// const cartManager = new CartManager("./dataBase/dataCart.json");
// const producto = new ProductManager("./dataBase/productos.json")
// router.get("/", async (req, res) => {
//   try {
//     const carts = await cartManager.getCarts();
//     res.status(200).json(carts);
//   } catch (err) {
//     res.status(400).json({ error400: "Bad Request" });
//   }
// });

// router.get("/:cid", async (req, res) => {
//   let { cid } = req.params;

//   try {
//     const cart = await cartManager.getCartById(Number(cid));
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(404).json({ error404: "Not Found" });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const addCart = await cartManager.createCart();
//     res.status(200).json(addCart);
//   } catch (e) {
//     res.status(404).json({ error404: "Not Found" });
//   }
// });

// router.delete("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     await cartManager.deleteCart(Number(cid));
//     res.status(200).json(`Cart with id: ${cid} was removed`);
//   } catch (err) {
//     res.status(400).json({ error400: "Bad Request" });
//   }
// });

// router.post("/:cid/products/:pid",async(req,res) =>{
//   try{
//     const cid = Number(req.params.cid)
//     const pid= Number(req.params.pid)
//     console.log(await producto.getProductById(pid))

 
//   const addProduct = await cartManager.updateCart(cid, pid, 1);
  
//   res.status(200).json(addProduct)

//   }catch(e){
//  res.status(400).json({ error400: "Bad Request" });
//   }


// });
export default router;
