// Specify the type structure of the translator dictionaries used below. 
interface StateDictionary {
    [key: string]: string
}

/**
 * This function makes a call to the Open Brewery DB API and returns a Promise
 *   that (hopefully) has a list of breweries located in a given city and state.
 * 
 * @async
 * 
 * @param city The city in which we are looking for breweries. This parameter
 *              must be underscore_separated, and is CaSe-iNseNSiTivE.
 * @param state The state in which we are looking for breweries. This parameter
 *                can be as above, or can be an two-character state abbreviation.
 * 
 * @returns A fetch Promise that will return the result of the API call.
 * 
 * @async
 */
export async function getBreweriesByCityAndState(city: string, state: string): Promise<Response> {
    // Save the state parameter to a new constant, unabbreviating if necessary.
    const stateName = (state.length === 2) ? unabbreviateState(state) : state;

    // Set the URL for the API request.
    const url = `https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${stateName}`;

    // Query Open Brewery DB for the breweries in the given city and state.
    const response =  await fetch(url);

    return response;
}

/**
 * This function makes a call to the Google Maps Place API, passing a text
 *   string to the API and returning a Promise that has location data,
 *   specifically coordinates, for the nearest result matching the text.
 * 
 * @param query An HTML escaped text query.
 * 
 * @returns A fetch Promise that will return location data for the query.
 * 
 * @async
 */
export async function getLocationByQuery(query: string): Promise<Response> {
    // Get the public key, if it is available.
    const publicKey: string = (process.env.REACT_APP_PUBLIC_KEY !== undefined) ?
                                process.env.REACT_APP_PUBLIC_KEY : "";
                                
    // Query the Google Maps Place API and return a Promise for the location
    // data corresponding to the query.
    return await fetch(`https://maps.googleapis.com/maps/api/geocode/json` + 
                        `?address=${query}&key=` + 
                        `${publicKey}`);
}

/**
 * This function takes a two-character state abbreviation and returns the full
 *   state name in snake_case format for use with Open Brewery DB.
 * 
 * @param abbreviation The two-character abbreviation.
 * 
 * @returns The full state name in snake_case, or null if the
 *            parameter was not a valid abbreviation.
 */
export function unabbreviateState(abbreviation: string): (string | null) {
    // Define the object that'll be used to translate abbreviations.
    const translator: StateDictionary = {
        'AL': 'alabama',
        'AK': 'alaska',
        'AZ': 'arizona',
        'AR': 'arkansas',
        'CA': 'california',
        'CO': 'colorado',
        'CT': 'connecticut',
        'DE': 'delaware',
        'FL': 'florida',
        'GA': 'georgia',
        'HI': 'hawaii',
        'ID': 'idaho',
        'IL': 'illinois',
        'IN': 'indiana',
        'IA': 'iowa',
        'KS': 'kansas',
        'KY': 'kentucky',
        'LA': 'louisiana',
        'ME': 'maine',
        'MD': 'maryland',
        'MA': 'massachusetts',
        'MI': 'michigan',
        'MN': 'minnesota',
        'MS': 'mississippi',
        'MO': 'missouri',
        'MT': 'montana',
        'NE': 'nebraska',
        'NV': 'nevada',
        'NH': 'new_hampshire',
        'NJ': 'new_jersey',
        'NM': 'new_mexico',
        'NY': 'new_york',
        'NC': 'north_carolina',
        'ND': 'north_dakota',
        'OH': 'ohio',
        'OK': 'oklahoma',
        'OR': 'oregon',
        'PA': 'pennsylvania',
        'RI': 'rhode_island',
        'SC': 'south_carolina',
        'SD': 'south_dakota',
        'TN': 'tennessee',
        'TX': 'texas',
        'UT': 'utah',
        'VT': 'vermont',
        'VA': 'virginia',
        'WA': 'washington',
        'WV': 'west_virginia',
        'WI': 'wisconsin',
        'WY': 'wyoming',
    };

    // Translate the abbreviation to its full state name by passing it as a key
    // for translator. If the abbreviation parameter is not valid, this will
    // return undefined.
    const translation = translator[abbreviation.toUpperCase()];

    // Return the translated state name if it is not undefined, or null in the
    // case that it is.
    return (translation) ? translation : null;
}

/**
 * This function takes a full state name in snake_case format and returns the
 *   two-character abbreviation.
 * 
 * @param state The full state name in snake_case.
 * 
 * @returns The abbreviation of the state name given, or null if an invalid
 *            name was passed.
 */
export function abbreviateState(state: string): (string | null) {
    // Define the object that'll be used to translate state names.
    const translator: StateDictionary = {
        'alabama': 'AL',
        'alaska': 'AK',
        'arizona': 'AZ',
        'arkansas': 'AR',
        'california': 'CA',
        'colorado': 'CO',
        'connecticut': 'CT',
        'delaware': 'DE',
        'florida': 'FL',
        'georgia': 'GA',
        'hawaii': 'HI',
        'idaho': 'ID',
        'illinois': 'IL',
        'indiana': 'IN',
        'iowa': 'IA',
        'kansas': 'KS',
        'kentucky': 'KY',
        'louisiana': 'LA',
        'maine': 'ME',
        'maryland': 'MD',
        'massachusetts': 'MA',
        'michigan': 'MI',
        'minnesota': 'MN',
        'mississippi': 'MS',
        'missouri': 'MO',
        'montana': 'MT',
        'nebraska': 'NE',
        'nevada': 'NV',
        'new_hampshire': 'NH',
        'new_jersey': 'NJ',
        'new_mexico': 'NM',
        'new_york': 'NY',
        'north_carolina': 'NC',
        'north_dakota': 'ND',
        'ohio': 'OH',
        'oklahoma': 'OK',
        'oregon': 'OR',
        'pennsylvania': 'PA',
        'rhode_island': 'RI',
        'south_carolina': 'SC',
        'south_dakota': 'SD',
        'tennessee': 'TN',
        'texas': 'TX',
        'utah': 'UT',
        'vermont': 'VT',
        'virginia': 'VA',
        'washington': 'WA',
        'west_virginia': 'WV',
        'wisconsin': 'WI',
        'wyoming': 'WY'
    };

    // Fix up the state parameter to better fit the translator dictionary's
    // keys, to fix some commonly misformatted parameters.
    const stateKey = state.replace(' ', '_').toLowerCase();

    // Translate the state name  to its abbreviation by passing it as a key
    // for translator. If the abbreviation parameter is not valid, this will
    // return undefined.
    const translation = translator[stateKey];

    // Return the translated abbreviation if it is not undefined, or null in
    // the case that it is.
    return (translation) ? translation : null;
}