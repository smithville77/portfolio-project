import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import Image from "mui-image"
import Button from "@mui/material"
import { Link } from "react-router-dom"


import { ArrowBack, ArrowForward, CatchingPokemonTwoTone } from "@mui/icons-material"


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

 // converts name to title case
//  const titleCaseName = pokeObject.name.charAt(0).toUpperCase() + pokeObject.name.slice(1).toLowerCase();

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
      console.log(data)
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
  const backgroundColor = backgroundColors[pokeObject.types[0].type.name]
  return (
    <Container style={{height: "800px", width: "600px", textAlign: "center", marginTop: "100px", padding: 0,  borderRadius: "20px", border: "2px solid"}}>

{/* Top section, experience points, type logo */}

<Container style={{ display: "flex", height: "40px", alignItems: "center"}}>
  <div style={{ display: "flex", alignItems: "flex-end" }}>
    <p style={{ marginRight: "10px", marginBottom: "0" }}>exp:</p>
    <p style={{ marginBottom: "0" }}>{pokeObject.base_experience}</p>
  </div>

  <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <p style={{ marginRight: "10px", marginBottom: "0" }}>HP:</p>
      <p style={{ marginBottom: "0" }}>{pokeObject.stats[0].base_stat}</p>
    </div>
    
    {pokeObject.types.map((type, index) => (
      <Image 
        key={index} 
        style={{ paddingLeft: "10px", height: "20px", width: "20px" }} 
        src={require(`../images/images-SwSh/${type.type.name}_icon_SwSh.png`)}
      />
    ))}
  </div>
</Container>







    
   {/* image section */}
   <Container style={{display: "flex", height: "200px", background: `linear-gradient(to bottom, ${backgroundColor}, white)`,}}>
      
      <Container style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
        <p style={{marginBottom: "0", fontSize: "40px", color: "white", opacity: "0.6"}}><strong>#</strong>{pokeObject.id}</p>
        <h1 style={{ textAlign: "center", fontSize: "48px"}}>{pokeObject.name}</h1>
      </Container>

      <Container style={{display: "flex"}}>
        <Image style={{width: "200px"}} src={`${pokeObject.sprites.other["official-artwork"].front_default}`} />
        
      </Container>
    </Container>
    {/* height weight and abilities go here */}
    <Container style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <div style={{display: "flex", width: "300px", justifyContent: "space-between", margin: "0"}}>
        <p><strong>height: </strong>{pokeObject.height}"</p>
        <p><strong>weight: </strong>{pokeObject.weight} lbs.</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ margin: 0 }}><strong>Abilities:</strong></p>
        {pokeObject.abilities.map((ability, index) => (
          <p style={{ margin: 0, marginLeft: "10px" }}><strong>{index+1}.</strong> {ability.ability.name}</p>
        ))}
      </div>

    </Container>

{/* two moves and their type || have the pokedex description*/}
<div style={{display: "grid", gridTemplateColumns: "auto 1fr"}}>
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "10px"}}>
    <p style={{margin: 0}}>Moves:</p>
  </div>
  <Container style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
    <div style={{display: "flex", alignItems: "center"}}>
      <Image style={{paddingRight: "10px", width: "30px", height: "30px"}} src={require(`../images/images-SwSh/${pokeObject.types[0].type.name}_icon_SwSh.png`)} />
      <p style={{margin: 0, width: "200px"}}>{pokeObject.moves[0].move.name}</p>
    </div>
    <div style={{display: "flex", alignItems: "center", paddingTop: "10px"}}>
      <Image style={{paddingRight: "10px", width: "30px", height: "30px"}} src={require(`../images/images-SwSh/${pokeObject.types[0].type.name}_icon_SwSh.png`)} />
      <p style={{margin: 0, width: "200px"}}>{pokeObject.moves[10].move.name}</p>
    </div>
  </Container>
</div>




<Container style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
  <p><strong>Shiny Form:</strong>
    <Image style={{width: "180px", height: "180px", padding: "30px", objectFit: "contain"}} src={`${pokeObject.sprites.other["official-artwork"].front_shiny}`} />
  </p>
  <p><strong>Dream World Form:</strong>
    {pokeObject.sprites.other.dream_world.front_default ?
      <Image style={{width: "180px", height: "180px", padding: "30px", objectFit: "contain"}} src={`${pokeObject.sprites.other.dream_world.front_default}`} />
      :
      <p>Sorry, that image doesn't exist</p>
    }
  </p>
</Container>




    <p style={{padding: "20px"}}><strong>PokeDex Description: </strong>{pokedexEntry.flavor_text_entries[3].flavor_text}</p>
    
      <Container style={{display: "flex", justifyContent: "space-around", height: "110px", width: "90px", marginTop: "150px", alignItems: "center" }}>
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