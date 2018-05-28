const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {type: String, required: true},
    size: {type: Number, required: true, min: 17, max: 24},
    image: {type: String, required: true},
    toppings: [{type: String}]
})

module.exports = mongoose.model('Product', productSchema);