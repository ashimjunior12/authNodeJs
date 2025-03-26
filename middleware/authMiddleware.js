const jwt = require("jsonwebtoken")

function authMiddleware(req,res,next){
 const token = req.header("Authorization")
 if(!token) return res.status(401).json({message:"Access Denied"});

 try {
  const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_TOKEN)
  req.user = verified;
  next()
 } catch (error) {
  res.status(500).json({message:error})
 }
}

module.exports = authMiddleware