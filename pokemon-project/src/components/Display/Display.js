import CardDisplay from "../Card/Card";
import Hero from "../Hero/Hero";
import PokeInfoPage from "../PokeInfoPage/PokeInfoPage.";
import { useEffect, useState } from "react"
import "./display.css"

import { CatchingPokemonTwoTone } from "@mui/icons-material";

import Box from '@mui/material/Box';

import Grid from '@mui/material/Unstable_Grid2';
import { Button, Container, Link } from "@mui/material";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Image from "mui-image";


function Display() {

  const [displayList, setDisplayList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [hero, setHero] = useState(null);
  // const [heroURL, setHeroURL] = useState();

  const [currentPage, setCurrentPage] = useState(1)




  // two useEffect hooks used to render the initial 20 pokemon on page load (checking if page is the first page or not)  and if not loading the next 20.
  useEffect(() => {
    if (currentPage === 1) {
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setDisplayList(data.results);
          
          const pokemonList = data.results.map((data, index) => ({
            name: data.name,
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
            // image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`,
            
          }));
          setPokemonList(pokemonList);
        });
    } else {
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage-1)*20}`;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setDisplayList(data.results);
          const pokemonList = data.results.map((data, index) => ({
            name: data.name,
            id: index + 1 + ((currentPage - 1) * 20),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1 + ((currentPage - 1) * 20)}.png`,
            // image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1 + ((currentPage - 1) * 20)}.svg`,
            
          }));
          setPokemonList(prevState => [...prevState, ...pokemonList]);
        });
    }
  }, [currentPage]);
  
//function that listens for scroll event and checked is user has scrolled to bottom of the page, if they have the state of currentPage is updated to +1 and 20 more pokemon are loaded
  function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } =  document.documentElement;
      if ( scrollTop + clientHeight >= scrollHeight - 5) {
        setCurrentPage(prevState => prevState + 1)
      }
  }
  console.log(pokemonList)
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  

  // sets hero image, not being used 
  const handleRandom = () => {
    let randomNum = Math.floor(Math.random() * 1000) + 1;
    let heroURL = `https://pokeapi.co/api/v2/pokemon/${randomNum}`
    fetch(heroURL)
      .then((res) => res.json())
      .then((data) => {setHero(data);
      console.log(data)})
  
  }
   
    

  const sortAlpha = () => {
    let pokemonIndexList = [...displayList].map((pokemon, index) => {
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
      // image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.index}.svg`
      // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.index}.png`
    }));

    setPokemonList(sortedResult);
  };

  const sortByNumber = () => {
    //sets the state back to original URL, and maps original data
      // const URL = `http://pokeapi.co/api/v2/pokemon/?limit=905`;
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
      fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setDisplayList(data.results);
        const pokemonList = data.results.map((data, index) => ({
          name: data.name,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
        }));
        setPokemonList(pokemonList);
      });
    
    }


    // sets the hero image and information, currently unused 
  // const chooseHero = (name, id) => { 
  //   setHeroURL(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    
  // };

  /// sort by dropdown --- endpoint below
  // `https://pokeapi.co/api/v2/generation/{id or name}/`
  //------------------------

  
// const [generation, setGeneration] = useState('');
//   const handleChange = (event) => {
//     setGeneration(event.target.value)
//   }
//     const URL = `https://pokeapi.co/api/v2/generation/${generation}/`;

//     useEffect(() => {
//       fetch(URL)
//       .then((res) => res.json())
//       .then((data) => {
//         setDisplayList(data);
//       });

//     })
    
    
  
//------------------
// ----------- window scroll -=--------------------

// window.onscroll = () => {

//   if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {

//   }
// }

//-------------------end window scroll-------------------------------

  return (
    <>
    {/* Sets hero image */}
     
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
      
      
        <Button onClick={sortByNumber}>Sort numerically</Button>
        <Button onClick={handleRandom}>Random Pokemon</Button>
      </Container>


      {/* <FormControl style={{width: "100px"}}>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={generation}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={1}>generation 1</MenuItem>
    <MenuItem value={2}>generation 2</MenuItem>
    <MenuItem value={3}>generation 3</MenuItem>
  </Select>
</FormControl> */}

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Grid container style={{display: "flex", textAlign: "center", justifyContent: "center"}} spacing={{ xs: 4, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {pokemonList.map((pokemon, index) => {
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
      </Box>
    </>
  )
}

export default Display
