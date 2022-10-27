import GetPhoto from "../APIs/MarsData";
import './myMarz.css'
import {useEffect, useState} from "react";

export default function Marz(){

    const [date, setDate] = useState("");  
    const [click, setClick] = useState(false);
    const [data, setData] = useState({photos:[]});

    const fetchData = async (date) => {
        setClick(true)
        if (click) {
            if (date === '' ) {
                setData(await GetPhoto());
            } else {
                setData(await GetPhoto(date));
            }
        }
    }

    const getDate = (e) => {
        setDate(e.target.value);
        console.log(e.target.value)
        console.log(click)
        }

    const clicked = () => {
        fetchData(date).then(r => {
            console.log(r)
            console.log(date);
        });
    }

    useEffect( () => {        
        fetchData(date).then(r => {
            console.log(r);
        });
    }, []);

    return(
        <>
            <h1>Mars</h1>
            {
            <div className="EnterDate">
                ENTER DATE: 
            <input className="TextInput" onChange={getDate} placeholder=" YYYY-MM-DD "/>
            <button className="Button" onClick={clicked}>Search</button>
            <p>(Minumim 2012-08-06)</p>
            </div>
            } 
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