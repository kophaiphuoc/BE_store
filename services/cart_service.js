const cartModel = require('../models/cart_model');

exports.getAll = async () => {
    return await productModel.find({}).populate('categoryId brandId');
}


exports.insert = async (cart) => {
    const p = new cartModel(cart);
    await p.save();
}

exports.update = async (id, cart) => { 
    await productModel.findByIdAndUpdate(id, cart);
}

exports.delete = async (id) => {
    await productModel.findByIdAndDelete(id);
}
