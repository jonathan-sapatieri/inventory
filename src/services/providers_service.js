const ProvidersModel = require('../models/providers_model');
const InvalidFieldError = require('../errors/invalid_field_error');

class ProvidersService {
  async list() {
    return await ProvidersModel.findAll();
  }

  async getById(id) {
    return await ProvidersModel.findByPk(id);
  }

  async save(provider) {
    if (this.validate(provider)) {
      return await ProvidersModel.create(provider);
    }
  }

  async update(id, provider) {
    if (this.validate(provider)) {
      return await ProvidersModel.update(provider, {
        where: {
          id: id,
        },
      });
    }
  }

  async delete(id) {
    return await ProvidersModel.destroy({
      where: {
        id: id,
      },
    });
  }

  validate(provider) {
    const requiredFields = ['company', 'email', 'category'];

    requiredFields.forEach((field) => {
      const value = provider[field];
      if (typeof value !== 'string' || value.length === 0) {
        throw new InvalidFieldError(field, provider[field]);
      }
    });
    return true;
  }
}

module.exports = new ProvidersService();
