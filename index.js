const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
var cors = require('cors')

dotenv.config()

mongoose.connect(
    process.env.MONGO_URL
).then(()=> console.log('DB connected'))
.catch(err =>{
    console.log(err);
})
app.use(cors())

app.use(express.json())

app.use('/commerce/auth' , require('./routes/authRoute'))
app.use('/commerce/product', require('./routes/product_routes'))
app.use('/commerce/order', require('./routes/order_route'))
app.use('/commerce/cart', require('./routes/cart_route'))
app.use('/commerce/user', require('./routes/user_route'))



app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server Runnig ...');
})