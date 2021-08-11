const ProductsModel = require('../models/products_model');
const InvalidFieldError = require('../errors/invalid_field_error');

class ProductsService {
  async listByProvider(idProvider) {
    return await ProductsModel.findAll({
      where: {
        provider: idProvider,
      },
    });
  }

  async getById(idProvider, idProduct) {
    return await ProductsModel.findOne({
      where: {
        id: idProduct,
        provider: idProvider,
      },
    });
  }

  async save(idProvider, product) {
    if (this.validate(product)) {
      return await ProductsModel.create({ ...product, provider: idProvider });
    }
  }

  async update(idProvider, idProduct, product) {
    if (this.validate(product)) {
      return await ProductsModel.update(product, {
        where: {
          id: idProduct,
          provider: idProvider,
        },
      });
    }
  }

  async delete(idProvider, idProduct) {
    return await ProductsModel.destroy({
      where: {
        id: idProduct,
        provider: idProvider,
      },
    });
  }

  async decreaseStock(product, value) {
    const stock = product.stock - value;
    await ProductsModel.update(
      { stock: stock },
      {
        where: {
          id: product.id,
          provider: product.provider.id,
        },
      }
    );
  }

  async increaseStock(product, value) {
    const stock = product.stock + value;
    await ProductsModel.update(
      { stock: stock },
      {
        where: {
          id: product.id,
          provider: product.provider.id,
        },
      }
    );
  }

  validate(product) {
    if (typeof product.name !== 'string' || product.name.length === 0) {
      throw new InvalidFieldError('name', product.name);
    }
    if (typeof product.price !== 'number' || product.price <= 0) {
      throw new InvalidFieldError('price', product.price);
    }
    if (typeof product.stock !== 'number') {
      throw new InvalidFieldError('stock', product.stock);
    }
    if (typeof product.provider !== 'number' || product.provider < 0) {
      throw new InvalidFieldError('provider', product.provider);
    }
    return true;
  }
}

module.exports = new ProductsService();
