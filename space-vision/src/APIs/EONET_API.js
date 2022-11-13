async function GetEvents(categorie){
  
    let url = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&limit=90';
    
    let category = '';
    if (categorie!=null){
        category='&category='+categorie.toString();
    }
    
    //API key not needed for this NASA API
    const APIKey = process.env.REACT_APP_API_KEY;
    let response = await fetch(url + category );
    let data = await response.json();
    
    console.log(data);
    
    return data;
}

export default GetEvents;