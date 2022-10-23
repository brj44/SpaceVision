import fireballAPICall from "../APIs/fireballAPICall";
import {useEffect, useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
import './FireballPage.css';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function FireballPage(){
    const [fireballData, setFireballData] = useState({data:[]});
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [clicked, setClicked] = useState(false);

    const handleMinDateChange = (event) => {
        setMinDate(event.target.value);
    }
    const handleMaxDateChange = (event) => {
        setMaxDate(event.target.value);
    }
    const handleClicked = () => {
        setClicked(true);
        fetchData(minDate, maxDate).then(r => {
            console.log(r);
        });
    }

    const fetchData = async (minDate, maxDate) => {
        if (clicked) {
            if (minDate === "" ) {
                setFireballData(await fireballAPICall());
            } else if (minDate !== "" && maxDate === "" || minDate !== "" && minDate===maxDate) {
                setFireballData(await fireballAPICall(minDate));
            } else {
                setFireballData(await fireballAPICall(minDate, maxDate));
            }
        }
    }

    useEffect( () => {
        fetchData(minDate, maxDate).then(r => {
            console.log(r);
        });
    }, []);

    fireballData ? console.log(fireballData.data[0]) : fetchData();

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
                        Submit
                    </Button>
            </Box>

            {
                fireballData.data ? fireballData.data.map((fireball) => {
                    return (
                        <div key = {fireball[0]}>
                            <p>Date and Time: {fireball[0]}</p>
                            <p>Velocity: {fireball[8]} km/s</p>
                            <p>Altitude: {fireball[7]}</p>
                            <p>Latitude: {fireball[3]}</p>
                            <p>Longitude: {fireball[5]}</p>
                            <p>Energy: {fireball[1]}</p>
                        </div>
                    )
                }) : <h1>Loading...</h1>
            }

        </>
    )

}

export default FireballPage;