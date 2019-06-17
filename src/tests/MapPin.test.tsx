// Import React, the component, the Brewery type, and all testing tools.
import React from 'react';
import MapPin from '../components/MapPin';
import { Brewery } from '../types/globalTypes';
import { render, cleanup } from '@testing-library/react';

// Dismount the component after each test.
afterEach(cleanup);

it('Test that the component renders with the default props.', () => {
    render(<MapPin />);
});

it('Test that the component renders with passed props.', () => {
    render(<MapPin lat={0} />);
    render(<MapPin lng={0} />);
    render(<MapPin lat={0} lng={0} />);
});