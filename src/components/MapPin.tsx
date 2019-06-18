// Import React and the pin styles.
import React from 'react';

// Define and export the type structure and default values for the props object.
const defaultProps ={
    lat: 39.744,
    lng: -77.088,
};
export type MapPinProps = {
    /** 
     * The latitude coordinate for the pin.
     * 
     * @default 
     */
    lat: number;
    lng: number;
};

/**
 * Render a map pin component at the given latitude and longitude.
 * 
 * @param props The properties for the component.
 * 
 * @returns A React Functional Component that displays a map pin at a location
 *            inside a GoogleMapReact component.
 */
export const MapPin = (props: MapPinProps) => {
    return <div className="pin" />;
};

// Set the default property values.
MapPin.defaultProps = defaultProps;

// Export the MapPin component as the default export.
export default MapPin;