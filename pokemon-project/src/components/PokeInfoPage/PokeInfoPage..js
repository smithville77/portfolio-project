import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import Image from "mui-image"
import Button from "@mui/material"
import { Link } from "react-router-dom"


import { ArrowBack, ArrowForward, CatchingPokemonTwoTone } from "@mui/icons-material"




function PokeInfoPage() {
  const { id } = useParams()
  

  const pokemonID = parseInt(id)
  const nextPokemonID = pokemonID + 1
  const prevPokemonID = pokemonID - 1

  


  
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`
  const pokedexURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`
  const [pokeObject, setPokeObject] = useState([])
  const [ pokeObjectLoading, setPokeObjectLoading] = useState(true)

  const [ pokedexEntry, setPokedexEntry ] = useState([])
  const [ pokeDexEntryLoading, setDexEntryLoading] = useState(true)
// set the title of the page
document.title = `PokeSearch! -  ${pokeObject.name}` 
  
  const nextURL = `https://pokeapi.co/api/v2/pokemon/${nextPokemonID}/`
  const prevURL = `https://pokeapi.co/api/v2/pokemon/${prevPokemonID}/`
 const [ nextPokemon, setNextPokemon] = useState([])
 const [ prevPokemon, setPrevPokemon] = useState([])
 const [ nextPokemonLoading, setNextPokemonLoading ] = useState(true)
 const [ prevPokemonLoading, setPrevPokemonLoading ] = useState(true)

  useEffect(() => {
    fetch(nextURL)
    .then(res => res.json())
    .then(data => {
      setNextPokemon(data)
      setNextPokemonLoading(false)
      
    })
      
  }, [nextURL])

  useEffect(() => {
    fetch(prevURL)
    .then(res => res.json())
    .then(data => {
      setPrevPokemon(data)
      setPrevPokemonLoading(false)
    })
      
  }, [prevURL])




  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      setPokeObject(data)
      setPokeObjectLoading(false)
      
    })
      
  }, [URL])

  useEffect(() => {
    fetch(pokedexURL)
    .then(res => res.json())
    .then(data => {
      setPokedexEntry(data)
      setDexEntryLoading(false)
    })
  }, [pokedexURL])



  // set check to render loading screen if either api call hasn't loaded eyt
  if (pokeObjectLoading ||  pokeDexEntryLoading || nextPokemonLoading || prevPokemonLoading) {
    return <Container style={{paddingTop: "10%", textAlign: "center"}}>
    <CatchingPokemonTwoTone style={{fontSize: "48px"}} className={"ball"} />
    <h3>Loading...</h3>
    
  </Container>
  }

  return (
    <Container style={{textAlign: "center", padding: "30px", marginTop: "10vh"}}>
    
   
    <Container style={{display: "flex"}}>
      <Image style={{width: "400px"}} src={`${pokeObject.sprites.other["official-artwork"].front_default}`} />
      
    </Container>
    <h1 style={{ textAlign: "center"}}>{pokeObject.name}</h1>
    <p><strong>PokeDex Description: </strong>{pokedexEntry.flavor_text_entries[7].flavor_text}</p>
    


    <Container style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
  <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
    <p style={{ margin: 0 }}><strong>Type:</strong></p>
    {/* {pokeObject.types.map((type, index) => (
      <p style={{ margin: 0, marginLeft: index === 0 ? "5px" : "10px" }}>{index + 1}<br/>{type.type.name}</p>

      <Image src={`../images/images-SwSh/${type.type.name}_icon_SwSh.png`}/>
    ))} */}
    

{pokeObject.types.map((type, index) => (
  <Image style={{paddingLeft: "10px", width: "50px"}} key={index} src={require(`../images/images-SwSh/${type.type.name}_icon_SwSh.png`)} />
))}

  </div>

  <div style={{ display: "flex", alignItems: "center" }}>
    <p style={{ margin: 0 }}><strong>Ability:</strong></p>
    {pokeObject.abilities.map((ability, index) => (
      <p style={{ margin: 0, marginLeft: "10px" }}><strong>{index+1}.</strong> {ability.ability.name}</p>
    ))}
  </div>
</Container>

    
    <Container style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <p><strong>Shiny Form:</strong>
        <Image style={{width: "180px", padding: "30px"}} src={`${pokeObject.sprites.other["official-artwork"].front_shiny}`} /></p>
      <p><strong>Dream World Form: </strong>

      {pokeObject.sprites.other.dream_world.front_default ?
        <Image style={{width: "190px", padding: "40px"}} src={`${pokeObject.sprites.other.dream_world.front_default}`} />
        :
        <p>Sorry, that image doesn't exist</p>}</p>
    </Container>
    
      <Container style={{display: "flex", justifyContent: "space-around", height: "110px", width: "90px", marginTop: "100px", alignItems: "center" }}>
        <Link style={{textDecoration: "none"}} to={`/${prevPokemonID}`}>
        <Image style={{width: "120px", textDecoration: "none"}} src={`${prevPokemon.sprites.other["official-artwork"].front_default}`} />
        <h4>{prevPokemon.name} #{prevPokemon.id}</h4>
        <ArrowBack />
        </Link>
        
        <Link style={{textDecoration: "none", paddingLeft: "100px"}} to={`/${nextPokemonID}`}>
        <Image style={{width: "120px" }} src={`${nextPokemon.sprites.other["official-artwork"].front_default}`} />
        <h4>{nextPokemon.name} #{nextPokemon.id}</h4>
        <ArrowForward />
        </Link>
       
      </Container>
    </Container>
    
    
  )
}

export default PokeInfoPage