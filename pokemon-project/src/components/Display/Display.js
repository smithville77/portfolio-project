import CardDisplay from "../Card/Card";
import Hero from "../Hero/Hero";
import { useEffect, useState } from "react"
import "./display.css"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Image from "mui-image";
import { Button, Container, TextField, Autocomplete } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";





document.title = `PokeSearch!` 
const pokemonTypes = ["normal", "fire", "water", "grass", "flying",
 "fighting", "poison", "electric", "ground", "rock", "psychic", "ice",
  "bug", "ghost", "steel", "dragon", "dark", "fairy"]


function Display() {

  
const [hero, setHero] = useState(null);
const [newDisplayList, setNewDisplayList] = useState([]);
const [displayState, setDisplayState] = useState("number");
const [page, setPage] = useState(1);
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);

document.getElementById('root').style.background = "white";

useEffect(() => {
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=641";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      
      console.log(data[0])
        const pokemonList = data.results.map((data, index) => ({
          name: data.name,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
        }));
        
        setNewDisplayList(pokemonList);
        setResults(pokemonList) 
    });
    handleRandom()
}, []);

// sets state variables back to beginning and calls original list to be displayed
const resetList = () => {
  setDisplayState("alphabet")
  setType(null)
  // setChangeVal("")
  handleNumSort()
}

const handleNumSort = () => {

  // making this change brought back functionality when changing between type ? num & alpha sort
  // if (displayState === "alphabet") {
    
    //sets the state back to original URL, and maps original data
      
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=641&offset=0`;
      fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setNewDisplayList(data.results);
        const pokemonList = data.results.map((data, index) => ({
          name: data.name,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
        }));
        setNewDisplayList(pokemonList);
        setDisplayState("number")
        console.log("num")
        setResults([])
        setPage(0)
      });
    
    // }
  
};

  // sets hero image
  const handleRandom = () => {
    let randomNum = Math.floor(Math.random() * 649) + 1;
    let heroURL = `https://pokeapi.co/api/v2/pokemon/${randomNum}`
    fetch(heroURL)
      .then((res) => res.json())
      .then((data) => {setHero(data);
      console.log(data)})
  
  }
    
  const sortAlpha = () => {
    let pokemonIndexList = newDisplayList.map((pokemon, index) => {
      return {
        ...pokemon,
        index: index + 1
      };
    });

    let sorted = pokemonIndexList.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    let sortedResult = sorted.map((data, index) => ({
      name: data.name,
      id: data.index,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.index}.png`
      
    }));
   
    setNewDisplayList(sortedResult);
     setDisplayState("alphabet")
     setResults([])
     setPage(0)
     console.log("alpha")
  };

  


const loadFunc = () => {
  if (loading) return; // return early if a request is already in progress
  setLoading(true); 
  
  if (displayState === "number" || displayState === "alphabet") {
   const newResults = newDisplayList.slice((page - 1) * 20, page * 20); 
    setResults([...results, ...newResults]);
    setPage(page + 1);
    setLoading(false); // set loading state to false after the request is complete
  } else if (displayState !== "number" || displayState !== "alphabet" ) {
    setLoading(false)
  }
  
};
//-------------------------------types----------------------
const [type, setType] = useState(null)


useEffect(() => {
let typeURL = `https://pokeapi.co/api/v2/type/${type}`;
  fetch(typeURL)
    .then(res => res.json())
    .then(data => {
      const typeList = data.pokemon.map(pokemonData => pokemonData.pokemon.name);
      const filteredPokemonList = newDisplayList.filter(pokemon => typeList.includes(pokemon.name));
      setDisplayState(type)
      setResults(filteredPokemonList);
    });
    setResults([])
    setPage(0)
}, [newDisplayList, type])



const chooseHero = (heroName) => {
  
  let heroURL = `https://pokeapi.co/api/v2/pokemon/${heroName}`
  fetch(heroURL)
    .then((res) => res.json())
    .then((data) => {setHero(data);
    console.log(data)})
}

  return (
    <>
    {hero === null ? 

    (
        <Container className="hero--container">
          <h1>PokeSearch!</h1>
          
          <Autocomplete
            className="autocomplete"
            freeSolo
            disableClearable
            onChange={(e, value) => chooseHero(value)}
            options={newDisplayList.map((pokemon) => pokemon.name)}
            
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                placeholder="Pikachu"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />

              
            )}
            
          />
        </Container>
          ) : ( 
        <Container className="hero--container">
          <h1>PokeSearch!</h1>
          <Autocomplete
            className="autocomplete"
            freeSolo
            disableClearable
            onChange={(e, value) => chooseHero(value)}
            options={newDisplayList.map((pokemon) => pokemon.name)}
            
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />

          
          <Container className="hero--image">
            <Hero 
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${hero.id}.png`}
              name={hero.species.name}
              types={hero.types}
              id={hero.id}
            />
          </Container>  
        </Container>
        
      )
    }
          
    {/* Maps over the types array and returns the symbol of the same name, each type is a button that sets the state of "type" with the value of the button when it's clicked */}
    <Container className="type--symbol--container" style={{maxWidth: "700px"}}>
        <strong>Sort by Pokemon type</strong> <br />

        {pokemonTypes.map(pokeType => {
          return <Button className="typeButton" value={pokeType} onClick={() =>setType(pokeType)}>
            <Image style={{width: "50px"}} src={require(`../images/images-SwSh/${pokeType}_icon_SwSh.png`)} />
            </Button>   
        })}
    </Container>

    {/* Buttons to sort the display results by number, alphabetically and has the option to change the hero image to a random pokemon */}
          <Container className="btn--container" style={{ display: "flex"}}>
            <Button style={{backgroundColor: "#003a70", color: "white"}} onClick={() => resetList()}>All</Button>
            <Button style={{backgroundColor: "#003a70", color: "white"}} onClick={sortAlpha}>Sort alphabetically</Button>
          
          
            <Button style={{backgroundColor: "#003a70", color: "white"}} onClick={handleNumSort}>Sort numerically</Button>
            <Button style={{backgroundColor: "#003a70", color: "white"}} onClick={handleRandom}>Random Pokemon</Button>
          </Container>

          
    {/* contains the grid displaying the current state of the results state */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>

            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={results.length < newDisplayList.length}
                loader={displayState === "number" || displayState === "alphabet" ? <div className="loader" key={0}>Loading ...</div> : <p style={{textAlign: "center"}}><strong> --- End of results ---</strong></p>}
            >

                <Grid container className="grid--container" spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {results.map((pokemon, index) => {
                    return (
                      <Grid key={index}>
                        <CardDisplay
                          id={pokemon.id}
                          name={pokemon.name}
                          image={pokemon.image}
                          index={pokemon.index}
                          clickHero={chooseHero}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
            </InfiniteScroll>
          </Box>
        </>
      )
    }

export default Display
