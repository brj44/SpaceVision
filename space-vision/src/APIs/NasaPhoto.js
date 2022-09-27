
        async function fetchPhoto(){
            let APIKey = '8gM8MK39JmyKbq0S9WJyhD2pagekamrppBVDAiNM';
            let response = await fetch('https://api.nasa.gov/planetary/apod?api_key='+ APIKey);
            let apodData = await response.json();
            setPhotoData(apodData);
        }