
async function GetPhoto(date,rover){
  
    let path = '/mars-photos/api/v1/rovers/'+rover+'/photos?';
    let earth_date = '';
    if (date!=null){
         earth_date='earth_date='+date.toString()+'&';
    }
    else
        earth_date = 'earth_date=2022-01-01&'
    //let //earth_date= 'earth_date=2022-08-10&'     //use format:'earth_date=[date]&'
    let camera= ''           //use format: camera=[string]&
    let page = ''            //use format: page=[int]&
    let api_call=path + earth_date + camera + page;

    
   // if (val!=null)
      //  earth_date='earth_date=2022-10-17&';
        //will use this later, (after program works with the above) :'earth_date='+val.toString()+'&'
    

    const APIKey = process.env.REACT_APP_API_KEY;
    let response = await fetch('https://api.nasa.gov' + api_call + 'api_key=' + APIKey );
    let data = await response.json();

    console.log(data);

    return data;

}

export default GetPhoto;