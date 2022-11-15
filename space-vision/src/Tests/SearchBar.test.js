import React from "react";
import {render, fireEvent, screen} from "@testing-library/react"
import {expect, jest, test} from '@jest/globals';
import SearchBar from "../Components/SearchBar/SearchBar";

test('Search Button Label',() => {
  render(<SearchBar/>)
  const btn = screen.getByTestId("SearchBtn")
  expect(btn.textContent).toBe("Search")
});


test('Search Bar placeholder is Search NASA API',() => {
    render (<SearchBar/>)
    const input = screen.getByTestId("inputBar")
    expect(input.getAttribute("placeholder")).toBe("Search NASA API ")
});


test('text input box is blank',() => {
    render (<SearchBar/>)
    const textBox = screen.getByTestId("inputBar")
    expect(textBox.textContent).toBe("")
});