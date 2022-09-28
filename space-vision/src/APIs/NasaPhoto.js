async function fetchPhoto(){
    let APIKey = '8gM8MK39JmyKbq0S9WJyhD2pagekamrppBVDAiNM';
    let response = await fetch('https://api.nasa.gov/planetary/apod?api_key='+ APIKey);
    let apodData = await response.json();
    return apodData;
}

export default fetchPhoto;

/*
let btn = document.getElementById("btnClick")
let image = document.getElementById("image")

btn.addEventListener('click', function () {
    fetch("https://api.nasa.gov/planetary/apod?api_key=8gM8MK39JmyKbq0S9WJyhD2pagekamrppBVDAiNM")
        .then(res => res.json())
        .then(result => {
            console.log(result)
            image.src = result.message
        })
})*/