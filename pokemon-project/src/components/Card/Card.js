import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import { useState } from 'react';

import "./card.css"



function CardDisplay(props) {
const { name, image, id, clickHero } = props

const backgroundColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
}


const [type, setType] = useState("")

const titleCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
const backgroundColor = backgroundColors[type]

  return (
    <Button onClick={() => clickHero(name)}>
      <Card className="card--container">
        <CardActionArea className="card--action" style={{backgroundColor: backgroundColor}}>

          <Typography className="card--typography" style={{fontSize: "40px"}} color="text.secondary">
              {`#${id} `}  
            </Typography>

          <CardMedia
            value={name}
            className="card--media"
            component="img"
            image={`${image}`}
            alt={`Pokemon name: ${name}`}
          />
          
          <CardContent className="card--content">
            <Typography  gutterBottom variant="h5" component="div">
              {titleCaseName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Button>

  )
}

export default CardDisplay