const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()

mongoose.connect(
    process.env.MONGO_URL
    // "mongodb+srv://Ambrose:Ambro12345@cluster0.tlpb9.mongodb.net/commerce?retryWrites=true&w=majority"
).then(()=> console.log('DB connected'))
.catch(err =>{
    console.log(err);
})


app.use(express.json())

app.use('/commerce/auth' , require('./routes/user_route'))
app.use('/commerce/product', require('./routes/product_routes'))
app.use('/commerce/order', require('./routes/order_route'))
app.use('/commerce/cart', require('./routes/cart_route'))
app.use('/commerce/user', require('./routes/user_route'))


app.listen(5000, ()=>{
    console.log('Server Runnig ...');
})

