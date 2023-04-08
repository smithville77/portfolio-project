import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';



function CardDisplay(props) {
const { name, image, id, chooseHero, index } = props


      
  // function handleClick(name) {
  //   chooseHero(name)
  // }

  return (
    <Link to={`/${id}`}>
      <Card sx={{ width: 200, height: 250 }}>
        <CardActionArea>
          <CardMedia
            value={name}
            // onClick={() => handleClick(name, id)}

            component="img"
            sx={{height: 170}}
            image={`${image}`}
            alt={name}
          />
          
          


          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`#${id} `}  
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              info about {name}
              
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
)
}

export default CardDisplay