import CADAPICall from "../APIs/CADAPICall";
import {useEffect, useState} from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';


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

    cadData ? cadData.data.map((data) =>(
        graphData.push({V: data[7], D: data[4],N: data[0]})
    )) : console.log("loading");

    return(
        <>
            <h1>Near Earth Objects Close Approach Data</h1>
            <ScatterChart
                width={400}
                height={400}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid/>
                <XAxis type="number" dataKey="V" name="Velocity" unit=" km/s"/>
                <YAxis type="number" dataKey="D" name="Distance" unit=" au"/>
                <ZAxis type="string" dataKey="N" name="Designation" unit=""/>
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                <Legend/>
                <Scatter name="CAD" data={graphData} fill="#8884d8" shape="circle"/>
            </ScatterChart>
        </>
    )

}

export default Graphpage;