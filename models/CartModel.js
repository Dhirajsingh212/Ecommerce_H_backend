const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
    },
    title:{
        type:String,
        required:true,
    },
    descrip:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    productId:{
        type:String,
        required:true,
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
