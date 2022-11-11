import GetEvents from "../../APIs/EONET_API";
import {useEffect, useState} from "react";

function EONET(){
 
    const [eventType, setEventType] = useState("");  
    const [click, setClick] = useState(true);
    const [data, setData] = useState({events:[]});
    const [firstCall,setFirstCall] = useState(false);

    const fetchData = async (eventType) => {
        setClick(true)
        if (click) {                                 
                setData(await GetEvents(eventType));
            setFirstCall(true);
        }
    }

    const getEventType = (e) => {
        setEventType(e.target.value);
        console.log(e.target.value);
        console.log(click);
        }

    const clicked = () => {
        fetchData(eventType).then(r => {
            console.log(r)
        });
    }

    useEffect( () => {        
        fetchData(eventType).then(r => {
            console.log(r);
        });
    }, []);

    return(
        <>
            <h1>EONET</h1>
            {
            <div className="EnterDate">    
                <button className="Button" onClick={clicked}>Load</button>
            </div>
            } 

            {
            <div>
            <select value={eventType} onChange={getEventType}>
                <option value="">All Events</option>
                <option value="drought">Drought</option>
                <option value="dustHaze">DustHaze</option>
                <option value="earthquakes">Earthquakes</option>
                <option value="floods">Floods</option>
                <option value="landslides">Landslides</option>
                <option value="manmade">Manmade</option>
                <option value="seaLakeIce">SeaLakeIce</option>
                <option value="severeStorms">SevereStorms</option>
                <option value="snow">Snow</option>
                <option value="tempExtremes">TempExtremes</option>
                <option value="volcanoes">Volcanoes</option>
                <option value="waterColor">WaterColor</option>
                <option value="wildfires">Wildfires</option>
            </select>
            </div>
            
                    

            }

            {
            firstCall&&data.events.length===0?<p>No results available</p>:

            data.events? data.events.map((x) => {
                return (                     
                    <div key = {x.id}>
                        <p>id: 
                            {x.id}, 
                            title: {x.title},
                            date: {x.geometry[0].date.slice(0,10)},
                            location: {x.geometry[0].coordinates[0]},
                                      {x.geometry[0].coordinates[1]}
                            <a href={x.sources[0].url}> Learn More</a>
                        </p>
                        <p>. . . . . . . . . . . . . . . . . . . . . . .</p>
                    </div>
                )
            }) : <h1>Error</h1>
            }        
        </>
    )
}
export default EONET;