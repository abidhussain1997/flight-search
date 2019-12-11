const express = require("express");
const router = express.Router();
const Flights = require("../controllers/flight")

router.get("/", Flights.getAll);
router.post("/oneway", Flights.getOneWay);
router.post("/", Flights.create);
router.post("/roundtrip", Flights.getRoundTrip);
module.exports = router;