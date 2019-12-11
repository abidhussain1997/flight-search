import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Header = (props) => {
  return(
    <AppBar style={{backgroundColor: "#f4b400"}} position="static">
    <Container>
      <Toolbar>
      <Typography variant="h5" >
        Flight Search      
      </Typography>
      </Toolbar>
    </Container>
  </AppBar>
  );
}

export default Header;