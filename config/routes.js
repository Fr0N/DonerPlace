const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    //Product
    app.get('/createProduct', restrictedPages.hasRole('Admin'), controllers.product.getCreateProductView);
    app.post('/createProduct', restrictedPages.hasRole('Admin'), controllers.product.createProduct);

    //Order
    app.get('/customizeOrder/:id', controllers.order.getCustomizeOrderView);
    app.post('/customizeOrder', controllers.order.createOrder);

    app.get('/orderDetails/:id', controllers.order.getOrderDetailsView);

    app.get('/orderStatus', controllers.order.getOrderStatusView);

    app.get('/allOrders', restrictedPages.hasRole('Admin'), controllers.order.getAllOrdersView);
    app.post('/allOrders', restrictedPages.hasRole('Admin'), controllers.order.saveAllOrders);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};