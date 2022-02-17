const jwt = require("jsonwebtoken")


// creating a middleware to verify if the user is authenticated
const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if (err) res.status(403).json("Token is not valid")
            req.user = user
            next()
        })
    }else {
        return res.status(401).json("You are not authenticated")
    }
}

// Checking if its self.request.user or is admin to perform a certain CRUD implementation
const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed to do that")
        }
    })
}


// Checking if its Admin to perform other requests
const verifyTokenAdmin = (req,res,next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed to do that")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin}