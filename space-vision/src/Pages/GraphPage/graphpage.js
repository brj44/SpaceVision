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
import sentryAPICall from "../../APIs/sentryAPICall";
import MenuItem from "@mui/material/MenuItem";
import {Select} from "@mui/material";
import Box from "@mui/material/Box";


function Graphpage(){
    const [cadData, setCadData] = useState({data:[]});

    const graphData = [];
    const [selected, setSelected] = useState('');
    const [dataSelection, setDataSelection] = useState('CAD');
    // eslint-disable-next-line
    const [absMag, setAbsMag] = useState(-100);
    // eslint-disable-next-line
    const [palermoScale, setPalermoScale] = useState(-100);
    // eslint-disable-next-line
    const [impactProb, setImpactProb] = useState(-100);
    const [xName, setXName] = useState('Velocity');
    const [xUnit, setXUnit] = useState('km/s');
    const [yName, setYName] = useState('Distance');
    const [yUnit, setYUnit] = useState('au');
    const [zName, setZName] = useState('Designation');


    const handleChange = event => {
    setSelected(event.target.value);
    }

     const handleClicked = () => {
        fetchData(selected).then(r => {
            console.log(r);
        });
    }

    const handleDataSetChange = (event) => {
        setDataSelection(event.target.value);
        fetchData(selected, event.target.value).then(r => {
            console.log(r);
        });
        switch (event.target.value) {
            case "CAD":
                setXName('Velocity');
                setXUnit("km/s");
                setYName('Distance');
                setYUnit("au");
                setZName('Designation');
                break;
            case "Sentry":
                setXName('Diameter');
                setXUnit("km");
                setYName('Relative Velocity');
                setYUnit("km/s");
                setZName('Date');
                break;
            default:
                setXUnit("km/s");
                setYUnit("au");
        }
    }


    const fetchData = async (selected, dataSet) => {
        if(dataSet === undefined || dataSet === "CAD"){
            if (selected === "") {
                setCadData(await CADAPICall());
            } else {
                setCadData(await CADAPICall(selected));
            }
        }
        else{
            setCadData(await sentryAPICall(absMag, palermoScale, impactProb));
        }
    }

    useEffect( () => {
        fetchData(selected).then(r => {
            console.log(r);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    cadData && cadData.data && dataSelection === "CAD" ? cadData.data.map((data) =>(
        graphData.push({V: data[7], D: data[4],N: data[0]})
    )) : cadData && cadData.data && dataSelection === "Sentry" ? cadData.data.map((data) =>{
            if (graphData.length < 50) {
                graphData.push({V: data.diameter, D: data.v_inf, N: data.last_obs})
            }
            return null;
}) : console.log("loading");

    return(
        <>
            {dataSelection === 'CAD' ?
                <>
                    <h1>Near Earth Objects Close Approach Data</h1>
                    <Box
                        display= "flex"
                        sx={{
                            gap: 2,
                        }}
                    >
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
                                maxWidth: "50%",
                                maxHeight: "60%",
                                justifyContent: "center",
                            }}
                        >
                            Load Data
                        </Button>
                    </Box>
                    <div><p></p></div>
                </> : <>
                    <h1>Sentry Data</h1>
                </>

            }
            <Select
                labelId="graph-select"
                id="graph-select"
                value= {dataSelection}
                label="Data Set Selection"
                onChange={handleDataSetChange}
                className = {"input"}
            >
                <MenuItem value={"CAD"}>Close Approach Data</MenuItem>
                <MenuItem value={"Sentry"}>Sentry Data</MenuItem>
            </Select>

            {
                cadData && cadData.data && (Number(cadData.count) === graphData.length || (graphData.length === 50 && dataSelection === "Sentry"))  ? <ScatterChart
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
                    <XAxis type="number" dataKey="V" name={xName} unit={xUnit}/>
                    <YAxis type="number" dataKey="D" name={yName} unit={yUnit}/>
                    <ZAxis type="string" dataKey="N" name={zName} unit=""/>
                    <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                    <Legend/>
                    <Scatter name={dataSelection} data={graphData} fill="#8884d8" shape="circle"/>
                </ScatterChart> : cadData && (Number(cadData.count)) === 0 ? <h1> No Data </h1>:<><h1>Loading Data</h1></>
            }

        </>
    )

}

export default Graphpage;
