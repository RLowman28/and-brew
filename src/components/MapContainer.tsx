// Import React, the Google Map component, and the Map Pin component.
import React from 'react';
import GoogleMap, { Coords } from 'google-map-react' ;
import Alert from 'react-bootstrap/Alert';
import MapPin from './MapPin';

// Define and export the type structure for this component's props object.
export type MapContainerProps = {
    /** Where the map should be centered. @readonly */
    readonly center: Coords;
    /** The initial zoom on the map. @readonly */
    readonly zoom: number;
    /** 
     * A mark for whether or not an error occurred trying to gather data
     *   for the map.
     * 
     * @readonly
     */
    readonly error: boolean;
};

// Define and export the type structure for this component's state object.
export type MapContainerState = {
    /** The current center of the map. @readonly */
    readonly center: Coords;
};

/**
 * This component handles rendering and recentering the Google Maps component.
 */
export class MapContainer extends React.Component<MapContainerProps, MapContainerState> {
  /**
   * The constructor for this component.
   * 
   * @param props The properties passed to this component by its parent.
   */
  constructor(props: MapContainerProps) {
      super(props);

      // Set the component's initial state.
      this.state = {
          center: this.props.center
      }
  }

  /**
   * This method rerenders the map if its container was rerendered with a
   *   new pair of coordinates.
   */
  componentDidUpdate() {
      this.setState((previousState: MapContainerState, newProps: MapContainerProps): object | undefined => {
        // If the new coordinates passed through props are different from
        // the current coordinates.
        if (previousState.center !== newProps.center) {
            // Change the state.
            return {center: newProps.center};
        }
      });
  }

  /** 
   * This method renders a Google Maps component with a pin at the center
   *   passed from the parent component.
   */  
  render() {
    // Get the public key, if it is available.
    const publicKey: string = (process.env.REACT_APP_PUBLIC_KEY === undefined) ?
                                "" : process.env.REACT_APP_PUBLIC_KEY;
                                
    // If there was an error while getting the coordinates needed to render
    // the map.'
    if (this.props.error) {
      return (<div id="googleMap">
                <Alert variant="danger" role="alert">
                  {'There was a problem with retrieving location data for ' +
                    'this brewery'}
                </Alert>
              </div>)
    }

    return (
      <div id="googleMap">
        <GoogleMap
          bootstrapURLKeys={{ key: publicKey }}
          center={this.state.center}
          defaultZoom={this.props.zoom}
        >
          <MapPin
            lat={this.state.center.lat}
            lng={this.state.center.lng}
          />
        </GoogleMap>
      </div>
    );
  }
}

// Export the component as the default export.
export default MapContainer;