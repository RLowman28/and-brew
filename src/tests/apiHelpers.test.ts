// Import the functions to be tested.
import { getBreweriesByCityAndState,
         unabbreviateState,
         abbreviateState, 
         getLocationByQuery} from "../utils/apiHelpers";

// Just some quick setup work to test the translators.
interface StateDictionary {
    [key: string]: string
}

describe('Test the function that makes the Open Brewery DB API call.', () => {
    it('Check that the function makes a call and returns a Promise.', () => {
        const response = getBreweriesByCityAndState("", "");
        expect(response).toBeInstanceOf(Promise);
    });

    it('Check that the function returns results ' +
        'when passed valid arguments.', async () => {
        //Query the DB and check that the status is ok.
        const response = await getBreweriesByCityAndState("blacksburg", "virginia");
        expect(response.ok).toBeTruthy();

        // Parse the results and check that they are a non-empy
        // array of breweries.
        const results = await response.json();
        expect(results).toBeInstanceOf(Array);
        expect(results.length).toBeGreaterThan(0);
    });

    it('Check that the function returns the same result whether a full' +
            'state name or abbreviation is used.', async () => {
        const fullNameResp = await getBreweriesByCityAndState("blacksburg", "virginia");
        const abbrResp = await getBreweriesByCityAndState("blacksburg", "va");

        const fullNameResults = await fullNameResp.json();
        const abbrResults = await abbrResp.json();

        // Check that the responses and the results are equal in all fields.
        expect(abbrResp).toEqual(fullNameResp);
        expect(abbrResults).toEqual(fullNameResults);
    });
});

describe('Test the function that makes the Google Maps API call.', () => {
    it('Check that the function makes a call and returns a Promise.', () => {
        const response = getLocationByQuery("");
        expect(response).toBeInstanceOf(Promise);
    });

    it('Check that the function returns results ' +
        'when passed valid arguments.', async () => {
        //Query the API and check that the status is ok.
        const response = await getLocationByQuery(encodeURI("blacksburg, virginia"));
        expect(response.ok).toBeTruthy();

        // Parse the results and check that they are a non-empy
        // array of breweries.
        const results = await response.json();
        expect(results).toBeInstanceOf(Object);
        expect(typeof results.results[0].geometry.location.lat).toBe('number');
        expect(typeof results.results[0].geometry.location.lng).toBe('number');
    });

    it('Check that the function returns the same result whether a full' +
            'state name or abbreviation is used.', async () => {
        const fullNameResp = await getBreweriesByCityAndState("blacksburg", "virginia");
        const abbrResp = await getBreweriesByCityAndState("blacksburg", "va");

        const fullNameResults = await fullNameResp.json();
        const abbrResults = await abbrResp.json();

        // Check that the responses and the results are equal in all fields.
        expect(abbrResp).toEqual(fullNameResp);
        expect(abbrResults).toEqual(fullNameResults);
    });
});

describe('Test the unabbreviate function.', () => {
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

    it('Test that all 50 state abbreviations translate correctly.', () => {
        Object.keys(translator).forEach((abbr) => {
            expect(unabbreviateState(abbr)).toEqual(translator[abbr]);
        });
    });

    it('Test that unabbreviate function is case-insensitive.', () => {
        expect(unabbreviateState("pa")).toEqual("pennsylvania");
        expect(unabbreviateState("Nh")).toEqual("new_hampshire");
        expect(unabbreviateState("hI")).toEqual("hawaii");
    });

    it('Test that bad abbreviations fail.', () => {
        expect(unabbreviateState("")).toBeNull();
        expect(unabbreviateState("a")).toBeNull();
        expect(unabbreviateState("abc")).toBeNull();
        expect(unabbreviateState("12")).toBeNull();
    });
});

describe('Test the abbreviate function.', () => {
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

    it('Test that all 50 state names abbreviate correctly.', () => {
        Object.keys(translator).forEach((fullName) => {
            expect(abbreviateState(fullName)).toEqual(translator[fullName]);
        });
    });

    it('Test that function parameter accepts loose formats.', () => {
        expect(abbreviateState("Pennsylvania")).toEqual("PA");
        expect(abbreviateState("New Hampshire")).toEqual("NH");
        expect(abbreviateState("hAwaII")).toEqual("HI");
    });

    it('Test that bad state names fail.', () => {
        expect(abbreviateState("")).toBeNull();
        expect(abbreviateState("a")).toBeNull();
        expect(abbreviateState("abc")).toBeNull();
        expect(abbreviateState("12")).toBeNull();
    });
});

























export default undefined;