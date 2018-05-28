const Product = require('mongoose').model('Product');

module.exports = {
    index: (req, res) => {
        Product.find({category: 'Chicken'}).then((chickenProducts) => {
            Product.find({category: 'Lamb'}).then((lambProducts) => {
                Product.find({category: 'Beef'}).then((beefProducts) => {
                    res.render('home/index', {chickenProducts, lambProducts, beefProducts});
                })
            })
        })
    }
};