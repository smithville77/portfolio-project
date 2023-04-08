import CardDisplay from "../Card/Card";
import Hero from "../Hero/Hero";
import { useEffect, useState } from "react"
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Container } from "@mui/material";



function Display() {

  const [displayList, setDisplayList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [hero, setHero] = useState(null);
  const [heroURL, setHeroURL] = useState(`https://pokeapi.co/api/v2/pokemon/bulbasaur/`);

  useEffect(() => {
    const URL = `http://pokeapi.co/api/v2/pokemon/?limit=151`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setDisplayList(data.results);
        const pokemonList = data.results.map((data, index) => ({
          name: data.name,
          id: index + 1,
          image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`,
          // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
        setPokemonList(pokemonList);
      });
  }, []);

  useEffect(() => {
    fetch(heroURL)
      .then((res) => res.json())
      .then((data) => setHero(data));
  }, [heroURL]);

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
      image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.index}.svg`
      // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.index}.png`
    }));

    setPokemonList(sortedResult);
  };

  const sortByNumber = () => {
    //sets the state back to original URL, and maps original data
      const URL = `http://pokeapi.co/api/v2/pokemon/?limit=151`;
      fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setDisplayList(data.results);
        const pokemonList = data.results.map((data, index) => ({
          name: data.name,
          id: index + 1,
          image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`,
        }));
        setPokemonList(pokemonList);
      });
    
    }

  const chooseHero = (name, id) => { 
    setHeroURL(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    
  };

  return (
    <>
      <div style={{ marginBottom: "500px" }}>
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
      <Container>
        <Button onClick={sortByNumber}>Sort numerically</Button>
      </Container>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {pokemonList.map((pokemon, index) => {
            return (
              <Grid key={index}>
                <CardDisplay
                  chooseHero={(name) => chooseHero(name, pokemon.id)}
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
