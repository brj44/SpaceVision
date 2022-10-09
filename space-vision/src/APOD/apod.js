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
                <h1>NASA Astronomy Picture Of The Day</h1>
                <h2> {photo.title} </h2>
                {photo.media_type === "video" ?
                    <iframe
                        title = {photo.title}
                        width = "60%"
                        src = {photo.url}
                    />
                    :
                    <img
                        src = {photo.url}
                        alt= "NASA APOD"
                        width = "750"
                    />
                }

                <p> {photo.explanation} </p>
            </>
    )

}

export default Apod;