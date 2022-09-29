async function EPICAPICall(){
    let APIKey = '8gM8MK39JmyKbq0S9WJyhD2pagekamrppBVDAiNM';
    let response = await fetch('https://api.nasa.gov/EPIC/api/natural?api_key=' + APIKey);
    const EPICAPIData = await response.json();
    return EPICAPIData;
}

export default EPICAPICall;
