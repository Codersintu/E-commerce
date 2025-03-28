// const router=require('express').Router();
// const User=require("../module/User")
// const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin }=require("../Verifytoken");

// //update
// router.put('/:id',verifyTokenAndAuthorization, async(req,res) => {
//     if (req.body.user_id ===req.params.id) {
//         try {
//             const updateUser=await User.findByIdAndUpdate(
//                 req.params.id,
//                 {
//                     $set: req.body,
//                 },
//                 { new: true}
//             )
//           return  res.status(200).json(updateUser);
//         } catch (error) {
//           return  res.status(500).json("update failed!")
//         }
//     }else{
//         console.log('you have to not allow to update')
//     }
// })

// //delete

// router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{
//     try {
//         await User.findByIdAndDelete(req.params.id);
//        return res.status(200).json("user delete successfully")
//     } catch (error) {
//       return  res.status(500).json("delete failed")
//     }
// })

// //get user
// router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
//     try {
//         const user=await User.findById(req.params.id);
//         const {password,...others}=user._doc;
//        return res.status(200).json(others);
//     } catch (error) {
//        return res.status(500).json(err);
//     }
// });

// //get all user
// router.get("/",verifyTokenAndAdmin,async(req,res)=>{
//     const query=req.query.new;
//     try {
//         const users = query ? await User.find().sort({ _id: -1}).limit(5)
//         : await User.find();
//        return res.status(200).json(users);
//     } catch (error) {
//        return res.status(500).json(err)
//     }
// });
// //get all stats
// router.get('/stats',verifyTokenAndAdmin,async(req,res)=>{
//        const date=new Date();
//        const lastYear=new Date(date.setFullYear(date.getFullYear() - 1));

//        try {
//         const data=await User.aggregate([
//             { $match: { createdAt: { $gte: lastYear}}},
//             {
//                 $project:{
//                     month: {
//                         $month: "$createdAt"
//                     },
//                 },
                
//             },
//             {
//                 $group: {
//                   _id: "$month",
//                   total:{$sum:1},
//                 },
//             },
//         ]);
//       return  res.status(200).json(data)
//        } catch (error) {
//       return  res.status(500).json(err)
//        }
// });


// module.exports=router;