const Cart=require('../models/CartModel');
const jwt=require('jsonwebtoken');
const Product=require('../models/ProductModel');

exports.addCart=async (req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"not authorized to visit this page",
            });
        };
        const userid=decoded.id;
        
        const productData=await Product.findById({_id:req.body.productid});
        
        const checkData=await Cart.find({title:productData.title});
        
        // console.log(checkData[0].userId);

        if(checkData.length>0 && checkData[0].userId===userid){
            res.status(400).json({
                status:"fail",
                message:"error",
            });
            return;
        }        

        const data=await Cart.create({
            userId:userid,
            title:productData.title,
            descrip:productData.descrip,
            price:productData.price,
            rating:productData.rating,
            image:productData.image,
            productId:req.body.productid,
        })
        res.status(200).json({
            status:"success",
            data,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"internal server error",
        })
    }
}

exports.getCart=async(req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"not authorized to access this page",
            });
        };

        const data=await Cart.find({userId:decoded.id});

        res.status(200).json({
            status:"success",
            data
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"internal server error"
        });
    }
}

exports.patchQuantity=async(req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"you are not authorized to access this page",
            });
        }

        await Cart.findOneAndUpdate({productId:req.body.productid},{quantity:req.body.quantity});

        res.status(200).json({
            status:"success",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"internal server error"
        })
    }
}

exports.deleteCart=async(req,res)=>{
    try{
        const decoded=jwt.verify(req.body.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"you are not authorized to access this page"
            })
        }

        await Cart.findOneAndRemove({productId:req.body.productid});
        res.status(200).json({
            status:"success",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"internal server error"
        })
    }
}