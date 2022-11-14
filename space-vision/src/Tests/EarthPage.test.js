import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import EarthPage from "../Pages/Earth/EarthPage";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders Earth data", async () => {
    const fakeEarth = [{"caption":"EPIC 2019-12-31 00:00:00","centroid_coordinates":{"lat":0.0,"lon":0.0},"date":"2019-12-31 00:00:00","image":"epic_1b_20191231000000","identifier":"epic_1b_20191231000000","lunar_distance":0.0,"sun_distance":0.0}];
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeEarth)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<EarthPage/>, container);
    });

    expect(container.querySelector("p").textContent).toBe(" " + fakeEarth[0].caption + " ");
    expect(container.textContent).toContain("Latitude: " + fakeEarth[0].centroid_coordinates.lat);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});