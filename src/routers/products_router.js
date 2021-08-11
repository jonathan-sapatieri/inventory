const productsRouter = require('express').Router({ mergeParams: true });
const ProductsController = require('../controllers/products_controller');

// OPTIONS
productsRouter.options('/', ProductsController.getCorsOptions);
productsRouter.options('/:id', ProductsController.getCorsOptions);

// LOADERS
productsRouter.use('/:id', ProductsController.loadById);

// HADERS
productsRouter.use('/', ProductsController.setHeaders);
productsRouter.use('/:id', ProductsController.setHeadersById);
productsRouter.head('/:id', ProductsController.getHeaders);

// OPERATIONS
productsRouter.get('/', ProductsController.listByProvider);
productsRouter.get('/:id', ProductsController.getById);
productsRouter.post('/', ProductsController.save);
productsRouter.put('/:id', ProductsController.update);
productsRouter.delete('/:id', ProductsController.delete);

// ROUTES
productsRouter.put('/:id/decrease-stock', ProductsController.decreaseStock);
productsRouter.put('/:id/increase-stock', ProductsController.increaseStock);

module.exports = productsRouter;
