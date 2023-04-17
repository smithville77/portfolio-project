import { Container, Button } from "@mui/material"
import Image from "mui-image"
import { Link } from "react-router-dom"


function Hero(props) {
  const { name, image, id  } = props
  let titleCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  
  return (
    <Link to={`/pokemon/${id}`} style={{ textDecoration: "none", color: "black"}}>
    <Container style={{ textAlign: "center" }}>
      <Image style={{maxHeight: "280px", width: "300px"}} src={`${image}`} />
      <h1>{titleCaseName}</h1>
       <Button>Click to see more</Button>
    </Container>

    </Link>
  )
}

export default Hero