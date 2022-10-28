import fireballAPICall from "../APIs/fireballAPICall";
import {useEffect, useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
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

function FireballPage(){
    const [fireballData, setFireballData] = useState({data:[]});
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

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

    const fetchData = async (minDate, maxDate) => {
        if (minDate === "") {
            setFireballData(await fireballAPICall());
        } else if ((minDate !== "" && maxDate === "") || (minDate !== "" && minDate === maxDate)) {
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
        graphData.push({V: fireball[8], E: fireball[1], D: fireball[0]})
    )) : console.log("loading");

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
                    display: 'grid',
                    gridTemplateColumns: { sm: '1fr 1fr 1fr' },
                    gap: 2,
                    textAlign: 'center',
                }}
            >
                <TextField
                    label="Min Date"
                    id="min-date"
                    className={"input"}
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
                <XAxis type="number" dataKey="E" name="Energy" unit=" kJ"/>
                <YAxis type="number" dataKey="V" name="Velocity" unit=" km/s"/>
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