import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



function CardDisplay(props) {
const { name } = props

  return (
<Card sx={{ width: 150, height: 150 }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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