const router=require("express").Router();
const User=require("../module/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

//register
router.post('/register',async(req,res)=>{
    try{
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already taken.' });
    }

    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email already registered.' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
       
        const savedUser=await newUser.save();
        if (!savedUser) {
            console.log('user is not save')
        }
    return    res.status(200).json(savedUser)
    } catch (error) {
      return  res.status(500).json({message:"register is unsuccessfully:",error:error.message})
    }
});

//login
router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            // Return after sending response to prevent further code execution
            return res.status(401).json("wrong credentials");
        }

        const validate = await bcrypt.compare(req.body.password, user.password);

        if (!validate) {
            // Return after sending response to prevent further code execution
            return res.status(401).json("wrong credentials");
        }
        const accessToken=jwt.sign(
            {
                id:user._id,
                isAdmin:user.isAdmin,
            },
            process.env.SECRET_KEY,
            {expiresIn:"3d"}
        );

        const {password,...others}=user._doc;
      return  res.status(200).json({...others,accessToken})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });    }
})
module.exports=router;

