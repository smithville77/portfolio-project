import React from "react";
import { useCallback } from "react";
import {
  Box,
  Zoom,
  Fab,
  Button,
  CardMedia
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

function ScrollToTop() {
  
  const trigger = useScrollTrigger({

    threshold: 100,
  })

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
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
          color="primary"
          size="small"
          aria-label="Scroll back to top"
          
        >
         
          <KeyboardArrowUp fontSize="medium" />
        </Fab>
      </Box>
    </Zoom>
  )
}

export default ScrollToTop