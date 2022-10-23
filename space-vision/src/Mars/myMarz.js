import GetPhoto from "../APIs/MarsData";
import {useEffect, useState} from "react";
//import { RemoveRedEye } from "@mui/icons-material";

import ChooseDate from "../Components/ChooseDate/ChooseDate";


export default function Marz(){

    const [date, setDate1] = useState(null);
    //const [date, getDate] = useState(null);

    <ChooseDate
        setDate1={setDate1}
    />
 
    const [data, setData] = useState({photos:[]});

    const fetchData = async () => {
        setData(await GetPhoto(date));
        //console.log(await GetPhoto(date));
    }

    useEffect( () => {

        fetchData().then(r => {
            console.log(r);
        });
    }, []);

    return(
        <>
            <h1>Mars</h1>
            {
                data.photos ? data.photos.map((x) => {
                    return (                       
                        <div key = {x.id}>
                            <p>id: {x.id}, earth date: {x.earth_date}, rover: {x.rover.name}, camera: {x.camera.full_name}</p>
                            <img
                            src = {x.img_src}
                            />
                            <p>---------------------------------------------------------</p>
                        </div>
                    )
                }) : <h1>Error</h1>
            }
        </>
    )
}