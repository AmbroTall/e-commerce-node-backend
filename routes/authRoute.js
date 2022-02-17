const router = require("express").Router();
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")



//Register a new user in the Mongo Db Users Model
router.post('/register', async (req,res)=>{

    //Create a new user from our DB
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,

        // using crypto-js to encrypt my password
        password : CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });

    try{
        //Saving our new user to the db
        const user = await newUser.save()
        res.status(200).json({msg : `User ${req.body.username} is registered`, user})
    }catch(err){
        //Providing a Response when an error is captured
        res.status(500).json("All Fields Required")
    }
})



//Login Logic
router.post('/login', async (req,res)=>{
    try{
        // Using Mongo Db function 'findOne' to filter a specific username the DB
        const user = await User.findOne({username: req.body.username})

        //Checking if username exists
        !user && res.status(401).json("Username does not exist")

        //taking the hashed pswd in the register logic
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)

        //converting the hashed password to a string
        const originalPasswd = hashedPassword.toString(CryptoJS.enc.Utf8)
        originalPasswd !== req.body.password && res.status(401).json("Password does not match")

        //################# JWT ####################
        //Using the id and isAdmin fields from our DB
        
        const accessToken = jwt.sign(
            {
                id:user._id,
                isAdmin : user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        )


        //hide password when returning user information from DB
        const {password, ...others} = user._doc

        res.status(200).json({msg: "Login Success", ...others, accessToken})
    }catch(err){
        res.status(401).json({err})
    }
})

module.exports = router







