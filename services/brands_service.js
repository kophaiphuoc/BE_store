const brandModel = require('../models/brands_model');

exports.getBrands = async () =>{
    return brandModel.find({}, 'id name');
}
