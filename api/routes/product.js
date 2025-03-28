
import {Router} from "express"
const router=Router();
import Product  from "../module/Product.js";
import { authorizedRoles } from "../Auth.js";

//create
router.post('/',authorizedRoles("ADMIN"),async (req,res) =>{
    const newProduct=new Product(req.body);
    if (!newProduct) {
      return  res.status(400).json("product create failed!")
    }

    try {
        const savedProduct=await newProduct.save();
        if (!savedProduct) {
         return   res.status(400).json("failed to save in database")
        }
      return  res.status(200).json(savedProduct);
    } catch (error) {
      return  res.status(500).json(error)
    }
})
//update
router.put("/:id",authorizedRoles("ADMIN"),async(req,res)=>{
    try {
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },
            {new: true}
        );
        if (!updatedProduct) {
         return   res.status(400).json("product update failed!")
        }
      return  res.status(200).json(updatedProduct);
    } catch (error) {
      return  res.status(500).json(error)
    }
});

//Delete
router.delete("/:id",authorizedRoles("ADMIN"),async(req,res)=>{
  try {
      await Product.findByIdAndDelete(req.params.id);
    return  res.status(200).json("product has been deleted");
  } catch (error) {
   return   res.status(500).json(error);
  }
})

//get product
router.get("/find/:id",async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        if (!product) {
          return  res.status(400).json("product doesn't exist")
        }
      return  res.status(200).json(product);
    } catch (error) {
      return  res.status(500).json(error);
    }
});
//get all products
router.get("/",async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    try {
        let products;
        if (qNew) {
            products=await Product.find().sort({createdAt: -1}).limit(1);
        }else  if (qCategory) {
            products=await Product.find({
             categories:{
                $in:[qCategory],
             },
            });
        }else{
            products=await Product.find();
        }
        return res.status(200).json(products);
    } catch (error) {
       return res.status(500).json(error)
    }
});


export default router;