const router = require("express").Router()
const Product = require("../models/Product")
const { verifyTokenAdmin, verifyTokenAndAuthorization } = require("./jwtMiddlewarePerm")



//CREATE product
router.post('/', verifyTokenAdmin, async (req, res) =>{
    //creating new product
    const newProduct = new Product(req.body)

    try{
        //saving the new product created
        const product = await newProduct.save()
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }
})


//UPDATE product
router.put('/:id', verifyTokenAdmin, async(req,res)=>{
    try{
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,{
                $set : req.body,
            },
            {new : true}
        )
        res.status(200).json(updateProduct)
    }catch(err){
        res.status(500).json(err)
    }
})


//DELETE product
router.delete('/:id', verifyTokenAdmin, async (req,res)=>{
    try{
         await Product.findByIdAndDelete(req.params.id)
         res.status(200).json("Product has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})


//GET product
router.get('/find/:id', async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
   }catch(err){
       res.status(500).json(err)
   }
})


//GET ALL PRODUCTS
router.get('/find', async (req,res)=>{
    try{
        const product = await Product.find()
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }

     //add query to the URL to filter and sort
    //  const qNew = req.query.new
    //  const qCategory = req.query.category

    //  try{
        // let products;

        // if(qNew){
        //     products = await Product.find().sort({createdAt: -1}).limit(5)
        // }else if (qCategory) {
        //     products = await Product.find({
        //         categories : {
        //             $in : [qCategory],
        //         }
        //     })
        // }else{
        //     products = await Product.find()
        // }

    //     res.status(200).json(products)
    // }catch(err){
    //     res.status(500).json(err)
    // }
})


module.exports = router