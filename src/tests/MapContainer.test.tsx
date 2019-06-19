// Import React, the component, the Brewery type, and all testing tools.
import React from 'react';
import { Coords } from 'google-map-react';
import MapContainer from '../components/MapContainer';
import { Brewery } from '../types/globalTypes';
import { render, cleanup } from '@testing-library/react';

// Set a static center object for testing this component.
const testCenter: Coords = {
    lat: 0,
    lng: 0
}

// Dismount the component after each test.
afterEach(cleanup);

it('Tests that the component renders.', () => {
    render(<MapContainer center={testCenter} zoom={1} error={false} />);
});

it('Component contains a unique map and a pin.', () => {
    // Get the container that the testing library renders the component in,
    // and pull the map and map pin off the 
    const { container } = render(<MapContainer 
                                    center={testCenter}
                                    zoom={1}
                                    error={false}
                                />);
    const map = container.querySelectorAll('#googleMap');
    const pin = container.querySelectorAll('.pin');

    // Check that the NodeList returned by the above querySelectorAll calls
    // are of length 1, i.e. both components render and are unique.
    expect(map.length).toEqual(1);
    expect(pin.length).toEqual(1);
});

it('Component renders an error when told to.', () => {
    // Pass true to the error property this time.
    const { container } = render(<MapContainer
                                    center={testCenter}
                                    zoom={1}
                                    error
                                />);
    const alert = container.querySelectorAll('.alert-danger');

    // Check that exactly one alert element rendered.
    expect(alert.length).toEqual(1); 
})

