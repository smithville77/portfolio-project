import React from "react";
import { useCallback } from "react";
import {
  Box,
  Zoom,
  Fab,
  Button,
  CardMedia,
} from "@mui/material";
import { CatchingPokemonTwoTone } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

function ScrollToTop() {
  
  const trigger = useScrollTrigger({

    threshold: 100,
  })

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <>
    <Zoom in={trigger}>
      <Box
        role="presentation"
        
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1,
        }}
      >
        <Fab
          onClick={scrollToTop}
          color="error"
          size="small"
          aria-label="Scroll back to top"
          
        >
         
          
          <CatchingPokemonTwoTone fontSize="large" />
         
        </Fab>
        <p style={{ color: "black", fontWeight: "500", textAlign: "center", margin: 0, textShadow: " 0.5px 0.5px #000000"}}>top</p>
      </Box> 
      
    </Zoom>
     
    </>
  )
}

export default ScrollToTop