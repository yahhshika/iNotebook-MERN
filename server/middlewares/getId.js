const jwt = require("jsonwebtoken");
const SECRET_KEY = "yahhshika";

let getId = (req,res,next)=>{
    let token = req.header("auth-token");
    let success = true;
    if(!token){
       success = false;
       return res.status(400).json({success,error:"please authenticate using a valid token"})
    }
    try{

        const data = jwt.verify(token, SECRET_KEY);
        req.user = data.user;
        next();

    }catch(e){
        success = false
        return res.status(400).json({success,error:"Internal Server Error in token authentication"});

    }
}
module.exports = getId;