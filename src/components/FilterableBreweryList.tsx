// Import React, the Alert Bootstrap component, the Brewery type, and the
// BreweryListItem component.
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Brewery } from '../types/globalTypes';
import { BreweryListItem } from './BreweryListItem';

// Define and export the type structure for this component's props object.
export type FilterableBreweryListProps = {
    /** The list of breweries. @readonly */
    readonly breweries: Brewery[];
    /** Whether or not an error occurred on render. @readonly */
    readonly errorOnRender: boolean;
    /** The city and state where our breweries are from. @readonly */
    readonly location: string;
    /** The click handler for when a brewery is selected from the list. @readonly */
    readonly onBrewerySelect: (brewery: Brewery) => void;
};

// Define and export the type structure for this component's state object.
export type FilterableBreweryListState = {
    /** A boolean array specifiying which breweries should be rendered. @readonly */
    readonly filter: boolean[];
    /** Whether or not an error has occurred. @readonly */
    readonly error: boolean;
};

/**
 * This component renders the list of breweries for the given city and provides
 *   a text input that allows the user to filter the list to render those
 *   breweries that match a particular text input.
 */
export class FilterableBreweryList extends React.Component<FilterableBreweryListProps, FilterableBreweryListState> {
    /** 
     * The constructor for the component.
     */
    constructor(props: FilterableBreweryListProps) {
        super(props);

        // Set the initial state for the component.
        this.state = {
            filter: Array(this.props.breweries.length).fill(true),
            error: this.props.errorOnRender
        }

        // Bind each method's "this" reference to this component.
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.filterBrewery = this.filterBrewery.bind(this);
    }

    /**
     * This method handles when the text value changes in the filter text
     *   input element. It iterates through the list of breweries currently
     *   set to render, via the filter array, and selects which breweries
     *   should still render given the new value.
     * 
     * @param event The event that was triggered by the text value change.
     */
    handleFilterTextChange(event: React.SyntheticEvent): void {
        // Get the filter text via the event handler.
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const filterText: string = target.value;
        const filterLength: number = this.state.filter.length;

        // Create a new array of "false" to be the new filter array.
        let newFilter: boolean[] = Array(filterLength).fill(false);

        // Iterate through the filter array.
        for (let a: number = 0; a < filterLength; a++) {
            // Wrapping this in a try-catch to catch any out-of-bounds errors.
            // They shouldn't happen because array-lengths are derived from
            // a prop and nothing internal is being mutated length-wise.
            try {
                // Set the current value in newFilter to be whether or not
                // the filter text appears anywhere in the brewery's data.
                newFilter[a] = this.filterBrewery(this.props.breweries[a], filterText);
            }
            catch (error) {
                // Change the state to indicate an error has occurred.
                this.setState({error: true});
            }
        }

        // Update the state with the new filter array.
        this.setState({filter: newFilter});
    }

    /**
     * This method determines whether or not a brewery should be filtered out.
     *   It checks whether or not the given filter text appears in each field
     *   of the given brewery and returns true upon the first encounter of
     *   the text, or false if it is not found.
     * 
     * @param brewery The brewery to be checked.
     * @param filterText The text by which we are filtering our breweries.
     * 
     * @returns A boolean, whether or not the filter text appears anywhere in
     *            the given brewery.
     */
    filterBrewery(brewery: Brewery, filterText: string): boolean {
        // Set the filter text to all lower-case to make the search case-insensitive.
        const filterTextCI = filterText.toLowerCase();

        // Iterate through the tags assigned to the brewery.
        for (const tag in brewery.tag_list) {
            // If the filter text is a prefix of the current tag.
            if (tag.indexOf(filterTextCI.replace(" ", "-")) === 0 ) {
                return true;
            }
        }

        // Otherwise, return whether or not the case-insensitive filter text
        // is contained somewhere in the name or street, or is a prefix of
        // the brewery's type.
        return ((brewery.name.toLowerCase().indexOf(filterTextCI) > -1) ||
                (brewery.brewery_type.indexOf(filterTextCI) === 0) ||
                (brewery.street.toLowerCase().indexOf(filterTextCI) > -1));
    }

    /**
     * If the component updates and the breweries are different, then reset
     *   the filter array.
     */
    componentDidUpdate(previousProps: FilterableBreweryListProps) {
        // If the current brewery list is different from the previous brewery
        // list.
        if (this.props.breweries !== previousProps.breweries) {
            // Reset the filter array.
            this.setState({filter: Array(this.props.breweries.length).fill(true)});
        }
    }

    /**
     * Render the list of breweries and the filter text input field. Display an
     *   info box if there are no breweries to display, or an error if an error
     *   has occurred.
     */
    render() {
        // If an error occurred while trying to get and filter the brewery list.
        if (this.state.error) {
            return (<>
                        <form>
                            <input
                                id="filterTextInput"
                                type="text"
                                name="filterText"
                                onChange={this.handleFilterTextChange}
                            />
                        </form>
                        <Alert variant="danger" role="alert">
                            Something went wrong while trying to find some breweries.
                        </Alert>
                    </>);
        }

        // Get the filtered list of breweries to be rendered.
        const filteredBreweries: Brewery[] = this.props.breweries.filter((brewery: Brewery, index: number) => {
            return this.state.filter[index];
        })

        // If there are no breweries to display, render an Alert to the user
        // instead of an empty list.
        if (filteredBreweries.length === 0) {
            return (<>
                        <form>
                            <input
                                id="filterTextInput"
                                type="text"
                                name="filterText"
                                onChange={this.handleFilterTextChange}
                            />
                        </form>
                        <Alert variant="info" role="alert">
                            {`We could not find any breweries in ` +
                                `${this.props.location} matching your description.`}
                        </Alert>
                    </>);
        }

        // At this point, we have breweries to display. Map them to 
        // BreweryListItem components and render the list.
        const listItems = filteredBreweries.map((brewery: Brewery) => {
            return <BreweryListItem 
                        brewery={brewery} 
                        onListItemClick={this.props.onBrewerySelect}
                        key={brewery.id}
                    />
        })

        // Return the filter text input and the list of breweries.
        return (<>
                    <form>
                        <input
                            id="filterTextInput"
                            type="text"
                            name="filterText"
                            onChange={this.handleFilterTextChange}
                        />
                    </form>
                    <ul 
                        id="breweryList"
                        className="list-group align-center"
                    >  
                        {listItems}
                    </ul>
                </>);
    }
}

// Export this component as the default export.
export default FilterableBreweryList;