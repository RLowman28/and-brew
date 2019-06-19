// Import React, the component, the Brewery type, and all testing tools.
import React from 'react';
import BreweryDetailsContainer from '../components/BreweryDetailsContainer';
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

it('Tests that the component renders.', () => {
    render(<BreweryDetailsContainer 
                brewery={testBrewery}
                renderBackButton 
                onBackToList={jest.fn}
            />);
});

it('Component contains a unique map and a pin.', () => {
    // Get the container that the testing library renders the component in,
    // and pull the map and map pin off the 
    const { container } = render(<BreweryDetailsContainer
                                    brewery={testBrewery}
                                    renderBackButton
                                    onBackToList={jest.fn}
                                />);
    const map = container.querySelectorAll('#googleMap');
    const pin = container.querySelectorAll('.pin');

    // Check that the NodeList returned by the above querySelectorAll calls
    // are of length 1, i.e. both components render and are unique.
    expect(map.length).toEqual(1);
    expect(pin.length).toEqual(1);
});

