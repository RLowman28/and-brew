/**
 * The tags accepted by Open Brewery DB.
 */
export type AcceptableTags = ("dog-friendly" | "patio" | 
                        "food-service" | "food-trucks" |
                        "tours");

/**
 * A type describing the structure of a brewery object returned by Open
 *   Brewery DB.
 */
export type Brewery = {
    /** Open Brewery DB's ID for the brewery. */
    id: number;
    /** The name of the brewery. */
    name: string;
    /** 
     * The type of the brewery. Must be one of:
     *   - micro
     *   - regional
     *   - brewpub
     *   - large
     *   - planning
     *   - bar
     *   - contract
     *   - proprietor
     */
    brewery_type: ("micro" | "regional" | "brewpub" | "large" |
                    "planning" | "contract" | "proprietor");
    /** The street address of the brewery. */
    street: string;
    /** The city in which the brewery is located. */
    city: string;
    /** The state in which the brewery is located. */
    state: string;
    /** The postal code for the brewery, in 9-digit format. */
    postal_code: string;
    /** The country in which the brewery is located. */
    country: string;
    /** The longitude coordinate for the brewery. */
    longitude: string;
    /** The latitude coordinate for the brewery. */
    latitude: string;
    /** The phone number for the brewery, without punctuation. */
    phone: string;
    /** The brewery's website. */
    website_url: string;
    /** The time and date of this entry's last update. */
    updated_at: string;
    /** A list of string tags for the brewery. */
    tag_list: AcceptableTags[];
};