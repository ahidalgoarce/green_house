const createError = require('http-errors');
const mongoose = require('mongoose');

const Data = require('../models/dataModel');

module.exports = {

    getAllData: async (req, res, next) => {
        try {
            const results = await Data.find({}, { __v: 0 });
            res.send(results);
          } catch (error) {
            console.log(error.message);
          }
    },

    createNewData: async (req, res, next) => {
        try {
            const data = new Data(req.body);
            const result = await data.save();
            res.send(result);
          } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
              next(createError(422, error.message));
              return;
            }
            next(error);
          }
    },

    findDataById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const data = await Data.findById(id);
        if (!data) {
            throw createError(404, 'Data does not exist.');
        }
        res.send(data);
        } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Data id'));
            return;
        }
        next(error);
        }
    },

    updateData: async (req, res, next) => {
        try {
          const id = req.params.id;
          const updates = req.body;
          const options = { new: true };
    
          const result = await Data.findByIdAndUpdate(id, updates, options);
          if (!result) {
            throw createError(404, 'Data does not exist');
          }
          res.send(result);
        } catch (error) {
          console.log(error.message);
          if (error instanceof mongoose.CastError) {
            return next(createError(400, 'Invalid data Id'));
          }
    
          next(error);
        }
      },

      deleteData: async (req, res, next) => {
        const id = req.params.id;
        try {
          const result = await Data.findByIdAndDelete(id);
          if (!result) {
            throw createError(404, 'Data does not exist.');
          }
          res.send(result);
        } catch (error) {
          console.log(error.message);
          if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid data id'));
            return;
          }
          next(error);
        }
      }
};