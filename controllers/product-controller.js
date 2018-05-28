const Product = require('mongoose').model('Product');

module.exports = {
    getCreateProductView: (req, res) => {
        res.render('product/createProduct');
    },
    createProduct: (req, res) => {
        let reqBody = req.body;

        if(reqBody.size > 24 || reqBody.size < 17) {
            res.locals.globalError = "Product size must be between 17 and 24.";
            res.render('product/createProduct');
            return;
        }      
        
        let productObj = {
            category: reqBody.category,
            image: reqBody.imageUrl,
            size: reqBody.size
        }

        if (reqBody.toppings !== "") {
            let toppingsArr = reqBody.toppings.split(", ");
            productObj.toppings = toppingsArr;
        }

        Product.create(productObj).then((p) => {
            res.render('product/createProduct', {successMessage: 'One product added!'})
        }).catch((err) => {
            res.locals.globalError = err.message;
            res.render('product/createProduct')
        })
    }
};