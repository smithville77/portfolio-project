import { Container, Button } from "@mui/material"
import Image from "mui-image"
import { Link } from "react-router-dom"


function Hero(props) {
  const { name, image, id  } = props
  let titleCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  
  return (
    <Link to={`/pokemon/${id}`} style={{ textDecoration: "none", color: "black"}}>
    <Container style={{ textAlign: "center", paddingBottom: "40px" }}>
      <Image style={{maxHeight: "250px", width: "280px"}} src={`${image}`} />
      <h1>{titleCaseName}</h1>
       <Button style={{backgroundColor: "#003a70", color: "white"}}>Click to see more</Button>
    </Container>

    </Link>
  )
}

export default Hero