// Import the React library and the Brewery type.
import React from 'react';
import { Brewery } from '../types/globalTypes';
import { abbreviateState } from '../utils/apiHelpers';

// Define and export the type structure for this component's prop object.
export type BreweryListItemProps = {
    /** The brewery data to be inserted, as a custom Brewery type. */
    brewery: Brewery;
};

/**
 * This component displays basic information on a single brewery for use in
 *   a list of breweries.
 * 
 * @param props The properties for this component.
 * 
 * @returns A React Functional Component that puts the brewery's information
 *            into a Fragment for insertion into an li element.
 */
export const BreweryListItem: React.FC<BreweryListItemProps> = (props) => {
    // Destructure the necessary data from the brewery property.
    const { name, brewery_type, 
            street, city, state, 
            postal_code, website_url } = props.brewery;

    // Style the city, state, and ZIP code.
    const cityStateZIP = `${city}, ${abbreviateState(state)} ` +
                            `${postal_code.substr(0, 5)}`;

    // Render a Fragment with all of the data.
    return (<>
                <p>{name} | {brewery_type}</p>
                <p>{street}</p>
                <p>{cityStateZIP}</p>
                <a href={website_url}>Link to {name}</a>
            </>);
}

// Export the BreweryListItem component as the default export.
export default BreweryListItem;