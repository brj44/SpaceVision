import GetEvents from "../../APIs/EONET_API";
import {useEffect, useState} from "react";
import "./EONET.css"
import fire from "../../images/fiyer.png"
import drought from "../../images/drouht.png";
import dust from "../../images/dust.png";
import storm from "../../images/dees.png";
import earthquake from "../../images/eq.png";
import flood from "../../images/flood.png";
import landslide from "../../images/landslide.png";
import manmade from "../../images/manmade.png";
import seaLakeIce from "../../images/seaLakeIce.png";
import snow from "../../images/snow.png";
import tempExtremes from "../../images/tempExtremes.png";
import volcanoes from "../../images/volcanoes.png";
import waterColor from "../../images/waterColor.png";


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

    const picType = (x) => {
        if (x === "severeStorms"){
            return (<img className="storm" src={storm} alt="stormPic"/>)
        }
        if (x === "wildfires"){
            return (<img className="fire" src={fire} alt="firePic"/>)
        }
        if (x === "drought"){
            return (<img className="drought" src={drought} alt="droughtPic"/>)
        }
        if (x === "dustHaze"){
            return (<img className="dust" src={dust} alt="dustHazePic"/>)
        }
        if (x === "earthquakes"){
            return (<img className="earthquake" src={earthquake} alt="EQPic"/>)
        }
        if (x === "floods"){
            return (<img className="floods" src={flood} alt="floodPic"/>)
        }
        if (x === "landslides"){
            return (<img className="landslides" src={landslide} alt="LSPic"/>)
        }
        if (x === "manmade"){
            return (<img className="manmade" src={manmade} alt="MMPic"/>)
        }
        if (x === "seaLakeIce"){
            return (<img className="seaLakeIce" src={seaLakeIce} alt="SLIPic"/>)
        }
        if (x === "snow"){
            return (<img className="snow" src={snow} alt="snowPic"/>)
        }
        if (x === "tempExtremes"){
            return (<img className="tempExtremes" src={tempExtremes} alt="tempExtremePic"/>)
        }
        if (x === "volcanoes"){
            return (<img className="volcanoes" src={volcanoes} alt="volcanoPic"/>)
        }
        if (x === "waterColor"){
            return (<img className="waterColor" src={waterColor} alt="WCPic"/>)
        }
    }

    return(
        <>
            <h1>Natural Disasters</h1>
            {
            <div className="bundle"> 
                <button className="Button" onClick={clicked}>Load</button>  
                <div className="dropdown">
                    <select className="select" value={eventType} onChange={getEventType}>
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
            </div>
            }
        
            {
            firstCall&&data.events.length===0?<p>No results available</p>:
            
            data.events? data.events.map((x) => {
                
                return (                     
                    <div className="box" key = {x.id}>
                        
                        {picType(x.categories[0].id)}
                        <div className={((x.categories[0].id).toString())+"Box"}>
                            <p className ="title">{x.title}</p>
                            <p className = "date">{x.geometry[0].date.slice(0,10)}</p>
                            <p className = "location">Coordinates: {x.geometry[0].coordinates.length===2?Math.round((x.geometry[0].coordinates[0]) * 100) / 100:Math.round(x.geometry[0].coordinates[0][0][0] * 100) / 100}           
                                                                    , {x.geometry[0].coordinates.length===2?Math.round((x.geometry[0].coordinates[1]) * 100) / 100:Math.round(x.geometry[0].coordinates[0][0][1] * 100) / 100}                                            
                                            {x.sources.length===0?
                                                console.log("no url")
                                            :<a className="link" href={x.sources[0].url}>Learn More</a>}
                            </p>
                        </div>
                        
                    </div>
                )
            }) : <h1>Error</h1>
            }        
        </>
    )
}
export default EONET;
