const mongoose = require("mongoose");

const Schema = mongoose.Schema

const productSchema = new Schema({
    title:String,
    body: String,
    likes: Number,
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product