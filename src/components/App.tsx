// Import React and the primary components for this app.
import React from 'react';
import { Brewery } from '../types/globalTypes';
import BreweryDetailsContainer from './BreweryDetailsContainer';

// Some static data for testing.
const brewery: Brewery = {
  id: 5494,
  name: "MadTree Brewing",
  brewery_type: "regional",
  street: "3301 Madison Rd",
  city: "Cincinnati",
  state: "Ohio",
  postal_code: "45209-1132",
  country: "United States",
  longitude: "-84.4239715",
  latitude: "39.1563725",
  phone: "5138368733",
  website_url: "http://www.madtreebrewing.com",
  updated_at: "2018-08-24T15:44:22.281Z",
  tag_list: [
    "patio"
  ]
};

/**
 * This component is the container for the overall web app.
 */
export const App: React.FC<{}> = () => {
  return <BreweryDetailsContainer brewery={brewery} />;
}

// Export the App component as the default for use in index.tsx.
export default App;