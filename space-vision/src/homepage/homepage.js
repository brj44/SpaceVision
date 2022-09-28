import logo from '../SpaceVisionLogoV1.png';
import {useEffect, useState} from "react";
import NasaPhoto from "../APIs/NasaPhoto";

function Homepage(){
    const [photo, setPhoto] = useState([]);

    const fetchData = async () => {
        setPhoto(await NasaPhoto());
    }

    useEffect( () => {

        fetchData().then(r => {
            console.log(r);
        });
    }, []);


    return(
        <>
            <h1>Space Vision Homepage</h1>
            <img src={logo} alt="Logo"/>
            <img src = {photo.url} alt = "NASA APOD"/>
        </>
    )
}

export default Homepage;