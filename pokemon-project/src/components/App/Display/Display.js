import CardDisplay from "../../Card/Card"
import { useEffect, useState } from "react"
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


const URL = `http://pokeapi.co/api/v2/pokemon/?limit=151`

function Display() {

  const [ displayList, setDisplayList ] = useState([])

  useEffect(() => {
    fetch(URL)
    .then((res) => res.json())
    .then((data) => setDisplayList(data.results))
    

  }, [])

const pokemonList = displayList.map((data, index) => ({
      name: data.name,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
      1}.png`,
    }))

  console.log(displayList)
  console.log(pokemonList)

  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 4, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
           {pokemonList.map((pokemon) => {
         return <Grid >
         <CardDisplay  
            name={pokemon.name}
            image={pokemon.image}
          />
         </Grid>
       })}
          
      </Grid>
    </Box>
      
    </>
    
  )
}

export default Display