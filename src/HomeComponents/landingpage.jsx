
import { Container } from "@mui/material"
import Header from './Header'
import DairyPreferenceForm from "./DairyPreferenceForm"
import "../App.css"
function LandingPage(){
    return(
       <Container>
         <Header />
         <DairyPreferenceForm/>
       </Container>
    )
}

export default LandingPage