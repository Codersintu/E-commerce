const router=require("express").Router()
const Order=require("../module/Order")
const {verifyToken, verifyTokenAndAdmin}=require("../Verifytoken")

//create order
router.post("/",verifyToken,async(req,res)=>{
    const newOrder=new Order(req.body);
    try {
        const savedOrder=await newOrder.save();
        if (!savedOrder) {
            res.status(400).json("order is not saved!")
        }
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error)
    }
});

//update
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const updatedOrder=await Order.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },
            {new: true}
        );
        if (!updatedOrder) {
         return   res.status(400).json("product update failed!")
        }
      return  res.status(200).json(updatedOrder);
    } catch (error) {
      return  res.status(500).json(error)
    }
});

//Delete
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
      return  res.status(200).json("product has been deleted");
    } catch (error) {
     return   res.status(500).json(error);
    }
  })

  //get userorder
router.get("/find/:userId",async(req,res)=>{
    try {
        const orders=await Order.findById({ userId: req.params.userId});
        if (!orders) {
          return  res.status(400).json("product doesn't exist")
        }
      return  res.status(200).json(orders);
    } catch (error) {
      return  res.status(500).json(error);
    }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get monthly income
  router.get('/income',verifyTokenAndAdmin,async(req,res)=>{
    const productId=req.query.pid;
    const date =new Date();
    const lastMonth=new Date(date.setMonth(date.getMonth()-1));
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try {
        const income=await Order.aggregate([
            {
                $match:{
                    createdAt: {$gte: previousMonth},
                    ...(productId && {
                        products:{$elemMatch:{productId}}
                    }),
                },
            },
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount",
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sales"},
                },
            },
        ]);
    } catch (error) {
        res.status(500).json(error)
    }
  })

  module.exports=router;