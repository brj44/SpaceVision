import GetPhoto from "../../APIs/MarsData";
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
            // eslint-disable-next-line
            if (!date.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) && date !== "")
            {
                document.getElementById("TextInput").value = "Invalid Date Format";
                setDate("Invalid Date Format");
                return;
            }
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
        }

    const getRover = (e) => {
        setRover(e.target.value);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <h1>Mars</h1>
            {
            <div className="EnterDate">ENTER DATE: 
                <input className="TextInput" id="TextInput" onChange={getDate} placeholder=" YYYY-MM-DD "/>
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
                firstCall&&data.photos.length===0?<p>No images found</p>:

                data.photos? data.photos.map((x) => {
                    return (                     
                        <div key = {x.id}>
                            <p>id: {x.id}, earth date: {x.earth_date}, rover: {x.rover.name}, camera: {x.camera.full_name}</p>
                            <img
                            src = {x.img_src}
                            alt = {x.id}
                            />
                            <p>---------------------------------------------------------</p>
                        </div>
                    
                    )
                }) : <h1>Error</h1>
            }
        
        </>
    )
}