// Import all necessary libraries, nested components and types.
import React from 'react';
import GoogleMap, { Coords } from 'google-map-react';
import { Brewery } from '../types/globalTypes';
import BreweryDetails from './BreweryDetails';
import MapPin from './MapPin';

// Define and export the type structure for this component's prop object.
export type BreweryDetailsContainerProps = {
    /** The brewery data to be inserted, as a custom Brewery type. */
    brewery: Brewery;
};

/**
 * This component serves as the container for components that will provide
 *   details on a specific brewery.
 * 
 * @param props The properties for this component.
 * 
 * @returns A React Functional Component that will render components providing
 *            details on the brewery in the props object.
 */
export const BreweryDetailsContainer: React.FC<BreweryDetailsContainerProps> = (props) => {
    // Set the center of the map to be the brewery's coordinates.
    const center: Coords = {
        lat: parseFloat(props.brewery.latitude),
        lng: parseFloat(props.brewery.longitude)
    };

    return (<div>
                <BreweryDetails brewery={props.brewery} />
                <div id="googleMap" style={{height: '75vh', width: '100%'}}>
                    <GoogleMap
                        bootstrapURLKeys={{ key: ''}}
                        defaultCenter={center}
                        defaultZoom={18}
                    >
                        <MapPin lat={center.lat} lng={center.lng} />
                    </GoogleMap>
                </div>
            </div>);
}

// Export the BreweryListItem component as the default export.
export default BreweryDetailsContainer;