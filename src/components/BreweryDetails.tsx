// Import React, the Brewery type, and a helper function.
import React from 'react';
import { Brewery } from '../types/globalTypes';
import { abbreviateState } from '../utils/apiHelpers';

// Define and export the type structure for this component's prop object.
export type BreweryDetailsProps = {
    /** The brewery data to be inserted, as a custom Brewery type. */
    brewery: Brewery;
};

/**
 * This component provides the details, including a map view, of a particular
 *   brewery.
 * 
 * @param props The properties for this component.
 * 
 * @returns A React Functional Component with the brewery's information.
 */
export const BreweryDetails: React.FC<BreweryDetailsProps> = (props) => {
    // Destructure the necessary data from the brewery property.
    const { name, brewery_type, 
        street, city, state, 
        postal_code, phone,
        website_url, tag_list } = props.brewery;

    // Style the city, state, and ZIP code.
    const cityStateZIP = `${city}, ${abbreviateState(state)} ` +
                            `${postal_code.substr(0, 5)}`;
                        
    // Style the phone number.
    const prettyPhone = `${phone.substr(0, 3)}-${phone.substr(3, 3)}` +
                            `-${phone.substr(6, 4)}`;

    // Map the tags to an array of li elements.
    const listItems = tag_list.map((tag, i) => {
        return <li key={i}>{tag}</li>
    });

    return (<div>
                <p>{name} | {brewery_type} | {website_url}</p>
                <p>{street}; {cityStateZIP}</p>
                <p>{prettyPhone}</p>
                <ul>{listItems}</ul>
            </div>);
}

// Export the BreweryListItem component as the default export.
export default BreweryDetails;