import React from 'react';
import { useEffect } from 'react';
import { coronalMassEjectionAPICall } from "./APIs/coronalMassEjectionAPICall.js"


export default function NasaPhoto(){

    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {

        fetchPhoto();

        async function fetchPhoto(){
            let APIKey = '8gM8MK39JmyKbq0S9WJyhD2pagekamrppBVDAiNM';
            let response = await fetch('https://api.nasa.gov/planetary/apod?api_key='+ APIKey);
            let apodData = await response.json();
            setPhotoData(apodData);
        }
    }, [])

    return (
        <div>
            <img src = {photoData.url}/>
        </div>
    )

}