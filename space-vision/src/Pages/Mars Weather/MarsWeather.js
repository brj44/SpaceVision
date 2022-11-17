import "./MarsWeatherStyling.css"

function MarsWeather(){

    return(
        <div className='styling'> 
             <iframe className='marsNASA'src='https://mars.nasa.gov/layout/embed/image/mslweather/'  scrolling='no' frameborder='0'></iframe>
        </div>
    )
}

export default MarsWeather;