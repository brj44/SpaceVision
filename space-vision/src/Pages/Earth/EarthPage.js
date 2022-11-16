import EPICAPICall from "../../APIs/EPICAPICall";
import EarthAPICall from "../../APIs/Earth"
import {useEffect, useState} from "react";

function EarthPage(){

    const [photo, setPhoto] = useState([]);
    const [satellite, setSatellite] = useState([]);
    const [date, setDate] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");

    let photoUrl = "";
    let photoDate = null;
    const APIKey = process.env.REACT_APP_API_KEY;

    const fetchData = async () => {
        setPhoto(await EPICAPICall());
        setSatellite(await EarthAPICall(longitude, latitude, date));
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <h1> Satellite Earth Images </h1>
        <img
                        src = {satellite.url}
                        alt= "satellite"
                        width = "750"
                    />
        </>

    )

}

export default EarthPage;