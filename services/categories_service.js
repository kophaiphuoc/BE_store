const categoryModel = require('../models/categories_model');

exports.getCategories = async () =>{
    return categoryModel.find({}, 'id name');
}
