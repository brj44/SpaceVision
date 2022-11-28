import fireballAPICall from "../../APIs/fireballAPICall";
import {useEffect, useState} from "react";
import {InputAdornment, Select, TextField} from "@mui/material";
import './FireballPage.css';
import Box from "@mui/material/Box";
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
    LineChart,
    Line, ResponsiveContainer
} from 'recharts';
import MenuItem from "@mui/material/MenuItem";


function FireballPage(){
    const [fireballData, setFireballData] = useState({data:[]});
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [xAxis, setXAxis] = useState("Energy");
    const [yAxis, setYAxis] = useState("Velocity");
    const [xUnit, setXUnit] = useState("kJ");
    const [yUnit, setYUnit] = useState("km/s");
    const [VData, setVData] = useState(8);
    const [EData, setEData] = useState(1);
    const [graphType, setGraphType] = useState("Scatter");
    const graphData = [];

    const handleMinDateChange = (event) => {
        setMinDate(event.target.value);
    }
    const handleMaxDateChange = (event) => {
        setMaxDate(event.target.value);
    }
    const handleClicked = () => {
        fetchData(minDate, maxDate).then(r => {
            console.log(r);
        });
        setMinDate("");
        setMaxDate("");
    }

    const handleXAxisChange = (event) => {
        setXAxis(event.target.value);
        switch (event.target.value) {
            case "Energy":
                setXUnit("kJ");
                setVData(1);
                break;
            case "Velocity":
                setXUnit("km/s");
                setVData(8);
                break;
            case "Altitude":
                setXUnit("km");
                setVData(7);
                break;
            case "Impact Energy":
                setXUnit("kJ");
                setVData(2);
                break;
            default:
                setXUnit("kJ");
                setVData(1);
        }
    }

    const handleYAxisChange = (event) => {
        setYAxis(event.target.value);
        switch (event.target.value) {
            case "Energy":
                setYUnit("kJ");
                setEData(1);
                break;
            case "Velocity":
                setYUnit("km/s");
                setEData(8);
                break;
            case "Altitude":
                setYUnit("km");
                setEData(7);
                break;
            case "Impact Energy":
                setYUnit("kJ");
                setEData(2);
                break;
            default:
                setYUnit("km/s");
                setEData(8);
        }
    }

    const handleGraphChange = (event) => {
        setGraphType(event.target.value);
    }

    const fetchData = async (minDate, maxDate) => {
        if (minDate === "") {
            setFireballData(await fireballAPICall());
        } else if (minDate !== "" && maxDate === "") {
            setFireballData(await fireballAPICall(minDate));
        } else {
            setFireballData(await fireballAPICall(minDate, maxDate));
        }
    }

    useEffect( () => {
        fetchData(minDate, maxDate).then(r => {
            console.log(r);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    fireballData && fireballData.data ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[VData], E: fireball[EData], D: fireball[0]})
    )): console.log("Loading");


    return(
        <>
            <h1>Fireball Data</h1>
            <Box
                display= "flex"
                component="span"
                noValidate
                m = "auto"
                direction={"row"}
                justifyContent={"center"}
                maxWidth={'100%'}
                sx={{
                    gridTemplateColumns: { sm: '1fr 1fr 1fr' },
                    gap: 2,
                    textAlign: 'center',
                }}
            >
                <TextField
                    label="Min Date"
                    id="min-date"
                    className={"input"}

                    // eslint-disable-next-line
                    error={!minDate.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) && minDate !== ""}
                    // eslint-disable-next-line
                    helperText={!minDate.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) && minDate !== ""
                    ? "Invalid Date Format" : ""}
                    sx={{ m: 1, width: '25ch' }}
                    variant={"filled"}
                    onChange={handleMinDateChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">YYYY-MM-DD</InputAdornment>,
                    }}
                />
                <TextField
                    label="Max Date"
                    id="max-date"
                    className={"input"}
                    // eslint-disable-next-line
                    error={!maxDate.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) && maxDate !== ""}
                    // eslint-disable-next-line
                    helperText={!maxDate.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) && maxDate !== ""
                        ? "Invalid Date Format" : ""}
                    sx={{ m: 1, width: '25ch' }}
                    variant={"filled"}
                    onChange={handleMaxDateChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">YYYY-MM-DD</InputAdornment>,
                    }}
                />
                    <Button
                        onClick={handleClicked}
                        variant="contained"
                        style={{
                            position: "relative",
                            top: "200%",
                            textTransform: "none",
                            padding: "14px 0px",
                            width: "12%",
                            justifyContent: "center",
                        }}
                        // eslint-disable-next-line
                        disabled={(!maxDate.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
                            && maxDate !== "") ||
                            // eslint-disable-next-line
                            (!minDate.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) &&
                             minDate !== "")}

                    >
                        Load Data
                    </Button>
            </Box>
            <Box
                display= "flex"
                sx={{
                    gap: 2,
                }}
            >
                <Select
                    labelId="xAxis-select-label"
                    id="xAxis-select"
                    value= {xAxis}
                    label="X Axis"
                    onChange={handleXAxisChange}
                    className = {"input"}
                >
                    <MenuItem value={"Energy"}>Energy</MenuItem>
                    <MenuItem value={"Velocity"}>Velocity</MenuItem>
                    <MenuItem value={"Altitude"}>Altitude</MenuItem>
                    <MenuItem value={"Impact Energy"}>Impact Energy</MenuItem>
                </Select>

                <Select
                    labelId="yAxis-select-label"
                    id="yAxis-select"
                    value= {yAxis}
                    label="Y Axis"
                    onChange={handleYAxisChange}
                    className = {"input"}
                >
                    <MenuItem value={"Energy"}>Energy</MenuItem>
                    <MenuItem value={"Velocity"}>Velocity</MenuItem>
                    <MenuItem value={"Altitude"}>Altitude</MenuItem>
                    <MenuItem value={"Impact Energy"}>Impact Energy</MenuItem>
                </Select>

                <Select
                    labelId="Graph-select-label"
                    id="graph-select"
                    value= {graphType}
                    label="Graph Select"
                    onChange={handleGraphChange}
                    className = {"input"}
                >
                    <MenuItem value={"Scatter"}>Scatter</MenuItem>
                    <MenuItem value={"Line"}>Line</MenuItem>
                </Select>
            </Box>

            {
                fireballData.count > 0 && graphType === "Scatter" ?
                    <ResponsiveContainer
                        width={"95%"}
                        height= {400}
                    >
                        <ScatterChart
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
                        <XAxis type="number" dataKey="E" name={xAxis} unit={xUnit}/>
                        <YAxis type="number" dataKey="V" name={yAxis} unit={yUnit}/>
                        <ZAxis type="string" dataKey="D" name="Date and Time" unit=""/>
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                        <Legend/>
                        <Scatter name="Fireballs" data={graphData} fill="#8884d8" shape="star"/>
                        </ScatterChart>
                    </ResponsiveContainer>:
                    fireballData.count > 0 && graphType === "Line" ?
                        <ResponsiveContainer
                            width={"95%"}
                            height= {400}
                        >
                            <LineChart
                                width={500}
                                height={300}
                                data={graphData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="E"/>
                                <YAxis/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="E" name={xAxis} unit={xUnit} stroke="#82ca9d" />
                                <Line type="monotone" dataKey="V" name={yAxis} unit={yUnit} stroke="#8884d8" activeDot={{ r: 8 }}/>

                            </LineChart>
                        </ResponsiveContainer> : <><h1>No Data</h1></>
            }
            <p>    </p>
        </>
    )

}

export default FireballPage;
