import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: "#3d7dca"}}>
        <Toolbar>
          {/* Adds hamburger menu, will most likely not use */}
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Pokemon Solid', color: "#ffcb05" }}>
            PokeSearch!
          </Typography>
          <Link to="/" style={{textDecoration: "none", color: "white"}}>
            <HomeIcon sx={{fontSize: "xxl"}} />
          </Link>
          {/* <Link to="/about">
            <Button color="inherit">About</Button>
          </Link>
          <Link to="/contact">
            <Button color="inherit">Contact</Button>
          </Link> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}