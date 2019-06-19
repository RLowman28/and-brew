// Import React, the component, the Brewery type, and all testing tools.
import React from 'react';
import BreweryList from '../components/BreweryList';
import { Brewery } from '../types/globalTypes';
import { render, cleanup } from '@testing-library/react';

// Set a static brewery object for testing this component.
const testBrewery: Brewery = {
    id: 5494,
    name: "MadTree Brewing",
    brewery_type: "regional",
    street: "3301 Madison Rd",
    city: "Cincinnati",
    state: "Ohio",
    postal_code: "45209-1132",
    country: "United States",
    longitude: "-84.4239715",
    latitude: "39.1563725",
    phone: "5138368733",
    website_url: "http://www.madtreebrewing.com",
    updated_at: "2018-08-24T15:44:22.281Z",
    tag_list: [
        "patio"
    ]
};

// Dismount the component after each test.
afterEach(cleanup);

it('Test that the component renders.', () => {
    render(<BreweryList onBreweryItemClick={jest.fn} />);
});

it('Check that the list contains bars from the default city.', () => {
    // Set the default city.
    const defaultCity = 'blacksburg';
    const defaultState = 'virginia';
    
    // Render the brewery list and get the container.
    const { container, queryAllByText } = render(<BreweryList onBreweryItemClick={jest.fn} />);

    // Get the breweries in the default city and check that their
    // names are on the list.
    fetch(`https://api.openbrewerydb.org/breweries?by_city=` + 
            `${defaultCity}&by_state=${defaultState}`)
        .then((results) => {
           return results.json();
        })
        .then((breweries) => {
            // Check that the number of li elements matches the number
            // of breweries on the list.
            const liElements = container.querySelectorAll("li");
            expect(liElements.length).toEqual(breweries.length);

            // Iterate through the list of breweries to confirm that they
            // appear on the list.
            breweries.forEach((brewery: Brewery) => {
                // See that the current brewery name occurs exactly once
                // within this component.
                expect(queryAllByText(brewery.name).length).toEqual(1);
            });
        });
});