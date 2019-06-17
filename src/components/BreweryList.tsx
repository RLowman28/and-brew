// Import the necessary libraries, functions, types, and components.
import React from 'react';
import BreweryListItem from './BreweryListItem';
import { Brewery } from '../types/globalTypes';
import { getBreweriesByCityAndState } from '../utils/apiHelpers';

// Define and export the prop object structure for this component.
export type BreweryListProps = {};

// Define and export the state structure for this component.
export type BreweryListState = {
    /** The list of breweries as an array. */
    readonly breweries: Array<Brewery>;
    /** The city from which we are getting our breweries. */
    readonly city: string;
    /** The state from which we are getting our breweries. */
    readonly usState: string;
};

/**
 * This component handles querying the Open Brewery DB API for a list of
 * breweries in the city, and renders the information in an unordered list
 * of BreweryListItem components.
 */
export class BreweryList extends React.Component<BreweryListProps, BreweryListState> {
    /** 
     * The component's constructor.
     */
    constructor(props: BreweryListProps) {
        super(props);

        // Set the initial state for the component.
        this.state = {
            breweries: [],
            city: "blacksburg",
            usState: "virginia"
        }
    }

    /**
     * This function queries the Open Brewery DB after the component initially
     * mounts.
     * 
     * @async
     */
    async componentDidMount() {
        // Query Open Brewery DB for the breweries in the state's city.
        let response = await getBreweriesByCityAndState(this.state.city, this.state.usState);

        // If the query returns ok.
        if (response.ok) {
            // Get the list of breweries returned.
            const results = await response.json();

            // Update this component's state to contain the retrieved breweries.
            this.setState({ breweries: results });
        }
    }

    /**
     * This method renders a list of BreweryListItem components as defined by
     *   the "breweries" state field.
     */
    render() {
        // Map the "breweries" state field to an array of BreweryListItem
        // components.
        const listItems = this.state.breweries.map((brewery) => {
            return (<li key={brewery.id}>
                        <BreweryListItem brewery={brewery} />
                    </li>);
        });

        // Render the list of BreweryListItems within a ul element.
        return <ul>{listItems}</ul>;
    }
}

// Export the component as the default.
export default BreweryList;