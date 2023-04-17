import { Container, Button } from "@mui/material"
import Image from "mui-image"
import { Link } from "react-router-dom"
import "./Hero.css"


function Hero(props) {
  const { name, image, id  } = props
  let titleCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  
  return (
    <Link to={`/pokemon/${id}`} className="link">
      <Container className="container">
        <Image style={{maxHeight: "250px", width: "300px"}} src={`${image}`} />
        <h1 className="title">{titleCaseName}</h1>
        <Button className="button">Click to see more</Button>
      </Container>
    </Link>
  )
}

export default Hero