// Import React, the component, the Brewery type, and all testing tools.
import React from 'react';
import BreweryListItem from '../components/BreweryListItem';
import { Brewery } from '../types/globalTypes';
import { render, 
         fireEvent,
         cleanup } from '@testing-library/react';

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
    render(<BreweryListItem brewery={testBrewery} onListItemClick={jest.fn} />);
});

it('Passes the brewery stored in the list item when clicked.', () => {
    // Expect an assertion to be called.
    expect.assertions(1);
    
    // Set up a mock click handler and a variable for testing.
    const mockClickHandler = jest.fn((brewery: Brewery) => {
        expect(brewery.id).toEqual(5494);
    });

    // Render the component with the mock handler.
    const { getByText } = render(<BreweryListItem 
                                    brewery={testBrewery} 
                                    onListItemClick={mockClickHandler}
                                />);

    // Fire a click event on the element.
    fireEvent.click(getByText("MadTree Brewing"));
})