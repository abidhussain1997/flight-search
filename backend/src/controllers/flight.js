"use strict";
const Flight = require("../models/flight");

const create = async (req, res) => {
  try {
    Flight.insertMany(req.body.data)
      .then(flight => {
        return res.json({
          status: 200,
          message: "New flights added",
          data: flight
        });
      })
      .catch(err => {
        return res.json({
          status: 500,
          message: "New flights failed",
          data: err
        });
      });
  } catch (error) {
    return res.json({
      status: 500,
      message: error
    });
  }
};

const getAll = async (req, res) => {
  try {
    let flight = await Flight.find();
    if (!flight) {
      return res.json({
        status: 404,
        message: "Failed fetching flights"
      });
    }
    return res.json({
      status: 200,
      message: "All Flights Fetched",
      data: flight
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: error
    });
  }
};

const getOneWay = async (req, res) => {
  let { departureDate, originCity, destinationCity } = req.body;

  try {
    let flight = await Flight.find({
      departureDate: departureDate,
      originCity: originCity,
      destinationCity: destinationCity
    }).sort("price");

    if (flight.length === 0) {
      return res.json({
        status: 200,
        message: "No Flights found",
        data: flight
      });
    } else {
      return res.json({
        status: 200,
        message: "Flights Fetched",
        data: flight,
        minPrice: flight[0].price,
        maxPrice: flight[flight.length - 1].price
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Internal Server Error",
      err: error
    });
  }
};

const getRoundTrip = async (req, res) => {
  let { departureDate, returnDate, originCity, destinationCity } = req.body;

  try {
    let departFlights = await Flight.find({
      departureDate: departureDate,
      originCity: originCity,
      destinationCity: destinationCity
    });
    let returnFlights = await Flight.find({
      departureDate: returnDate,
      originCity: destinationCity,
      destinationCity: originCity
    });

    let payload = [];

    departFlights.map(eachGoing => {
      returnFlights.map(eachReturn => {
        payload.push({
          flight: {
            repartFlight: eachGoing,
            returnFlight: eachReturn,
            totalPrice: eachGoing.price + eachReturn.price
          }
        });
      });
    });

    payload.sort((a, b) => {
      return a.flight.totalPrice - b.flight.totalPrice;
    });

    if (payload.length === 0) {
      return res.json({
        status: 200,
        message: "No Flights found",
        data: payload
      });
    } else {
      return res.json({
        status: 200,
        message: "Flights Fetched",
        data: payload,
        minPrice: payload[0].flight.totalPrice,
        maxPrice: payload[payload.length - 1].flight.totalPrice
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      data: "Internal Server Error",
      err: error
    });
  }
};

module.exports = {
  getAll,
  create,
  getOneWay,
  getRoundTrip
};
