// Import React, the component, the Brewery type, and all testing tools.
import React from 'react';
import BreweryDetails from '../components/BreweryDetails';
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
    render(<BreweryDetails brewery={testBrewery} />);
});

it('Formats the information correctly.', () => {
    const { queryByText } = render(<BreweryDetails brewery={testBrewery} />);

    // Any of these will throw an error if the
    expect(queryByText("MadTree Brewing")).not.toBeNull();
    expect(queryByText("3301 Madison Rd; Cincinnati, OH 45209")).not.toBeNull();
});

it('Formats the information correctly with data that covers all branches.', () => {
    // Create a more empty Brewery object.
    let branchBrewery = testBrewery;
    branchBrewery.phone = "";
    branchBrewery.street = "";
    branchBrewery.tag_list = ['patio', 'dog-friendly', 'food-truck'];

    const { queryByText } = render(<BreweryDetails brewery={branchBrewery} />);

    // Any of these will throw an error if the
    expect(queryByText("MadTree Brewing")).not.toBeNull();
    expect(queryByText("http://www.madtreebrewing.com")).not.toBeNull();
    expect(queryByText("Cincinnati, OH 45209")).not.toBeNull();
});