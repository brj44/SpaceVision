import GetEvents from "../../APIs/EONET_API";
import {useEffect, useState} from "react";

function EONET(){

    const [data, setData] = useState({events:[]});

    const fetchData = async () => {
        setData(await GetEvents()); 
    }

    useEffect( () => {        
        fetchData().then(r => {
            console.log(r);
        });
    }, []);

    return(
        <>
            <h1>EONET</h1>
            {
            data.events.length===0?<p>Loading</p>:

            data.events? data.events.map((x) => {
                return (                     
                    <div key = {x.id}>
                        <p>id: 
                            {x.id}, 
                            title: {x.title},
                            <a href={x.sources[0].url}> Learn More</a>,
                            date: {x.geometry[0].date.slice(0,10)},
                            location: {x.geometry[0].coordinates[0]},
                                      {x.geometry[0].coordinates[1]}
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