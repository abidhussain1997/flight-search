const mongoose = require("mongoose");

const schema = {
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originCity: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    require: true
  }
};

const options = {
  autoCreate: true,
};

const flightSchema = new mongoose.Schema(schema, options);

module.exports = mongoose.model("flight", flightSchema);