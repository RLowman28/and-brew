// Import the necessary libraries, functions, types, and components.
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import BreweryListItem from './BreweryListItem';
import { Brewery } from '../types/globalTypes';
import { getBreweriesByCityAndState, abbreviateState } from '../utils/apiHelpers';

// Define and export the prop object structure for this component.
export type BreweryListProps = {
    /** The on-click handler to be passed to each brewery list item. @readonly*/
    readonly onBreweryItemClick: (brewery: Brewery) => void;
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

        // Bind the click handler's "this" reference to this component.
        this.onListItemClick = this.onListItemClick.bind(this);
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
     * This method is the on-click handler for the brewery list items. It
     *   gets the Brewery object represented by the clicked item, and passes
     *   it up to the App component via the onBreweryItemClick component.
     * 
     * @param brewery The Brewery object that was selected.
     */
    onListItemClick(brewery: Brewery): void {
        this.props.onBreweryItemClick(brewery);
    }

    /**
     * This method renders a list of BreweryListItem components as defined by
     *   the "breweries" state field.
     */
    render() {
        // If there was an error in receiving the list of breweries.
        if (this.state.error) {
            // Render an alert information the user of the failure.
            return (<Alert variant="danger" role="alert">
                        {'There was a problem with retrieving the list of ' +
                            'breweries from the database.'}
                    </Alert>);
        }

        // If the list of breweries is empty.
        if (this.state.breweries.length === 0) {
            // Render an alert informing the user that there are no breweries.
            return (<Alert variant="info" role="alert">
                        {`We could not find any breweries in ` +
                            `${this.state.city}, ` +
                            `${abbreviateState(this.state.usState)}.`}
                    </Alert>);
        }

        // Map the "breweries" state field to an array of BreweryListItem
        // components.
        const listItems = this.state.breweries.map((brewery) => {
            return <BreweryListItem
                        brewery={brewery}
                        onListItemClick={this.onListItemClick}
                        key={brewery.id}
                    />;
        });

        // Render the list of BreweryListItems within a ul element.
        return (<ul id="breweryList" className="list-group align-center"
                >
                    {listItems}
                </ul>);
    }
}

// Export the component as the default.
export default BreweryList;