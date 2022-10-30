import CADAPICall from "../../APIs/CADAPICall";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
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

    const graphData = [];
    const [selected, setSelected] = useState('');

    const handleChange = event => {
    setSelected(event.target.value);
    }

     const handleClicked = () => {
        fetchData(selected).then(r => {
            console.log(r);
        });
    }
    

    const fetchData = async (selected) => {
        if (selected === "") {
            setCadData(await CADAPICall());
        }else {
            setCadData(await CADAPICall(selected));
        }
    }

    useEffect( () => {
        fetchData(selected).then(r => {
            console.log(r);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    cadData && cadData.data ? cadData.data.map((data) =>(
        graphData.push({V: data[7], D: data[4],N: data[0]})
    )) : console.log("loading");

    return(
        <>
            <h1>Near Earth Objects Close Approach Data</h1>

            <div>
            <select value={selected} onChange={handleChange}>
                <option value="">--Choose and option--</option>
                <option value="Merc">Mercury</option>
                <option value="Venus">Venus</option>
                <option value="Earth">Earth</option>
                <option value="Mars">Mars</option>
                <option value="Juptr">Jupiter</option>
                <option value="Satrn">Saturn</option>
                <option value="Urnus">Uranus</option>
                <option value="Neptn">Neptune</option>
                <option value="Pluto">Pluto</option>
                <option value="Moon">Moon</option>
            </select>
            </div>

    <Button
                        onClick={handleClicked}
                        variant="contained"
                        style={{
                            position: "relative",
                            top: "15%",
                            textTransform: "none",
                            padding: "14px 0px",
                            maxWidth: "30%",
                            maxHeight: "70%",
                            justifyContent: "center",
                        }}
                    >
                        Load Data
                    </Button>
    
            {
                cadData && cadData.data && Number(cadData.count) === graphData.length ? <ScatterChart
                    width={600}
                    height={400}
                    margin={{
                        top: 20,
                        right: 45,
                        bottom: 20,
                        left: 45,
                    }}
                >
                    <CartesianGrid/>
                    <XAxis type="number" dataKey="V" name="Velocity" unit=" km/s"/>
                    <YAxis type="number" dataKey="D" name="Distance" unit=" au"/>
                    <ZAxis type="string" dataKey="N" name="Designation" unit=""/>
                    <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                    <Legend/>
                    <Scatter name="CAD" data={graphData} fill="#8884d8" shape="circle"/>
                </ScatterChart> : <><h1>Loading Data</h1></>
            }

        </>
    )

}

export default Graphpage;