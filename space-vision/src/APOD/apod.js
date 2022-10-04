import NasaPhoto from "../APIs/NasaPhoto";
import {useEffect, useState} from "react";

function Apod(){

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
            <h1>NASA Astrological Picture Of The Day</h1>
            <img src= {photo.url}
                 alt= "Will change every day"
                 width= "750"
            />
        </>
    )

}

export default Apod;