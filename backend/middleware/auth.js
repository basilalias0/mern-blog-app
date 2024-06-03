const jwt = require('jsonwebtoken')


const isAuth = ((req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        throw new Error("Token not found")
    }else{
        const decoded = jwt.verify(token,process.env.jwtSecretKey)
        if(!decoded){
            throw new Error("Token not verified")
        }else{
            req.user = decoded
            next()
        }
    }
})

module.exports = isAuth