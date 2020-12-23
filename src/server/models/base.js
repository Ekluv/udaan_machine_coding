const mongoose = require('mongoose');

class Model {
  static getById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.findById(id);
    }
  }

  static all() {
    return this.find();
  }

  get id() {
    return this._id;
  }

  static async findOrCreate(...params) {
    const instance = await this.findOne(...params);
    return instance || this.create(...params);
  }

  toString() {
    return `<${this.collection.name} ${Object.entries(this.toObject()).map(
      ([key, value]) => `${key}=${value} `,
    )}>`;
  }

  static async exists(options) {
    return (await this.countDocuments(options)) !== 0;
  }

  static last() {
    return this.findOne().sort({ updatedAt: -1 });
  }
}

module.exports = Model;
