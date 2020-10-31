'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema ({
    humidity: {
        type : String,
        require : true,
    },
    temperature_celcius:{
        type : String,
        require : true,
    },
    temperature_fharenheit:{
        type : String,
        require : true,
    },
    heat_index_celcius: {
        type : String,
        require : true,
    },
    heat_index_fharenheit: {
        type : String,
        require : true,
    },
    soil_humidity: {
        type : String,        
        require : true,
    },
    luminosity: {
        type : String,        
        require : true,
    },
});

const Data = mongoose.model('Data', DataSchema);
module.exports = Data;