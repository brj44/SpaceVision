import fireballAPICall from "../APIs/fireballAPICall";
import {useEffect, useState} from "react";

function FireballPage(){
    const [fireballData, setFireballData] = useState([]);

    const fetchData = async () => {
        setFireballData(await fireballAPICall());
    }

    useEffect( () => {
        fetchData().then(r => {
            console.log(r);
        });
    }, []);

    fireballData ? console.log(fireballData.data[0]) : fetchData();

    return(
        <>
            <h1>Fireball Data</h1>
            {
                fireballData.data ? fireballData.data.map((fireball) => {
                    return (
                        <>
                            <p>Date and Time: {fireball[0]}</p>
                            <p>Velocity: {fireball[8]} km/s</p>
                            <p>Altitude: {fireball[7]}</p>
                            <p>Latitude: {fireball[3]}</p>
                            <p>Longitude: {fireball[5]}</p>
                            <p>Energy: {fireball[1]}</p>
                        </>
                    )
                }) : <h1>Loading...</h1>
            }

        </>
    )

}

export default FireballPage;