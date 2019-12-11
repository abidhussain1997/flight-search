import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import "./style.css";
const FlightCard = props => {
  let { tripType, flights } = props;

  const OneWayCardComponent = () => {
    return (
      <div>
        <Card className="card-header-title">
          <CardContent>
            <Grid container spacing={3} className="flight-details">
              <Grid item xs={3}>
                <p>Flight Name</p>
              </Grid>
              <Grid item xs={9}>
                <Grid container>
                  <Grid item xs={6}>
                    <p>Time</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Price</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {flights.map((flight, key) => {
          return (
            <Card key={key} className="flight-cards">
              <CardContent>
                <Grid container spacing={3} className="flight-details">
                  <Grid item xs={3}>
                    <p>{flight.name}</p>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container>
                      <Grid item xs={6}>
                        <p>{flight.departureTime}</p>
                      </Grid>
                      <Grid item xs={6}>
                        <p className="final-price">
                          ₹ {flight.price.toFixed(2)}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const RoundTripComponent = () => {
    return (
      <div>
        <Card className="card-header-title">
          <CardContent>
            <Grid container spacing={3} className="flight-details">
              <Grid item xs={3}>
                <p>Name</p>
              </Grid>
              <Grid item xs={9}>
                <Grid container>
                  <Grid item xs={2}>
                    <p>From</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p>Time</p>
                  </Grid>
                  <Grid item xs={2}>
                    <p>To</p>
                  </Grid>
                  <Grid item xs={5}>
                    <p>Price</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {flights.map((flight, key) => {
          return (
            <Card key={key} className="flight-cards">
              <CardContent>
                <Grid container spacing={3} className="flight-details">
                  <Grid item xs={3}>
                    <p>{flight.flight.repartFlight.name}</p>
                  </Grid>
                  <Grid xs={9}>
                    <Grid container>
                      <Grid item xs={2}>
                        <p>{flight.flight.repartFlight.originCity} </p>
                      </Grid>
                      <Grid item xs={3}>
                        <p>{flight.flight.repartFlight.departureTime}</p>
                      </Grid>
                      <Grid item xs={2}>
                        <p>{flight.flight.repartFlight.destinationCity}</p>
                      </Grid>
                      <Grid item xs={5}>
                        <p>₹ {flight.flight.repartFlight.price.toFixed(2)}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={3} className="flight-details">
                  <Grid xs={3}>
                    <p>{flight.flight.returnFlight.name}</p>
                  </Grid>
                  <Grid xs={9}>
                    <Grid container>
                      <Grid item xs={2}>
                        <p>{flight.flight.returnFlight.originCity} </p>
                      </Grid>
                      <Grid item xs={3}>
                        <p>{flight.flight.returnFlight.departureTime}</p>
                      </Grid>
                      <Grid item xs={2}>
                        <p>{flight.flight.returnFlight.destinationCity}</p>
                      </Grid>
                      <Grid item xs={5}>
                        <p>₹ {flight.flight.returnFlight.price.toFixed(2)}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={3} className="flight-details">
                  <Grid item xs={3} />
                  <Grid item xs={9}>
                    <Grid container>
                      <Grid item xs={5}></Grid>
                      <Grid item xs={2}>
                        <p>Total</p>
                      </Grid>
                      <Grid item xs={5}>
                        <p className="final-price">
                          ₹ {flight.flight.totalPrice.toFixed(2)}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="card-wrapper">
      {tripType === "0" ? <OneWayCardComponent /> : <RoundTripComponent />}
    </div>
  );
};

export default FlightCard;
