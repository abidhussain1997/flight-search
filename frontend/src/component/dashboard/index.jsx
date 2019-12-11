import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import Slider from "@material-ui/core/Slider";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Card from "../commons/card";
import NoData from "../../assets/no_data1.svg";
import "./style.css";
require('dotenv').config();

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: [],
      flights: [],
      tripType: "0",
      tripString: "",
      dateString: "",
      departureDate: new Date(),
      returnDate: new Date(),
      originCity: "",
      destinationCity: "",
      priceRange: [0, 1],
      minPrice: 0,
      maxPrice: 0
    };
  }

  searchTrip = () => {
    let {
      originCity,
      destinationCity,
      departureDate,
      returnDate,
      tripType
    } = this.state;

    departureDate = `${departureDate.getDate()}/${departureDate.getMonth()}/${departureDate.getFullYear()}`;
    returnDate = `${returnDate.getDate()}/${returnDate.getMonth()}/${returnDate.getFullYear()}`;

    if (tripType === "0") {
      let payload = {
        departureDate,
        originCity,
        destinationCity
      };

      fetch(process.env.REACT_APP_API + "/oneway", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(resp => {
          return resp.json();
        })
        .then(resp => {
          this.setState({
            tripString: originCity + " > " + destinationCity,
            dateString: departureDate,
            rawData: resp.data,
            flights: resp.data
          });
          if (resp.data.length !== 0) {
            this.setState({
              minPrice: Math.floor(resp.minPrice),
              maxPrice: Math.ceil(resp.maxPrice),
              priceRange: [Math.floor(resp.minPrice), Math.ceil(resp.maxPrice)]
            });
          }
        });
    } else {
      let payload = {
        departureDate,
        originCity,
        destinationCity,
        returnDate
      };

      fetch(process.env.REACT_APP_API + "/roundtrip", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(resp => {
          return resp.json();
        })
        .then(resp => {
          this.setState({
            flights: resp.data,
            rawData: resp.data,
            tripString: `${originCity} > ${destinationCity} > ${originCity}`,
            dateString: `Departure : ${departureDate} Return: ${returnDate}`
          });
          if (resp.data.length !== 0) {
            this.setState({
              minPrice: Math.floor(resp.minPrice),
              maxPrice: Math.ceil(resp.maxPrice),
              priceRange: [Math.floor(resp.minPrice), Math.ceil(resp.maxPrice)]
            });
          }
        });
    }
  };

  render() {
    const handleTripChange = event => {
      this.setState({
        flights: [],
        tripType: event.target.value
      });
    };

    const handleFromDateChange = date => {
      this.setState({ departureDate: date });
    };

    const handleToDateChange = date => {
      this.setState({ returnDate: date });
    };

    const handelFromFieldChange = event => {
      this.setState({
        originCity: event.target.value.toUpperCase()
      });
    };

    const handelToFieldChange = event => {
      this.setState({
        destinationCity: event.target.value.toUpperCase()
      });
    };

    const handleSliderChange = (event, newValue) => {
      let preProcessData = this.state.rawData;
      let filteredPayload = [];

      if (this.state.tripType === "1") {
        filteredPayload = preProcessData.filter(each => {
          if (
            each.flight.totalPrice < newValue[1] && each.flight.totalPrice > newValue[0]
          ) {
            return true;
          }
        });
      } else {
        filteredPayload = preProcessData.filter(each => {
          if (each.price < newValue[1] && each.price > newValue[0]) {
            return true;
          }
        });
      }
      this.setState({
        flights: filteredPayload,
        priceRange: newValue
      });
    };

    function valuetext(value) {
      return value;
    }

    return (
      <Container>
        <div>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <Paper className="sidebar-container">
                <p className="filter-header">Filter</p>
                <FormControl>
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup
                    value={this.state.tripType}
                    onChange={handleTripChange}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio className="rd-btn-type" />}
                      label="One way"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio className="rd-btn-type" />}
                      label="Round trip"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  id="standard-basic"
                  label="From"
                  onChange={handelFromFieldChange}
                  fullWidth
                  className="filter-textfield"
                />
                <TextField
                  id="standard-basic"
                  label="To"
                  onChange={handelToFieldChange}
                  fullWidth
                  className="filter-textfield"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disablePast
                    fullWidth
                    margin="normal"
                    label="From Date"
                    format="MM/dd/yyyy"
                    value={this.state.departureDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>

                {this.state.tripType === "1" ? (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disablePast
                      fullWidth
                      minDate={this.state.departureDate}
                      margin="normal"
                      label="Return Date"
                      format="MM/dd/yyyy"
                      value={this.state.returnDate}
                      onChange={handleToDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                ) : null}
                <p className="price-range-title">Price Range</p>
                <Slider
                  min={this.state.minPrice}
                  max={this.state.maxPrice}
                  value={this.state.priceRange}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                />
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={this.searchTrip}
                  className="search-btn"
                >
                  Search
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={9}>
              <Paper className="content-container">
                <Typography variant="h5" className="flight-title">
                  Flights
                </Typography>
                <p className="flight-search-date">{this.state.dateString}</p>
                <div className="search-flight-detail">
                  <p>{this.state.tripString}</p>
                </div>
                {this.state.flights.length === 0 ? (
                  <div className="no-data-contanier">
                    <img src={NoData} alt="no data" className="no-data-img" />
                    <p>No Flights Found</p>
                  </div>
                ) : (
                  <Card
                    tripType={this.state.tripType}
                    flights={this.state.flights}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}
