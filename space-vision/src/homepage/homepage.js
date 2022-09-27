import logo from '../SpaceVisionLogoV1.png';
import picOfDay from '../App.js'

function Homepage(){
    return(
        <>
            <h1>Space Vision Homepage</h1>
            <img src={logo} alt="Logo"/>
            <button id = "btnClick"> See APOD </button>
            <img id="image"/>
            
        </>
    )
}

export default Homepage;