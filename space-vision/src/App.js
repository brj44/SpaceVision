import './App.css';
import Homepage from "./homepage/homepage";
import coronalMassEjectionAPICall from "./APIs/coronalMassEjectionAPICall";
import {useEffect, useState} from "react";
import Header from "./header/Header";


function App() {
    const [data, setData] = useState([]);

    /*
        This function calls our API call function from the other file.
        It requires await because the function will only return a promise
        at first when we need the real data from the api call
     */
    const fetchData = async () => {
        setData(await coronalMassEjectionAPICall());
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


    //This is the main "meat" of a react file. This is the component that gets rendered.
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
                <Homepage />
                <div>{tableRows}</div>
            </header>
        </div>
    );
}

export default App;
