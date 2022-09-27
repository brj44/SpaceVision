import logo from '../SpaceVisionLogoV1.png';
import picOfDay from '../App.js'

function Homepage(){
    return(
        <>
            <h1>Space Vision Homepage</h1>
            <img src={logo} alt="Logo"/>
            {/* doesnt work to show photo
            <button id = "btnClick"> See APOD </button>
            <img id="image"/> */}
            {/*also doesnt work to show photo
            <img src = {picOfDay} alt= "Nasa APOD" /> */}
            <div> {picOfDay} </div>
            
        </>
    )
}

export default Homepage;