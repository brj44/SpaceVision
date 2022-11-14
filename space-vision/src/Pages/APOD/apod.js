import NasaPhoto from "../../APIs/NasaPhoto";
import {useEffect, useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
import Button from "@mui/material/Button";

function Apod(){

    const [photo, setPhoto] = useState([]);

    const fetchData = async (date) => {
        if (date === "") {
            setPhoto(await NasaPhoto());
        } else if (date !== "") {
            setPhoto(await NasaPhoto(date));
        }
        }
    

    const [date, setDate] = useState("");

    const handleDate = event => {
    setDate(event.target.value);
    }

     const handleClicked = () => {
        fetchData(date).then(r => {
            console.log(r);
        });
     }

    useEffect( () => {

        fetchData().then(r => {
            console.log(r);
        });
    }, []);

    return(
            <>
                <h1>NASA Astronomy Picture Of The Day</h1>
                <h2> {photo.title} </h2>
                {photo.media_type === "video" ?
                    <iframe
                        title = {photo.title}
                        width = "60%"
                        src = {photo.url}
                    />
                    :
                    <img
                        src = {photo.url}
                        alt= "NASA APOD"
                        width = "750"
                    />
                }

                <p> {photo.explanation} </p>

                <h2> Want to see a different day? enter it below </h2>
                <p> Must be a date in the past </p>
                <TextField
                    label="date"
                    id="date"
                    className={"input"}
                    sx={{ m: 1, width: '25ch' }}
                    variant={"filled"}
                    onChange={handleDate}
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
                         disabled={(!date.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) //eslint-disable-line
                            && date !== "")}
                    >
                        Load Photo
                    </Button>
            </>
    )

}

export default Apod;