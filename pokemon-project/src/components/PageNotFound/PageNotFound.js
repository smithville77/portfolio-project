import "./PageNotFound.css"
import { CatchingPokemonTwoTone } from "@mui/icons-material"
import { Button } from "@mui/material";
import { Link } from "react-router-dom"

document.getElementById('root').style.background = "#0075BE";
export default function PageNotFound() {
  console.log('Rendering PageNotFound...');
  return (
    <div className="outer--container">
      <p id="logo">PokeSearch</p>
      <h1>4 <img id="pokeball" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8D9Y4JGz2JNkEgikrK7OTHOWzg8Qjd3m8lQ&usqp=CAU" alt="pokeball" /> 4</h1>
      <p>Uh oh, looks like that page doesn't exist.</p>
      <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50pk1_cgc8L1eqA2x62CBvZb0TLPjoFV40A&usqp=CAU" alt={"pokemon-gif"} />
      
      
      <Link to={`/`} style={{textDecoration: "none"}}>
        <Button style={{backgroundColor: "#003a70", color: "white", borderRadius: "10px", margin: "40px"}}>Take me home</Button>
      </Link>
      

    </div>
    
  )
}