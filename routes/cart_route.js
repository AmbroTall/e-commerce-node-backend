const router = require("express").Router()
const Cart = require("../models/Product")
const { verifyTokenAdmin, verifyTokenAndAuthorization } = require("./jwtMiddlewarePerm")



//CREATE Cart
router.post('/', verifyTokenAndAuthorization, async (req, res) =>{
    //creating new cart
    const newCart = new Cart(req.body)

    try{
        //saving the new cart created
        const cart = await newCart.save()
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})


//UPDATE cart
router.put('/:id', verifyTokenAndAuthorization , async(req,res)=>{
    try{
        const updateCart= await Cart.findByIdAndUpdate(
            req.params.id,{
                $set : req.body,
            },
            {new : true}
        )
        res.status(200).json(updateCart)
    }catch(err){
        res.status(500).json(err)
    }
})


//DELETE cart
router.delete('/:id', verifyTokenAndAuthorization, async(req,res)=>{
    try{
         await Cart.findByIdAndDelete(req.params.id)
         res.status(200).json("Cart has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})


//GET user cart
router.get('/find/:userid', verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const cart = await Cart.findOne({userId : req.params.userid})
        res.status(200).json(cart)
   }catch(err){
       res.status(500).json(err)
   }
})


//GET ALL PRODUCTS
router.get('/find', verifyTokenAdmin,async (req,res)=>{
    try{
        const cart = await Cart.find()
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router