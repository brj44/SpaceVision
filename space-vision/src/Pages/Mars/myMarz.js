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
            <h1>Mars Rover Photos</h1>
            {
            <div className="selectionzBox">
                ENTER DATE: 
                <input className="TextInput" id="TextInput" onChange={getDate} placeholder=" YYYY-MM-DD "/>
                <button className="MarsButton" onClick={clicked}>Search</button>
                <div className="SelectRover">Select Rover:
                    <label className='block'> <input type="radio" name="rover" value="curiosity" id="curiosity" defaultChecked onChange={getRover}   /> Curiosity <div className="Range">Range: 2012-08-06  to  today</div></label>
                    <label className='block' ><input type="radio" name="rover" value="opportunity" id="opportunity"  onChange={getRover}/> Opportunity<div className="Range">Range: 2004-01-26 to 2018-06-11</div></label>
                    <label className='block' ><input type="radio" name="rover" value="spirit" id="spirit" onChange={getRover} /> Spirit<div className="Range">Range: 2004-01-05 to 2010-03-21</div></label>
                </div>
            </div>
            
            }
            <div className="grid">
            {
                
                firstCall&&data.photos.length===0?<p>No images found</p>:

                data.photos? data.photos.map((x) => {
                    return (                     
                        <div className="Zcontainer" key = {x.id}>
                            <p className="cameraLine">{x.camera.full_name}</p>
                            <p className="dateLine">Date: {x.earth_date}</p>
                            <p className="roverLine">Rover: {x.rover.name}</p>
                                <img className="pics"
                                    src = {x.img_src}
                                    alt = {x.id}
                                />
                            <p className="id">id: {x.id}</p>
                           
                        </div>
                    
                    )
                }) : <h1>Error</h1>
            
            }
        </div>
        </>
    )
}

