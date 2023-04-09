import { Container } from "@mui/material"
import Image from "mui-image"
import { Link } from "react-router-dom"


function Hero(props) {
  const { name, image, id  } = props
  
  
  return (
    <Link to={`/${id}`} style={{ textDecoration: "none"}}>
    <Container style={{ textAlign: "center", position: "absolute" }}>
      <Image style={{maxHeight: "300px", width: "300px"}} src={`${image}`} />
      <h1>{name}</h1>
      {/* Types: {types.map((type) => {
        return <p>{type.type}</p>
      })}
       */}
       
    </Container>

    </Link>
  )
}

export default Hero