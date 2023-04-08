import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import Image from "mui-image"
import { CatchingPokemon } from "@mui/icons-material"
import { CatchingPokemonTwoTone } from "@mui/icons-material"
import { CatchingPokemonSharp } from "@mui/icons-material"

function PokeInfoPage() {
  const { id } = useParams()

  const pokemonID = id

  console.log(pokemonID)
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`
  const [pokeObject, setPokeObject] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      setPokeObject(data)
      setLoading(false)
      console.log(data)
    })
      
  }, [URL])

  if (loading) {
    return <p>Loading...</p>
    
  }

  return (
    <>
    <h1>{pokeObject.name}</h1>
   
    <Container style={{display: "flex"}}>
      <Image src={`${pokeObject.sprites.front_default}`} />
      <Image src={`${pokeObject.sprites.front_shiny}`} />
    </Container>
    
    
    <h3>Type: {pokeObject.types.map(type => <p>{type.type.name}</p>)}</h3>



    </>
    
  )
}

export default PokeInfoPage