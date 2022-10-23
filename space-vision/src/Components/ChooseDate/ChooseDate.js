//import './ChooseDate.css'   
import {useEffect, useState} from "react";
//import GetPhoto from '../../APIs/MarsData';

const ChooseDate = ({setDate1}) =>{

    const [data,setData] = useState(null)
    //const [print,setPrint] = useState(false)

    function getDate(val){
        //setPrint(false)

        setData(val.target.value)
        var storedDate = data
        //console.log(val.target.value)
    }

    return(<form action="/space-vision/public" method="get">
    <div classname = "App">
        {
        //print?
        <h1>{data}</h1>
        //:null
        }
      <input type="text" onChange={getDate}/>
    </div>
        <button onClick={e=>{
            e.preventDefault(),
            //setPrint(true), 
            setDate1(data)} }className='SearchButton'>Submit </button>
    </form>)
}
export default ChooseDate;
