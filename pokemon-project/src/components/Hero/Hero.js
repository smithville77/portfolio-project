import { Container } from "@mui/material"
import Image from "mui-image"


function Hero(props) {
  const { name, image  } = props
  
  
  return (
    <Container style={{ textAlign: "center", position: "absolute" }}>
      <Image style={{maxHeight: "300px", width: "300px"}} src={`${image}`} />
      <h1>{name}</h1>
      {/* Types: {types.map((type) => {
        return <p>{type.type}</p>
      })}
       */}
    </Container>
  )
}

export default Hero