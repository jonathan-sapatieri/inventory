const ProductsService = require('../services/products_service');
const IdNotFoundError = require('../errors/id_not_found_error');

class ProductsController {
  getCorsOptions(req, res, next) {
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DElETE');
    res.status(204);
    res.end();
  }

  async loadById(req, res, next) {
    try {
      const product = await ProductsService.getById(
        req.params.idProvider,
        req.params.id
      );
      if (product) {
        product.provider = req.provider;
        req.product = product;
        next();
      } else {
        throw new IdNotFoundError(req.params.id);
      }
    } catch (error) {
      next(error);
    }
  }

  setHeaders(req, res, next) {
    res.set({
      'X-Powered-By': 'Inventory',
      'Content-Type': 'application/json'
    });
    next();
  }

  async setHeadersById(req, res, next) {
    res.set({
      'Last-Modified': new Date(req.product.createdAt).getTime(),
      'Etag': req.product.version,
    });
    next();
  }

  async getHeaders(req, res, next) {
    res.sendStatus(200);
  }

  async listByProvider(req, res, next) {
    try {
      const products = await ProductsService.listByProvider(req.provider.id);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    res.status(200).json(req.product);
  }

  async save(req, res, next) {
    try {
      const product = await ProductsService.save(req.provider.id, req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const product = await ProductsService.update(
        req.provider.id,
        req.product.id,
        req.body
      );
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await ProductsService.delete(req.provider.id, req.product.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async decreaseStock(req, res, next) {
    try {
      await ProductsService.decreaseStock(req.product, req.body.stock);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async increaseStock(req, res, next) {
    try {
      await ProductsService.increaseStock(req.product, req.body.stock);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductsController();
