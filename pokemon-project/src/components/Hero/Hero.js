import { Container, Button } from "@mui/material"
import Image from "mui-image"
import { Link } from "react-router-dom"


function Hero(props) {
  const { name, image, id  } = props
  
  
  return (
    <Link to={`/${id}`} style={{ textDecoration: "none", color: "black"}}>
    <Container style={{ textAlign: "center" }}>
      <Image style={{maxHeight: "200px", width: "200px"}} src={`${image}`} />
      <h1>{name}</h1>
       <Button>Click to see more</Button>
    </Container>

    </Link>
  )
}

export default Hero