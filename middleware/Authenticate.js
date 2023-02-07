const jwt = require('jsonwebtoken');
const signupModal = require("../models/signupSchema")

const Authenticate = async(req, res, next)=>{
    try{
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, 'aacdddc4447f9de04d906d2635abf9f4073fcf3818968cdd6b9755ca0fb62625468d26250e985858b5eb83a723a2dd415546e7682ba922e769036c8566b836da')
        if(verifyToken){
            const userDetail = await signupModal.find({email : verifyToken })
            // console.log(verifyToken)

            if(userDetail.length){
                // res.status(205).send( userDetail)
                console.log(userDetail)
                next()
            }else{
                res.status(409).send("User not found")
            }
            // console.log(userDetail)

        }else{
            res.status(409).send("User not Authorized")
        }
        
    } catch(err){
        res.status(409).send("Unauthorized user")
        // console.log(err)
    }
    

}

module.exports = Authenticate;