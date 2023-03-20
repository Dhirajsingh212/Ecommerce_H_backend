const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    descrip: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type:String,
        required:true,
    },
    rate:{
        type:Array,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
