const express = require("express");
const mongoose = require("mongoose")

const app = express();
const Product = require("./models/product")
mongoose.connect("mongodb+srv://nesreenazamli:oMN1Hcqjln27NNh5@cluster0.soqseaw.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp").then(() => {
    console.log("true")
}).catch((e) => {
    console.log(e)
})

app.use(express.json());

app.get("/hello", (req, res) =>  {
    res.send("hello")
    }
)
app.get("/hi", (req, res) =>  {
        res.json({id:1})
    }
)
app.get("/file", (req, res) =>  {
        // res.sendFile(__dirname + "/views/test.html") //ssr html
   res.render("test.ejs", {
       id: 1,
   }) // goes inside views dir

    }
)
app.get("/user/:id", (req, res) =>  {

    res.json({id: req.params}) // path params
    // res.json({id: req.body}) // body params
    // res.json({id: req.query}) // query params ?key=value
    }
)

// products

app.post("/products", async (req, res) => {
   const newProduct = new Product();

   const title = req.body.title;
   const body = req.body.body;
   const likes = req.body.likes;

    newProduct.title = title;
    newProduct.body = body;
    newProduct.likes = likes;
    await newProduct.save();

    res.json({message : "Product store successfully",
        newProduct
    })
})
app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products)
})
app.get("/products/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id)
        res.json(product)
    } catch (e) {
        res.send(e)
    }

})

app.get("/show-products", async (req, res) => {
    const products = await Product.find();
    res.render("products.ejs", {
        products: products,
    })
})

app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(id)
        res.json(product);
        // return;
    } catch (e) {
        res.send(e)
    }

})


app.listen(3003, ()=> {
    console.log("testfff")

})