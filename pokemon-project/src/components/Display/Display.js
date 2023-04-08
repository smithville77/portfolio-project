import CardDisplay from "../Card/Card";
import Hero from "../Hero/Hero";
import { useEffect, useState } from "react"
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Container } from "@mui/material";


const URL = `http://pokeapi.co/api/v2/pokemon/?limit=151`

function Display() {

  const [ displayList, setDisplayList ] = useState([])

  useEffect(() => {
    fetch(URL)
    .then((res) => res.json())
    .then((data) => setDisplayList(data.results))
    

  }, [])

 

  const sortAlpha = () => {

    let pokemonIndexList = pokemonList.map((pokemon, index) => {
      return {
        ...pokemon,
        index: index
      }
    })

    let sorted = pokemonIndexList.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      }
      return 0
    })

    let sortedResult = sorted.map((data) => ({
      name: data.name,
      id: data.index + 1,
      index: data.index,
      image: `https://pokeapi.co/api/v2/pokemon/${data.name}/`})
    )
  
    
   return setDisplayList(sortedResult)

  
  }

 



const pokemonList = displayList.map((data, index) => ({
      name: data.name,
      id: index + 1,
      index: index + 1,
      // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.index + 1}.png`,
      image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index}.svg`

    }))

  // console.log(displayList)
  // console.log(pokemonList)


 // set hero areo -----------------------
 const [ hero, setHero ] = useState(null)
 // const heroURL = `https://pokeapi.co/api/v2/pokemon/${displayList}/`
 
 
const [ heroURL, setHeroURL ] = useState(`https://pokeapi.co/api/v2/pokemon/bulbasaur/`)

 useEffect(() => {
   fetch(heroURL)
   .then((res) => res.json())
   .then((data) => setHero(data))
 }, [heroURL])
 
 
 

 
 // ------------------------------------------
 
    const chooseHero = (name) => { 
      
      console.log(name)
      setHeroURL(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      
    }


  return (
    <>
    <div style={{marginBottom: "500px"}}>
    {hero === null ? (
      <div>Loading...</div>
    ) : (
      <Hero 
      image={hero.sprites.front_shiny}
      name={hero.species.name}
      types={hero.types}
    />
    )}
  </div>

   

    <Container>
      <Button onClick={sortAlpha}>Sort alphabetically</Button>
    </Container>

     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 4, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
           {pokemonList.map((pokemon) => {
         return <Grid >
         <CardDisplay  
            chooseHero={(e) => chooseHero(e)}
            id={pokemon.id}
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