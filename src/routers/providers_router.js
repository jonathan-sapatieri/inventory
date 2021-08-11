const providersRouter = require('express').Router();
const productsRouter = require('./products_router');
const ProvidersController = require('../controllers/providers_controller');

// OPTIONS
providersRouter.options('/', ProvidersController.getCorsOptions);
providersRouter.options('/:id', ProvidersController.getCorsOptions);

// LOADERS
providersRouter.use('/:id', ProvidersController.loadById);

// HEADERS
providersRouter.use('/', ProvidersController.setHeaders);
providersRouter.use('/:id', ProvidersController.setHeadersById);
providersRouter.head('/:id', ProvidersController.getHeaders);

// OPERATIONS
providersRouter.get('/', ProvidersController.list);
providersRouter.get('/:id', ProvidersController.getById);
providersRouter.post('/', ProvidersController.save);
providersRouter.put('/:id', ProvidersController.update);
providersRouter.delete('/:id', ProvidersController.delete);

// ROUTES
providersRouter.use('/:idProvider/products', productsRouter);

module.exports = providersRouter;
