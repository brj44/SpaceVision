import './App.css';
import Homepage from "./homepage/homepage";
import coronalMassEjectionAPICall from "./APIs/coronalMassEjectionAPICall";
import {useEffect, useState} from "react";
import NasaPhoto from './APIs/NasaPhoto';

function App() {
    const [data, setData] = useState([]);
    const [photo, setPhoto]

    /*
        This function calls our API call function from the other file.
        It requires await because the function will only return a promise
        at first when we need the real data from the api call
     */
    const fetchData = async () => {
        setData(await coronalMassEjectionAPICall());
        setPhoto(await NasaPhoto());
    }

    //useEffect is called everytime the page is updated I believe.
    useEffect(() => {
        fetchData().then(r => {
            console.log(r);
        });
    }, []);

    // This function converts our json into a map and only
    // converts the latitude data into a paragraph html element.
    const tableRows = data.map((element) => {
        return(
            <p key = {element.latitude}>{element.latitude}</p>
        )
    })

    const picOfDay = photo.map((data1) =>{
        return <img src = {data1.url} />
    })

    //This is the main "meat" of a react file. This is the component that gets rendered.
    return (
        <div className="App">
            <header className="App-header">
                <Homepage />
                <div>{tableRows}</div>
                <div>{picOfDay}</div>
            </header>
        </div>
    );
}

export default App;
