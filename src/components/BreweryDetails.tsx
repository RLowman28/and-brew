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
    const prettyAddress = street + ((street.length > 0) ? "; " : "") +
                            `${city}, ${abbreviateState(state)} ` +
                            `${postal_code.substr(0, 5)}`;
                        
    // Style the phone number.
    const prettyPhone = (phone.length === 0) ? "" :
                        `${phone.substr(0, 3)}-${phone.substr(3, 3)}` +
                            `-${phone.substr(6, 4)}`;

    const phoneAndURL = prettyPhone + 
                        (((prettyPhone.length * website_url.length) > 0) ? " | " : "");
                        

    // Map the tags to an array of li elements.
    const listItems = tag_list.map((tag, i) => {
        // Define a dictionary for translating tags to emojis.
        const emojiTag = {
            "dog-friendly": "🐶",
            "patio": "⛱️",
            "food-service": "🍔",
            "food-truck": "🚚",
            "tours":  "ℹ️"
        };

        // Map each tag on the brewery to an emoji, followed by a
        // vertical pipe if it is not the last one.
        return (<li key={i}
                    role="img"
                    aria-label={tag}
                >
                    {((i + 1) < tag_list.length) ?
                        emojiTag[tag] + " | " : emojiTag[tag]}
                </li>);
    });

    return (<div id="breweryDetails">
                <strong>{name}</strong>
                <p>{phoneAndURL}<a href={website_url}>{website_url}</a></p>
                <p>{prettyAddress}</p>
                <p id="type">{brewery_type}</p>
                <ul id="tag-items">{listItems}</ul>
            </div>);
}

// Export the BreweryListItem component as the default export.
export default BreweryDetails;