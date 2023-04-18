import "./PageNotFound.css"
import { CatchingPokemonTwoTone } from "@mui/icons-material"
import { Button } from "@mui/material";
import { Link } from "react-router-dom"


export default function PageNotFound() {
  console.log('Rendering PageNotFound...');
  return (
    <div className="outer--container">
      <p id="logo">PokeSearch</p>
      <h1>4 <CatchingPokemonTwoTone style={{fontSize: "120px"}} /> 4</h1>
      <img src="https://media.tenor.com/StMx6F8h5RQAAAAM/psyduck-confused.gif" alt={"pokemon-gif"} />
      <p>Ooops, that page doesn't exist.</p>
      
      <Link to={`/`} style={{textDecoration: "none"}}>
        <Button style={{backgroundColor: "#003a70", color: "white"}}>Take me home</Button>
      </Link>
      

    </div>
    
  )
}