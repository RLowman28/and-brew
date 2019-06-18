// Import all necessary libraries, nested components and types.
import React from 'react';
import { Coords } from 'google-map-react';
import { Brewery } from '../types/globalTypes';
import BreweryDetails from './BreweryDetails';
import MapContainer from './MapContainer';
import { getLocationByQuery } from '../utils/apiHelpers';

// Define and export the type structure for this component's prop object.
export type BreweryDetailsContainerProps = {
    /** The brewery data to be inserted, as a custom Brewery type. */
    readonly brewery: (Brewery | null);
    /** Whether or not the component should render the back button. */
    readonly renderBackButton: boolean;
    /** The click handler for the back button. @readonly */
    readonly onBackToList: () => void;
};

// Define and export the type structure for this component's state object.
export type BreweryDetailsContainerState = {
    /** The center for the map. @readonly */
    readonly center: Coords;
    /** A mark for whether or not an error occurred. @readonly */
    readonly error: boolean;
}

/**
 * This component serves as the container for components that will provide
 *   details on a specific brewery.
 */
export class BreweryDetailsContainer extends React.Component<BreweryDetailsContainerProps, BreweryDetailsContainerState> {
    /**
     * The constructor for this component.
     * 
     * @param props The properties passed down by the parent component.
     */
    constructor(props: BreweryDetailsContainerProps) {
        super(props);

        // Set the initial state.
        this.state = {
            center: {
                lat: 39.744,
                lng: -77.088
            },
            error: false
        }

        // Bind the click handler method's "this" reference to this component.
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    /**
     * This method handles when the "Back to List" button is clicked. It calls
     *   the on-click handler passed from the App container through props.
     * 
     * @param event The React event triggered by the click.
     */
    handleBackClick(event: React.MouseEvent): void {
        this.props.onBackToList();
    }

    /**
     * Once the component mounts, force an update to properly center the map.
     */
    componentDidMount() {
        this.forceUpdate();
    }

    /**
     * Once the component has rendered and something is showing, this method
     *   checks to see if the coordinates in the Brewery object are valid.
     *   If they are not, we use the brewery's address to get a set of
     *   new coordinates via the Google Maps Place API, and we rerender the
     *   component with the new center.
     * 
     * @async
     */
    async componentDidUpdate(previousProps: BreweryDetailsContainerProps) {
        // If the brewery property is null, do nothing.
        if (this.props.brewery === null) return;

        // If the brewery property changed between renders, i.e. the user
        // selected a new brewery from the list.
        if (this.props.brewery !== previousProps.brewery) {
            // Reset the error flag.
            this.setState({error: false});
        }

        // If there is an error, do nothing.
        if (this.state.error) return;

        // Since the brewery is not null, we can try to build a center object
        // from it.
        const initialCenter: Coords = {
            lat: parseFloat(this.props.brewery.latitude),
            lng: parseFloat(this.props.brewery.longitude)
        }

        // If the center has invalid values.
        if ((isNaN(initialCenter.lat)) || (isNaN(initialCenter.lng))) {
            // Format the query string from the brewery data on record.
            const query:string = ((this.props.brewery.street.length === 0) ? `` :
                                `${this.props.brewery.street}, `) +
                                `${this.props.brewery.city}, ` +
                                `${this.props.brewery.state} ` +
                                `${this.props.brewery.postal_code}`;
            
            // Try to query the database and render a map from the results.
            // If there is an error, render an alert.
            try{
                let response = await getLocationByQuery(encodeURI(query));

                // If the response turned out okay.
                if (response.ok) {
                    // Get the results.
                    const resultsJSON = await response.json();
                    const results = resultsJSON.results[0].geometry.location;

                    // Build a new center with the coordinates.
                    const newCenter: Coords = {
                        lat: results.lat,
                        lng: results.lng
                    };

                    this.setState((previousState: BreweryDetailsContainerState): (object | undefined) => {
                        if ((previousState.center.lat !== newCenter.lat) &&
                            (previousState.center.lng !== newCenter.lng)) {
                            return {center: newCenter};
                        }
                    });
                }
            }
            catch(error) {
                // Mark the error.
                this.setState({error: true});
            }
        }
        else {
            // At this point, the coordinates on the brewery object are valid.
            // Rerender the component with these valid values.
            this.setState((previousState: BreweryDetailsContainerState): (object | undefined) => {
                // If the new coordinates passed through props are different from
                // the current coordinates.
                if ((previousState.center.lat !== initialCenter.lat) &&
                    (previousState.center.lng !== initialCenter.lng)) {
                    // Change the state.
                    return {center: initialCenter};
                }
            });
        }
    }

    /**
     * Render the initial component. It will be rerendered once we know we
     *   have good coordinates.
     */
    render() {
        // If a brewery has not been selected yet, render a blank component.
        if (this.props.brewery === null) {
            return <></>;
        }   

        // At this point, the brewery property is not null, and has data to be
        // displayed.

        // If I need to render the "Back to List" button.
        if (this.props.renderBackButton) {
            // Render a container with a "Back to List" button.
            return (<div id="detailsContainer"
                        className="row no-gutters align-items-center">
                        <BreweryDetails brewery={this.props.brewery} />
                        <MapContainer 
                            center={this.state.center}
                            zoom={17}
                            error={this.state.error}
                        >
                        </MapContainer>
                        <button 
                            id="backToList"
                            onClick={this.handleBackClick}
                        >
                            Back to List
                        </button>
                    </div>);
        }
        else {
            // Render a container without a "Back to List" button.
            return (<div id="detailsContainer"
                        className="row no-gutters align-items-center">
                        <BreweryDetails brewery={this.props.brewery} />
                        <MapContainer 
                            center={this.state.center}
                            zoom={17}
                            error={this.state.error}
                        >
                        </MapContainer>
                    </div>);
        }
    }
}

// Export the BreweryListItem component as the default export.
export default BreweryDetailsContainer;