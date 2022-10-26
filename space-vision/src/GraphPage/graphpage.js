import CADAPICall from "../APIs/CADAPICall";
import {useEffect, useState} from "react";

function Graphpage(){
    const [cadData, setCadData] = useState({data:[]});
    const [designation, setDesignation] = useState("");

    const graphData = [];

    const fetchData = async (designation) => {
        if (designation === "") {
            setCadData(await CADAPICall());
        }else {
            setCadData(await CADAPICall(designation));
        }
    }

    useEffect( () => {
        fetchData(designation).then(r => {
            console.log(r);
        });
    }, []);

    cadData ? console.log(cadData.data[0]) : fetchData();

    return(
        <>
            <h1>Graph Page</h1>
            {
                cadData.data ? cadData.data.map((cad) => {
                    return (
                        <div key = {cad[0]}>
                            <p>Distance: {cad[4]} au</p>
                            <p>Diameter: {cad[11]} km</p>
                        </div>
                    )
                })
            }
        </>
    )

}

export default GraphPage;