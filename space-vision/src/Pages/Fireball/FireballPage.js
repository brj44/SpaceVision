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
        switch (xAxis){
            case "Energy":
                setXUnit("kJ");
                break;
            case "Velocity":
                setXUnit("km/s");
                break;
            case "Altitude":
                setXUnit("km");
                break;
            case "Impact Energy":
                setXUnit("kJ");
                break;
            default:
                setXUnit("kJ");
        }
    }

    const handleYAxisChange = (event) => {
        setYAxis(event.target.value);
        switch (yAxis){
            case "Energy":
                setYUnit("kJ");
                break;
            case "Velocity":
                setYUnit("km/s");
                break;
            case "Altitude":
                setYUnit("km");
                break;
            case "Impact Energy":
                setYUnit("kJ");
                break;
            default:
                setYUnit("km/s");
        }
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

    fireballData && fireballData.data && xAxis === "Energy" && yAxis === "Velocity" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[8], E: fireball[1], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Velocity" && yAxis === "Energy" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[8], E: fireball[1], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Energy" && yAxis === "Altitude" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[7], E: fireball[1], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Altitude" && yAxis === "Energy" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[7], E: fireball[8], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Energy" && yAxis === "Impact Energy" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[8], E: fireball[2], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Impact Energy" && yAxis === "Energy" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[2], E: fireball[8], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Velocity" && yAxis === "Altitude" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[1], E: fireball[7], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Altitude" && yAxis === "Velocity" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[7], E: fireball[1], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Velocity" && yAxis === "Impact Energy" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[1], E: fireball[2], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Impact Energy" && yAxis === "Velocity" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[2], E: fireball[1], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Altitude" && yAxis === "Impact Energy" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[7], E: fireball[2], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Impact Energy" && yAxis === "Altitude" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[2], E: fireball[7], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Altitude" && yAxis === "Altitude" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[7], E: fireball[7], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Impact Energy" && yAxis === "Impact Energy" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[2], E: fireball[2], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Velocity" && yAxis === "Velocity" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[1], E: fireball[1], D: fireball[0]})
    )) : fireballData && fireballData.data && xAxis === "Energy" && yAxis === "Energy" ? fireballData.data.map((fireball) => (
        graphData.push({V: fireball[8], E: fireball[8], D: fireball[0]})
    )) : console.log("Loading");


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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value= {yAxis}
                label="Y Axis"
                onChange={handleYAxisChange}
                className = {"input"}
            >
                <MenuItem value={"Energy"}>Energy</MenuItem>
                <MenuItem value={"Velocity"}>Velocity</MenuItem>
                <MenuItem value={"Altitude"}>Altitude</MenuItem>
                <MenuItem value={"Impact Energy"}>Impact Energy</MenuItem>
                <MenuItem value={""}></MenuItem>
            </Select>
            </Box>

            {
                fireballData.count > 0  ?
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
                </ScatterChart> : <><h1>No Data</h1></>
            }

        </>
    )

}

export default FireballPage;