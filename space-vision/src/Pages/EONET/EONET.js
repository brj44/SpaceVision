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
            <div className="EventType">
                <div className="Events">
                    <label className='block'> <input type="radio" name="Event" value="" id="1" defaultChecked onChange={getEventType}   /> All events </label>
                    <label className='block' ><input type="radio" name="Event" value="drought" id="2"  onChange={getEventType}/> Drought</label>
                    <label className='block' ><input type="radio" name="Event" value="dustHaze" id="3" onChange={getEventType} /> DustHaze</label>
                    <label className='block' ><input type="radio" name="Event" value="earthquakes" id="4" onChange={getEventType} /> Earthquakes</label>
                    <label className='block' ><input type="radio" name="Event" value="floods" id="5" onChange={getEventType} /> Floods</label>
                    <label className='block' ><input type="radio" name="Event" value="landslides" id="6" onChange={getEventType} /> Landslides</label>
                    <label className='block' ><input type="radio" name="Event" value="manmade" id="7" onChange={getEventType} /> Manmade</label>
                    <label className='block' ><input type="radio" name="Event" value="seaLakeIce" id="8" onChange={getEventType} /> SeaLakeIce</label>
                    <label className='block' ><input type="radio" name="Event" value="severeStorms" id="9" onChange={getEventType} /> SevereStorms</label>
                    <label className='block' ><input type="radio" name="Event" value="snow" id="10" onChange={getEventType} /> Snow</label>
                    <label className='block' ><input type="radio" name="Event" value="tempExtremes" id="11" onChange={getEventType} /> TempExtremes</label>             
                    <label className='block' ><input type="radio" name="Event" value="volcanoes" id="12" onChange={getEventType} /> Volcanoes</label>             
                    <label className='block' ><input type="radio" name="Event" value="waterColor" id="13" onChange={getEventType} /> WaterColor</label>             
                    <label className='block' ><input type="radio" name="Event" value="wildfires" id="14" onChange={getEventType} /> Wildfires</label>             
                </div>
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