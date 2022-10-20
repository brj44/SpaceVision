import createJson from "./accessNasaAPI";

async function getPhoto(){
    const APIKey = process.env.REACT_APP_API_KEY;
    let data = await createJson('mars rover photos');
    return data;
}

export default getPhoto;