const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    creator: {type: ObjectId, ref: 'User', required: true},
    product: {type: ObjectId, ref: 'Product', required: true},
    creationDate: {type: String, required: true},
    toppings: [{type: String}],
    status: {type: String, required: true}
})

module.exports = mongoose.model('Order', orderSchema);