import { Container, Button } from "@mui/material"
import Image from "mui-image"
import { Link } from "react-router-dom"
import "./Hero.css"


function Hero(props) {
  const { name, image, id  } = props
  let titleCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  
  return (
    
      <Container className="container">
        <Image style={{maxHeight: "270px", width: "300px"}} src={`${image}`} />
        <h1 className="title">{titleCaseName}</h1>
        <Link to={`/pokemon/${id}`} className="link">
          <Button style={{backgroundColor: "#003a70", color: "white"}} className="button">More Information</Button>
        </Link>
      </Container>
    
  )
}

export default Hero