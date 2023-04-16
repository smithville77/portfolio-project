import CardDisplay from "../Card/Card";
import Hero from "../Hero/Hero";
import PokeInfoPage from "../PokeInfoPage/PokeInfoPage.";
import { useEffect, useInsertionEffect, useState } from "react"
import "./display.css"

import { CatchingPokemonTwoTone } from "@mui/icons-material";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Container, TextField, Autocomplete } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";



import Image from "mui-image";

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
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=809";
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
      
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=906&offset=0`;
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
    let randomNum = Math.floor(Math.random() * 1000) + 1;
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
  setLoading(true); // set loading state to true
  
  if (displayState === "number" || displayState === "alphabet") {
   const newResults = newDisplayList.slice((page - 1) * 20, page * 20); 
    setResults([...results, ...newResults]);
    setPage(page + 1);
    setLoading(false); // set loading state to false after the request is complete
  } else if (displayState !== "number" || displayState !== "alphabet" ) {
    // const newResults = newDisplayList
    // setResults([...newResults]);
    // stop page loading if set to "type" list
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
    <Container style={{display: "flex", alignItems: "center", flexDirection: "column", paddingTop: "50px", marginBottom: "100px", height: "500px"}}>
      <h1 style={{fontFamily: 'Pokemon Solid', margin: "0", fontSize: "48px", color: "#ffcb05", textShadow: `0 0 3px #000, 0 0 5px #000`,
  outline: 'none',
  outlineOffset: '-2px',}}>PokeSearch!</h1>
      {/* <p style={{width: "50vw"}}>Search, find and get more information about your favorite pokemon! Over 1000 pokedex entries! sort by type and blah blah blah more information. 
      </p> */}
      <Autocomplete
        style={{width: "300px", justifyContent: "center", }}
        freeSolo
        id="free-solo-2-demo"
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
) : ( <Container style={{display: "flex", height: "600px", width: "50vw"}}>
      <Container style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <h2 style={{fontFamily: 'Pokemon Solid', fontSize: "36px", color: "#ffcb05", textShadow: `0 0 3px #000, 0 0 5px #000`,
  outline: 'none',
  outlineOffset: '-2px',}}>PokeSearch!</h2>
      <Autocomplete
        style={{width: "300px", justifyContent: "center", marginBottom: "20px"}}
        freeSolo
        id="free-solo-2-demo"
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

      
      
      <Container style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Hero 
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${hero.id}.png`}
                name={hero.species.name}
                types={hero.types}
                id={hero.id}
              />
      </Container>
          
    </Container>
    </Container>
  )
      }
      



  {/* loading screen or hero image is displayed */}
       


{/* Maps over the types array and returns the symbol of the same name, each type is a button that sets the state of "type" with the value of the button when it's clicked */}
<Container style={{maxWidth: "700px", marginBottom: "50px"}}>
      <strong style={{ display: "flex", justifyContent: "center", textDecoration: "underline", fontSize: "18px"}}>Sort by your favorite Pokemon type!</strong> <br />
    {pokemonTypes.map(pokeType => {
      return <Button value={pokeType} onClick={() =>setType(pokeType)}>
        <Image style={{width: "50px"}} src={require(`../images/images-SwSh/${pokeType}_icon_SwSh.png`)} />
        </Button>
        
    })}

{/* <Button onClick={() => setResults(newDisplayList)}>All</Button> */}


</Container>

{/* Buttons to sort the display results by number, alphabetically and has the option to change the hero image to a random pokemon */}
      <Container style={{display: "flex", justifyContent: "space-evenly", marginBottom: "50px"}}>
        <Button onClick={() => resetList()}>All</Button>
        <Button onClick={sortAlpha}>Sort alphabetically</Button>
      
      
        <Button onClick={handleNumSort}>Sort numerically</Button>
        <Button onClick={handleRandom}>Random Pokemon</Button>
      </Container>

      


{/* contains the grid displaying the current state of the results state */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>

        <InfiniteScroll
            pageStart={0}

            loadMore={loadFunc}
            hasMore={results.length < newDisplayList.length}
            loader={displayState === "number" || displayState === "alphabet" ? <div className="loader" key={0}>Loading ...</div> : <p style={{textAlign: "center"}}><strong> --- End of results ---</strong></p>}
        >

            <Grid container style={{display: "flex", textAlign: "center", justifyContent: "center"}} spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>

              {results.map((pokemon, index) => {
                return (
                  <Grid key={index}>
                    <CardDisplay
                      // chooseHero={(name) => chooseHero(name, pokemon.id)}
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
