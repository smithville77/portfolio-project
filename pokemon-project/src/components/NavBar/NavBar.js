import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: "#003a70"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Pokemon Solid', color: "#ffcb05" }}>
            PokeSearch!
          </Typography>
          <Link to="/" style={{textDecoration: "none", color: "white"}}>
            <HomeIcon sx={{fontSize: "xxl"}} />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}