const mongoose = require('mongoose');

const serviceStoreShecma = new mongoose.Schema({
    nameService:{
        type:"String",
        require:"true"
    },
    priceService:{
        type:"String",
        require:"true"
    },
    imgService:{
        type:"String",
        require:"true"
    },
    descriptionService:{
        type:"String",
        require:"true"
    },
    tyoeService:{
        type:"String",
        require:"true"
    },
    quantityService:{
        type:"String",
        require:"true"
    }
})

const serviceStore = mongoose.model("serviceStore",serviceStoreShecma)
module.exports ={serviceStore}