// Import the React library and the Brewery type.
import React from 'react';
import { Brewery } from '../types/globalTypes';
import { abbreviateState } from '../utils/apiHelpers';
import ListGroup from 'react-bootstrap/ListGroup';

// Define and export the type structure for this component's prop object.
export type BreweryListItemProps = {
    /** The brewery data to be inserted, as a custom Brewery type. @readonly */
    readonly brewery: Brewery;
    /** The on-click handler that gets called when a brewery is selected @readonly */
    readonly onListItemClick: (brewery: Brewery) => void;
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
    /**
     * This function handles when the ListGroup.Item wrapper is clicked, i.e.
     *   when the user selects a brewery to see more details. It passes the
     *   Brewery object in props up to the App component.
     * 
     * @param event The click event triggered by the ListGroup.Item component.
     */    
    function handleListItemClick(event: React.MouseEvent): void {
        props.onListItemClick(props.brewery);
    }

    // Destructure the necessary data from the brewery property.
    const { name, brewery_type, 
            street, city, state, 
            postal_code, website_url } = props.brewery;

    // Style the city, state, and ZIP code.
    const cityStateZIP = `${city}, ${abbreviateState(state)} ` +
                            `${postal_code.substr(0, 5)}`;

    // Render a Fragment with all of the data.
    return (<ListGroup.Item
                className="breweryLI"
                action
                onClick={handleListItemClick}
            >
                <p><strong>{name}</strong> | {brewery_type}</p>
                <p>{street}</p>
                <p>{cityStateZIP}</p>
                <a href={website_url}>Link to {name}</a>
            </ListGroup.Item>);
}

// Export the BreweryListItem component as the default export.
export default BreweryListItem;