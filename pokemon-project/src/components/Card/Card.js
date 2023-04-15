import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



function CardDisplay(props) {
const { name, image, id } = props

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

const defaultBG = "white"


const [type, setType] = useState("")

const titleCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

// useEffect(() => {
//   fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//   .then(res => res.json())
//   .then(data => {
//     setType(data.types[0].type.name)
//   })
// }, [id])

const backgroundColor = backgroundColors[type]

  return (
    <Link to={`/${id}`} style={{ textDecoration: "none"}}>

      <Card sx={{ width: 200, height: 250 }}>
        {/* <CardActionArea style={{backgroundColor: backgroundColor}}> */}
        <CardActionArea style={{backgroundColor: backgroundColor}}>
          <Typography style={{position: "absolute", top: "0", right: "2px", fontSize: "40px", zIndex: "1", opacity: "0.7" }} variant="body2" color="text.secondary">
              {`#${id} `}  
              
            </Typography>
          <CardMedia
            value={name}
          
            component="img"
            sx={{height: 180, maxWidth: 170, margin: "auto", marginTop: "15px"}}
            image={`${image}`}
            alt={name}
          />
          
          <CardContent style={{position: "relative"}}>
            <Typography  gutterBottom variant="h5" component="div">
              
              {titleCaseName}
            </Typography>
            
          </CardContent>
        </CardActionArea>
      </Card>
      
    </Link>
)
}

export default CardDisplay