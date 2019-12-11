"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const db = require("./src/utils/dbhelper");
const flightRouter = require("./src/routers/flight")

dotenv.config();
const port = process.env.PORT || 3003;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", flightRouter);

app.listen(port, () =>
  console.log(`Listening on port ${port}!`),
);