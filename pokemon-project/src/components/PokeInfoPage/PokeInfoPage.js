import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import { ArrowBack, ArrowForward, CatchingPokemonTwoTone } from "@mui/icons-material"
import Image from "mui-image"
import { Link } from "react-router-dom"
import "./PokeInfoPage.css"

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
  document.getElementById('root').style.background = `linear-gradient(${backgroundColor}, white)`;
  const titleCaseName = pokeObject.name.charAt(0).toUpperCase() + pokeObject.name.slice(1).toLowerCase();

  return (
    <div className="main">
    <div className="main--container">

{/* Top section, experience points, type logo */}
 
   {/* image section */}
   <div className="image--container" style={{ background: `linear-gradient(to bottom, ${backgroundColor}, white)`}}>
      
      <div className="name--number" >
        <p className="hero--id"><strong>#</strong>{pokeObject.id}</p>
        <h1>{titleCaseName}</h1>
      </div>

      <div className="hero--image">
        <Image style={{width: "250px", maxHeight: "250px"}} src={`${pokeObject.sprites.other["official-artwork"].front_default}`} />
      </div>

    </div>

    {/* height weight and abilities go here */}
    <Container style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white"}}>

      <div className="height-weight-div">
        <p><strong>Height: </strong>{pokeObject.height}"</p>
        <p><strong>Weight: </strong>{pokeObject.weight} lbs.</p>
      </div>

      <div className="ability--div">
        <p><strong>Abilities:</strong></p>
        {pokeObject.abilities.map((ability, index) => (
          <p><strong>{index+1}.</strong> {ability.ability.name}</p>
        ))}
      </div> 


      <Container className="exp--hp--container" style={{ display: "flex"}}>

        <div className="exp--section">
          <p><strong>exp:</strong></p>
          <p>{pokeObject.base_experience}</p>
        </div>

        <div className="hp--section" >
          <div >
            <p><strong>HP:</strong></p>
            <p>{pokeObject.stats[0].base_stat}</p>
        </div>

        <div>
          <p><strong>Type:</strong></p>
        {pokeObject.types.map((type, index) => (
          <Image 
            key={index} 
            style={{ height: "20px", width: "20px" }} 
            src={require(`../images/images-SwSh/${type.type.name}_icon_SwSh.png`)}
          />
        ))}
        </div>

      </div>
</Container>

{/* orange line break  */}
    <hr id="break" style={{backgroundColor: `${backgroundColor}`}} />

    </Container>

{/* two moves and their type || have the pokedex description*/}
    <div style={{display: "grid", gridTemplateColumns: "auto 1fr", backgroundColor: "white"}}>
      <div id="moves">
        <p style={{margin: 0}}>Moves:</p>
      </div>

  <Container className="moves--container">

    <div className="image--moves" >
      <Image style={{paddingRight: "10px", width: "30px", height: "30px"}} src={require(`../images/images-SwSh/${pokeObject.types[0].type.name}_icon_SwSh.png`)} />
      <p>{pokeObject.moves[0].move.name}</p>
    </div>

    <div className="image--moves">
      <Image style={{paddingRight: "10px", width: "30px", height: "30px"}} src={require(`../images/images-SwSh/${pokeObject.types[0].type.name}_icon_SwSh.png`)} />
      <p>{pokeObject.moves[1].move.name}</p>
    </div>
   
  </Container>

</div>




{/* Image forms  section */}
<Container className="image--forms--sect" style={{display: "flex"}}>
  
    <p><strong>Shiny Form:</strong>
      <Image style={{width: "150px", height: "150px", padding: "30px", objectFit: "contain"}} src={`${pokeObject.sprites.other["official-artwork"].front_shiny}`} />
    </p>


    <p><strong>Dream World Form:</strong>
      {pokeObject.sprites.other.dream_world.front_default ?
        <Image style={{width: "150px", height: "150px", padding: "30px", objectFit: "contain"}} src={`${pokeObject.sprites.other.dream_world.front_default}`} />
        :
        <p>Sorry, that image doesn't exist</p>
      }
    </p>
  
</Container>


{/* Pokedex description section */}

    <div className="pokedex--desc">
      <p><strong>PokeDex Description: </strong>{pokedexEntry.flavor_text_entries[3].flavor_text}</p>
    </div>
    
</div>
    
{/* next and previous pokemon section */}

     <Container className="next-prev-sect" style={{display: "flex", justifyContent: "space-evenly", marginBottom: "100px"}}>
      <div>
          <Link style={{textDecoration: "none"}} to={`/pokemon/${prevPokemonID}`}>
              <Image style={{width: "120px", textDecoration: "none"}} src={`${prevPokemon.sprites.other["official-artwork"].front_default}`} />
              <h4>{prevPokemon.name} #{prevPokemon.id}</h4>
              <ArrowBack />
          </Link>
        </div>  

        <div>
          <Link style={{textDecoration: "none" }} to={`/pokemon/${nextPokemonID}`}>
              <Image style={{width: "120px" }} src={`${nextPokemon.sprites.other["official-artwork"].front_default}`} />
              <h4>{nextPokemon.name} #{nextPokemon.id}</h4>
              <ArrowForward style={{marginLeft: "60px"}} />
          </Link>
       </div> 
    </Container>
  </div>
  )
}

export default PokeInfoPage