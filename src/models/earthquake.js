const mongoose = require("mongoose");

const propertiesSchema = new mongoose.Schema({
  mag: Number,
  place: String,
  time: Number,
  types: String
});

const schema = new mongoose.Schema({
  type: {
    type: String
  },
  properties: propertiesSchema,
  geometry: {
    coordinates: [Number]
  },
  id: {
    type: String
  }
});

const Model = mongoose.model("Earthquake", schema);

module.exports = Model;
