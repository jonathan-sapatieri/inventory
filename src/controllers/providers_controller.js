const ProvidersService = require('../services/providers_service');
const IdNotFoundError = require('../errors/id_not_found_error');

class ProvidersController {
  getCorsOptions(req, res, next) {
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DElETE');
    res.status(204);
    res.end();
  }

  async loadById(req, res, next) {
    try {
      const provider = await ProvidersService.getById(req.params.id);
      if (provider) {
        req.provider = provider;
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
      'Last-Modified': new Date(req.provider.createdAt).getTime(),
      'Etag': req.provider.version,
    });
    next();
  }

  async getHeaders(req, res, next) {
    res.sendStatus(200);
  }

  async list(req, res, next) {
    try {
      const providers = await ProvidersService.list();
      res.status(200).json(providers);
    } catch (error) {
      next(error);
    }
  }

  getById(req, res, next) {
    res.status(200).json(req.provider);
  }

  async save(req, res, next) {
    try {
      const provider = await ProvidersService.save(req.body);
      res.status(201).json(provider);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      await ProvidersService.update(req.provider.id, req.body);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await ProvidersService.delete(req.provider.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProvidersController();
