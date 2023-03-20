const Product=require('../models/ProductModel');
const jwt=require('jsonwebtoken');

exports.addProd = async (req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"unauthorized access"
            })
        }
        const newProd=await Product.create({
            title:req.body.title,
            descrip:req.body.descrip,
            rating:req.body.rating,
            price:req.body.price,
            image:req.body.image
        });
        
        res.status(200).json({
            status:"success",
            newProd,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:err,
        })
    }
}

exports.getProd=async (req,res)=>{
    try{
       
        var data=await Product.find();
        var rating=[];
        
        let i=0;
        while(i<data.length){
            var temp=[];
            if(data[i].rating>5){
                for(let j=0;j<5;j++){
                    temp.push(j);
                }
            }else{
                for(let j=0;j<data[i].rating;j++){
                    temp.push(j);
                }
            }
            rating.push(temp);
            i++;
        }

        i=0;
        while(i<data.length){
          data[i].rate=rating[i];
          i++;
        }

        res.status(200).json({
            status:"success",
            data,
        });
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:err,
        });
    }
}

exports.delProd=async(req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"you are not authorized to do this action"
            })
        }

        await Product.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({
            status:"success",
            message:"deleted successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"internal server error"
        })
    }
}

exports.getProdOne=async (req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"you are not authorized to do the action"
            });
        }
        const data=await Product.findById({_id:req.headers.params});
        res.status(200).json({
            status:"success",
            data
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"internal server error"
        })
    }
}

exports.updateProd=async (req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"you are not authorized to access this page",
            })
        }
        const data=await Product.findByIdAndUpdate({_id:req.headers.params},{
            image:req.body.image,
            title:req.body.title,
            descrip:req.body.descrip,
            rating:req.body.rating,
            price:req.body.price
        });

        console.log(data);

        res.status(200).json({
            status:"success",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"internal server error",
        })
    }
}