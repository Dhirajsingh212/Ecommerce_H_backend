const express = require('express');
const controllers = require('./../controllers/controllers');
const prodControllers=require('./../controllers/prodControllers');
const cartControllers=require('../controllers/cartControllers');

const router = express.Router();

//USER ROUTES
router.route('/Signup').post(controllers.signup);
router.route('/Login').post(controllers.login);

//ADMIN-PRODUCT ROUTES
router.route('/addprod').post(prodControllers.addProd);
router.route('/getprod').get(prodControllers.getProd);
router.route('/:id').delete(prodControllers.delProd);
router.route('/getprodone').get(prodControllers.getProdOne)
router.route('/updateprod').put(prodControllers.updateProd);


//CART-PRODUCTS
router.route('/cart/addprod').post(cartControllers.addCart);
router.route('/cart/getprod').get(cartControllers.getCart);
router.route('/cart/quantity').put(cartControllers.patchQuantity);
router.route('/cart/delete').delete(cartControllers.deleteCart);

//USER-DATA
router.route('/user/getdata').get(controllers.getUser);
router.route('/user/update').put(controllers.updateUser);
router.route('/user/delete').delete(controllers.deleteUser);
module.exports = router;
