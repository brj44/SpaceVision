import GetPhoto from "../APIs/MarsData"
import GetEvents from "../APIs/EONET_API"
//import React from "react";

describe('Out of Date Range', ()=>{
    test('Curiosity Rover: 2012-08-05', () => {
        expect(GetPhoto('2012-08-05','curiosity').photos).toBeNull();
    });
});

describe('Correct Natural Event', ()=>{
    test('Natural Event = wildfire', () => {
        expect(GetEvents('wildfires').events[0].categories[0].id).toEqual('wildfires');
    });
});
