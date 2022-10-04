
import { createJson } from './bru.js';


var x = (await createJson('apod'));   
console.log(x.url);  //to log all the info instead, do 'console.log(x)' ;to log the published date, log 'x.date', etc.

var x = await createJson('asteroid neo');
console.log(x.near_earth_objects);

var x = await createJson('insight');
console.log(x);

var x = await createJson('mars rover photos');
console.log(x);    //example of logging photo to console instead, 'console.log(x.photos[0].img_src)'
                   //example of logging photo id to console instead, 'console.log(x.photos[0].id)'


//earth  API call wont work
//var x = await createJson('earth');
//console.log(x);

//just demoing the pull request, ignore this