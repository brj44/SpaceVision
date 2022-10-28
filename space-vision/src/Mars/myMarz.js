import GetPhoto from "../APIs/MarsData";
import './myMarz.css'
import {useEffect, useState} from "react";

export default function Marz(){

    const [date, setDate] = useState("");  
    const [rover, setRover] = useState("curiosity");  
    const [click, setClick] = useState(false);
    const [data, setData] = useState({photos:[]});
    const [firstCall,setFirstCall] = useState(false);

    const fetchData = async (date,rover) => {
        setClick(true)
        if (click) {
            if (date === ''){                                  
                setData(await GetPhoto(null,rover));
            } else {
                setData(await GetPhoto(date,rover));
            }
            setFirstCall(true);
        }
    }

    const getDate = (e) => {
        setDate(e.target.value);
        console.log(e.target.value)
        console.log(click)
        }

    const getRover = (e) => {
        setRover(e.target.value);
        console.log(e.target.value)
        console.log(click)
        }

    const clicked = () => {
        fetchData(date,rover).then(r => {
            console.log(r)
            console.log(date);
        });
    }

    useEffect( () => {        
        fetchData(date,rover).then(r => {
            console.log(r);
        });
    }, []);

    return(
        <>
            <h1>Mars</h1>
            {
            <div className="EnterDate">ENTER DATE: 
                <input className="TextInput" onChange={getDate} placeholder=" YYYY-MM-DD "/>
                <button className="Button" onClick={clicked}>Search</button>
            </div>
            } 

            {
            <div className="rover">
                <div className="SelectRover">Select Rover:
                    <label className='block'> <input type="radio" name="rover" value="curiosity" id="curiosity" defaultChecked onChange={getRover}   /> Curiosity <div className="Range">Range: 2012-08-06  to  today</div></label>
                    <label className='block' ><input type="radio" name="rover" value="opportunity" id="opportunity"  onChange={getRover}/> Opportunity<div className="Range">Range: 2004-01-26 to 2018-06-11</div></label>
                    <label className='block' ><input type="radio" name="rover" value="spirit" id="spirit" onChange={getRover} /> Spirit<div className="Range">Range: 2004-01-05 to 2010-03-21</div></label>
                </div>
            </div>
            
            }

            {
                firstCall&&data.photos.length==0?<p>No images found</p>:

                data.photos? data.photos.map((x) => {
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