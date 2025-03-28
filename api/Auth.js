import jwt from 'jsonwebtoken'
const isLoggedIn=async(req,res,next)=>{
   
 let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];


 if (!token) {
        return res.status(401).json("Unauthenticated,please login again")
}
const userDetails=await jwt.verify(token,process.env.JWT_SECRET) ;
    req.user=userDetails;
    console.log(req.user)
    next();
    
}

const authorizedRoles = (...roles) => async (req, res, next) =>{
    console.log(req.user)
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
        return res.status(400).json("you do not have access this page")
        
    }
    next();
}
export { isLoggedIn,authorizedRoles};