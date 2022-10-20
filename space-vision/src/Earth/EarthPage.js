import EPICAPICall from "../APIs/EPICAPICall";
import {useEffect, useState} from "react";

function EarthPage(){

    const [photo, setPhoto] = useState([]);

    let photoUrl = "";
    let photoDate = null;
    const APIKey = process.env.REACT_APP_API_KEY;

    const fetchData = async () => {
        setPhoto(await EPICAPICall());
    }

    function getPhotoUrl() {
        photoDate = photo[0].date;
        photoDate = photoDate.replace('-', '/');
        photoDate = photoDate.replace('-', '/');
        photoDate = photoDate.split(" ");
        photoUrl = 'https://epic.gsfc.nasa.gov/archive/natural/' + photoDate[0] + '/png/' + photo[0].image + '.png?api_key=' + APIKey;
    }

    useEffect( () => {
        fetchData().then(r => {
            console.log(r);
        });

    }, []);

    photo[0]?  getPhotoUrl(): console.log("loading");

    return(
        <>
        {
            photoUrl !== "" ? <>
                <h1>Earth Information</h1>
                <img src= {photoUrl}
                     alt="test earth img"
                     width="750"
                />
                <p> {photo[0].caption} </p>
                <h2>The centroid coordinates of this image:</h2>
                <p>Latitude: {photo[0].centroid_coordinates.lat}</p>
                <p>Longitude: {photo[0].centroid_coordinates.lon}</p>
            </> : <h1>Loading...</h1>
        }
        </>

    )

}

export default EarthPage;