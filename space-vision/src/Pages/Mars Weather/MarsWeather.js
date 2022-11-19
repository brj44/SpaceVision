import "./MarsWeatherStyling.css"

function MarsWeather(){

    return(
        <div className='styling'> 
             <iframe title="weatherInfo" className='marsNASA'src='https://mars.nasa.gov/layout/embed/image/mslweather/'  scrolling='no' frameBorder='0'></iframe>
        </div>
    )
}

export default MarsWeather;