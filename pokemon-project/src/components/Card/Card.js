import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



function CardDisplay(props) {
const { name, image, chooseHero, index } = props

      
  function handleClick(name) {
    chooseHero(name)
  }

  return (
      <Card sx={{ width: 200, height: 250 }}>
        <CardActionArea>
          <CardMedia
            value={name}
            onClick={() => handleClick(name)}
            component="img"
            sx={{height: 170}}
            image={`${image}`}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`#${index} `}  
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              info about {name}
              
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
)
}

export default CardDisplay