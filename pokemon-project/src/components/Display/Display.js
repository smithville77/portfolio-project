import CardDisplay from "../Card/Card";
import Hero from "../Hero/Hero";
import PokeInfoPage from "../PokeInfoPage/PokeInfoPage.";
import { useEffect, useInsertionEffect, useState } from "react"
import "./display.css"

import { CatchingPokemonTwoTone } from "@mui/icons-material";

import Box from '@mui/material/Box';

import Grid from '@mui/material/Unstable_Grid2';
import { Button, Container, Link } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Image from "mui-image";




function Display() {

  
  const [hero, setHero] = useState(null);


  // ----------------------------------------------- refactor list 

//   const getFireTypes = () => {
//     let typeURL = `https://pokeapi.co/api/v2/type/fire/`
//     fetch(typeURL)
//     .then(res => res.json())
//     .then(data => {

//       const pokemonList = data.pokemon.map((data, index) => ({
//         name: data.name,
//         // id: index + 1,
//         image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.name}.png`,
//       }));

//       setNewDisplayList(pokemonList);
    
//   });
// };
   
  
  
  //-------------------------
  
//   
//------
const [newDisplayList, setNewDisplayList] = useState([]);

const [displayState, setDisplayState] = useState("number");
const [page, setPage] = useState(1);
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=1000";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      
      console.log(data.results[0])
        const pokemonList = data.results.map((data, index) => ({
          name: data.name,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
        }));

        setNewDisplayList(pokemonList);
      
    });
}, []);

const handleNumSort = () => {
  if (displayState === "alphabet") {
    
    //sets the state back to original URL, and maps original data
      
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`;
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
        setResults([])
        setPage(0)
      });
    
    
  }
};

  //-------------------------------------------------------end refactor -------------------

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
  const newResults = newDisplayList.slice((page - 1) * 20, page * 20);
  setResults([...results, ...newResults]);
  setPage(page + 1);
  setLoading(false); // set loading state to false after the request is complete
};
//-------------------------------types----------------------
const [type, setType] = useState(null)


const getTypes = (e) => {
  setType(e.target.value);
  console.log("selected type:", type);
}


useEffect(() => {
let typeURL = `https://pokeapi.co/api/v2/type/${type}`;
  fetch(typeURL)
    .then(res => res.json())
    .then(data => {
      const fireTypeList = data.pokemon.map(pokemonData => pokemonData.pokemon.name);

      const filteredPokemonList = newDisplayList.filter(pokemon => fireTypeList.includes(pokemon.name));

      console.log(filteredPokemonList);
      setResults(filteredPokemonList);
    });
})




  const pokemonTypes = ["normal", "fire", "water", "grass", "flying", "fighting", "poison", "electric", "ground", "rock", "psychic", "ice", "bug", 
  "ghost", "steel", "dragon", "dark", "fairy"]

 
//------------------------------end types-------------------------------
  return (
    <>


    {pokemonTypes.map(pokeType => {
     return <Button value={pokeType} onClick={getTypes}>
    <Image style={{width: "50px"}} src={require(`../images/images-SwSh/${pokeType}_icon_SwSh.png`)} />
    </Button>
    
})}
     
    
      <div style={{ height: "400px" }}>
        {hero === null ? (
          <Container style={{paddingTop: "10%", textAlign: "center"}}>
            <CatchingPokemonTwoTone style={{fontSize: "48px"}} className={"ball"} />
            
            <h3>Loading...</h3>
            
          </Container>
        ) : (
          <Hero 
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${hero.id}.png`}
            name={hero.species.name}
            types={hero.types}
            id={hero.id}
          />
        )}
      </div>

      

      <Container style={{display: "flex", justifyContent: "space-evenly", marginBottom: "50px"}}>
        <Button onClick={sortAlpha}>Sort alphabetically</Button>
      
      
        <Button onClick={handleNumSort}>Sort numerically</Button>
        <Button onClick={handleRandom}>Random Pokemon</Button>
      </Container>




      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>

<InfiniteScroll
    pageStart={0}

    loadMore={loadFunc}
    hasMore={results.length < newDisplayList.length}
    loader={<div className="loader" key={0}>Loading ...</div>}
>

        <Grid container style={{display: "flex", textAlign: "center", justifyContent: "center"}} spacing={{ xs: 4, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          {results.map((pokemon, index) => {
            return (
              <Grid key={index}>
                <CardDisplay
                  // chooseHero={(name) => chooseHero(name, pokemon.id)}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  index={pokemon.index}
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
