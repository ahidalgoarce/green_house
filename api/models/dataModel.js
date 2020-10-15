'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema ({
    temperature: {
        type : Number,
        require : true,
    },
    speed_of_wind: {
        type : Number,
        require : true,
    },
    location: {
        type : String,
        require : true,
    },
    climate: {
        type : String,
        enum: ['Soleado', 'Lluvioso', 'Nublado', 'Vientos fuertes'],
        require : true,
    },
});

const Data = mongoose.model('Data', DataSchema);
module.exports = Data;