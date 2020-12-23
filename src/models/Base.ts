import mongoose  from 'mongoose';

abstract class Model extends mongoose.Model {
  static getById(id: mongoose.Types.ObjectId) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.findById(id);
    }
  }

  static all() {
    return this.find();
  }

  get id(): mongoose.ObjectId {
    return this._id;
  }

  static async findOrCreate(...params: any[]) {
    const instance = await this.findOne(...params);
    return instance || this.create(...params);
  }

  toString() {
    return `<${this.collection.name} ${Object.entries(this.toObject()).map(
      ([key, value]) => `${key}=${value} `,
    )}>`;
  }

  static async exists(options: object) {
    return (await this.countDocuments(options)) !== 0;
  }

  static last() {
    return this.findOne().sort({ updatedAt: -1 });
  }
}

export default Model;
