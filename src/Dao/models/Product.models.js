import mongoose from "mongoose";

const productsCollection='products'

const productsschema = new mongoose.Schema({
  title: String,
  descripcion: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock:Number
});

const productModel = mongoose.model(productsCollection,productsschema);

export default productModel

