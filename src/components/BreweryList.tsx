// Import the necessary libraries, functions, types, and components.
import React from 'react';
import FilterableBreweryList from './FilterableBreweryList';
import { Brewery } from '../types/globalTypes';
import { getBreweriesByCityAndState, abbreviateState } from '../utils/apiHelpers';

// Define and export the prop object structure for this component.
export type BreweryListProps = {
    /** The on-click handler to be passed to each brewery list item. @readonly*/
    readonly onBrewerySelect: (brewery: Brewery) => void;
};

// Define and export the state structure for this component.
export type BreweryListState = {
    /** The list of breweries as an array. @readonly */
    readonly breweries: Array<Brewery>;
    /** The city from which we are getting our breweries. @readonly */
    readonly city: string;
    /** The state from which we are getting our breweries. @readonly */
    readonly usState: string;
    /** A boolean for if there is an error on retrieving the brewery list. @readonly */
    readonly error: boolean;
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
            city: "austin",
            usState: "texas",
            error: false
        };
    }

    /**
     * This function queries the Open Brewery DB after the component initially
     * mounts.
     * 
     * @async
     */
    async componentDidMount() {
        try {
            // Query Open Brewery DB for the breweries in the state's city.
            let response = await getBreweriesByCityAndState(this.state.city, this.state.usState);

            // If the query returns ok.
            if (response.ok) {
                // Get the list of breweries returned.
                const results = await response.json();

                // Update this component's state to contain the retrieved breweries.
                this.setState({ breweries: results });
            }
            else {
                this.setState({error: true});
            }
        }
        catch(error) {
            this.setState({error: true});
        }
    }

    /**
     * This method renders a filterable list of breweries, as well as a form
     *   for selecting a different city and state.
     */
    render() {
        // Render the list of BreweryListItems within a ul element.
        return (<FilterableBreweryList 
                    breweries={this.state.breweries}
                    errorOnRender={this.state.error}
                    location={`${this.state.city}, ` +
                                `${abbreviateState(this.state.usState)}`}
                    onBrewerySelect={this.props.onBrewerySelect}
                />);
    }
}

// Export the component as the default.
export default BreweryList;