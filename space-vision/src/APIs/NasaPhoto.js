require('dotenv').config();
async function fetchPhoto(){
    let APIKey = process.env.APIKey;
    let response = await fetch('https://api.nasa.gov/planetary/apod?api_key='+ APIKey);
    let apodData = await response.json();
    return apodData;
}

export default fetchPhoto;

/*
let btn = document.getElementById("btnClick")
let image = document.getElementById("image")

btn.addEventListener('click', function () {
    fetch("https://api.nasa.gov/planetary/apod?api_key=APIkey")
        .then(res => res.json())
        .then(result => {
            console.log(result)
            image.src = result.message
        })
})*/