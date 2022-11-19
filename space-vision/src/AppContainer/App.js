import './App.css';
import Homepage from "../Pages/Homepage/Homepage";
import coronalMassEjectionAPICall from "../APIs/coronalMassEjectionAPICall";
import {useEffect, useState} from "react";
import Header from "../Components/Header/Header";
import EarthPage from "../Pages/Earth/EarthPage";
import Apod from "../Pages/APOD/apod";
import "../Components/SearchBar/SearchBar";
import SearchBar from '../Components/SearchBar/SearchBar';
import FireballPage from "../Pages/Fireball/FireballPage";
import SearchResults from "../Pages/DisplaySearchResults/DisplaySearchResults";
import Marz from "../Pages/Mars/myMarz";
import Graphpage from "../Pages/GraphPage/graphpage"
import EONET from "../Pages/EONET/EONET"
import MarsWeather from "../Pages/Mars Weather/MarsWeather"


function App() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState("HOMEPAGE");
    const [query,setQuery] = useState("")
    
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
    switch (page){
        case "HOMEPAGE":
            return(
                <div className="App">
                    <header className="Home">
                        <Header
                            setPage = {setPage}
                        />
                         <SearchBar
                            setPage = {setPage}
                            setQuery = {setQuery}
                            />
                        <Homepage />
                    </header>
                </div>
            );
        case "EARTHPAGE":
            return(
                <div className="App">
                    <header className="App-header">
                        <Header
                            setPage = {setPage}
                        />
                        <SearchBar
                            setPage = {setPage}
                            setQuery = {setQuery}
                            />
                        <EarthPage/>
                    </header>
                </div>
            );
            case "APOD":
            return(
                <div className="App">
                    <header className="App-header">
                        <Header
                            setPage = {setPage}
                        />
                         <SearchBar
                            setPage = {setPage}
                            setQuery = {setQuery}
                            />
                        <Apod/>
                    </header>
                </div>
            );
            case "FIREBALL DATA":
                return(
                    <div className="App">
                        <header className="App-header">
                            <Header
                                setPage = {setPage}
                            />
                             <SearchBar
                            setPage = {setPage}
                            setQuery = {setQuery}
                            />
                            <FireballPage/>
                        </header>
                    </div>
                );
            case "Search Page":
                return(
                <div className="App">
                    <header className="App-header">
                        <Header
                            setPage = {setPage}
                        />
                        <SearchResults 
                            searchKey = {query}
                        />
                    </header>
                </div>
            );
            case "MARS":
                return(
                    <div className="AppMars">
                        <header className="MarsBackground">
                            <Header
                                setPage = {setPage}
                            />
                             <SearchBar
                            setPage = {setPage}
                            setQuery = {setQuery}
                            />
                            <Marz/>
                        </header>
                    </div>
                );
            case "MARS WEATHER":
                return(
                    <div className="AppMars">
                        <header className="MarsBackground">
                            <Header
                                setPage = {setPage}
                            />
                                <SearchBar
                            setPage = {setPage}
                            setQuery = {setQuery}
                            />
                            <MarsWeather/>
                        </header>
                    </div>
                );
            case "NATURAL EVENTS":
                return(
                    <div className="App">
                        <header className="App-header">
                            <Header
                                setPage = {setPage}
                            />
                                <SearchBar
                                setPage = {setPage}
                                setQuery = {setQuery}
                                />
                            <EONET/>
                        </header>
                    </div>
                );
            case "GRAPH PAGE":
                return(
                    <div className="App">
                        <header className="App-header">
                            <Header
                                setPage = {setPage}
                            />
                             <SearchBar
                            setPage = {setPage}
                            setQuery = {setQuery}
                            />
                            <Graphpage/>
                        </header>
                    </div>
                );
        default:
            return (
                <div className="App">
                    <header className="App-header">
                        <Header
                            setPage = {setPage}
                        />
                        <Homepage />
                        <div>{tableRows}</div>
                        <EarthPage/>
                    </header>
                </div>
            );
    }
}

export default App;
