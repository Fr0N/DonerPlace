const Product = require('mongoose').model('Product');
const Order = require('mongoose').model('Order');

module.exports = {
    getCustomizeOrderView: (req, res) => {
        let productId = req.params.id;
        Product.findById(productId).then((foundProduct) => {
            let category = foundProduct.category;
            res.render('order/customizeOrder', {foundProduct})
        })
    },
    createOrder: (req, res) => {
        let reqBody = req.body;       

        let orderObj = {
            creator: req.user._id,
            product: reqBody.productId,
            creationDate: new Date().toGMTString().split('GMT')[0],
            toppings: reqBody.toppings,
            status: 'Pending'
        }
        
        Order.create(orderObj).then((order) => {
            res.redirect('/orderDetails/' + order._id)
        }).catch((err) => {
            res.locals.globalError = err.message;
            res.render('order/orderDetails')
        })
    },
    getOrderDetailsView: (req, res) => {
        let orderId = req.params.id;

        Order.findById(orderId).populate('product').then((order) => {

            order.isPending = order.status === "Pending" ? true : false;
            order.isInProgress = order.status === "In Progress" ? true : false;
            order.isInTransit = order.status === "In Transit" ? true : false;
            order.isDelivered = order.status === "Delivered" ? true : false;
            
            res.render('order/orderDetails', {order})
        }).catch((err) => {
            res.locals.globalError = err.message;
            res.render('order/orderDetails')
        })
    },
    getOrderStatusView: (req, res) => {
        let userId = req.user.id;
        
        Order.find({creator: userId}).populate('product').then((orders) => {
            
            res.render('order/orderStatus', {orders})
        }).catch((err) => {
            res.locals.globalError = err.message;
            res.render('order/orderStatus')
        })
    },
    getAllOrdersView: (req, res) => {
        Order.find().populate('product').then((orders) => {
            res.render('order/allOrders', {orders})
        }).catch((err) => {
            res.locals.globalError = err.message;
            res.render('order/orderStatus')
        })
    },
    saveAllOrders: (req, res) => {
        let reqBody = req.body;

        for(let orderId in reqBody) {
            Order.findById(orderId).then((order) => {
                if (order.status !== reqBody[orderId]) {
                    console.log(reqBody[orderId])
                    order.status = reqBody[orderId];
                    order.save()
                }
            })
        }

        res.redirect('/allOrders')
    }
};