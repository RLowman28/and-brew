// Import React, the React-Bootstrap grid components, the brewery type,
// and the primary components for this app.
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Brewery } from '../types/globalTypes';
import BreweryList from './BreweryList';
import BreweryDetailsContainer from './BreweryDetailsContainer';

// Define and export the props structure for this component.
export type AppProps = {};

// Define and export the state structure for this component.
export type AppState = {
  /** The brewery on the list that is currently selected. @readonly */
  readonly selectedBrewery: (Brewery | null);
  /** 
   * This field determines whether to render the compact or the full view 
   * 
   * @readonly
   */
  readonly renderCompact: boolean;
};

/**
 * This component is the container for the overall web app.
 */
export class App extends React.Component<AppProps, AppState> {
  /**
   * The component's constructor.
   */
  constructor(props: AppProps) {
    super(props);

    // Set the default state.
    this.state = {
      selectedBrewery: null,
      renderCompact: (window.innerWidth < 576)
    }

    // Bind the "this" reference in each method to this component.
    this.onBrewerySelect = this.onBrewerySelect.bind(this);
    this.onBackToList = this.onBackToList.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  /**
   * This is the on-click handler for the list items in the brewery list.
   *   When one is clicked, the Brewery object that it represents is passed
   *   up to this component to be put into the state.
   * 
   * @param brewery The brewery selected by the user.
   */
  onBrewerySelect(brewery: Brewery): void {
    this.setState({selectedBrewery: brewery});
  }

  /**
   * This is the on-click handler for the back button in the brewery details
   *   component. When the button is clicked, the state updates the selected
   *   brewery field to null, indicating that the brewery was deselected.
   *   This also triggers a rerender of the app that displays the brewery list.
   */
  onBackToList(): void {
    this.setState({selectedBrewery: null});
  }

  /**
   * This method checks to see if the container width is below the threshold 
   *   for which we should render the compact view.
   * 
   * @returns A function that updates the state if the window width
   *            crosses the view threshold.
   */
  handleWindowResize() {
    // If the container width check is a mismatch from what is in the state.
    if ((window.innerWidth < 576) !== this.state.renderCompact) {
      this.setState((previousState: AppState): object => {
        return {renderCompact: !previousState.renderCompact};
      });
    }
  }

  /**
   * This component adds the window-resize handler when the component mounts.
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  /**
   * This component removes the window-resize handler befoer the component
   *   unmounts.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  /** 
   * This function renders only the BreweryList component if the screen is
   *   too small for the full view, or it renders the BreweryList and the
   *   BreweryDetailsContainer side-by-side if the screen is large enough.
   */
  render() {
    // If the current state says to render the compact version.
    if (this.state.renderCompact) {
      // Render the brewery list if no brewery is selected, or the details
      // for the selected brewery.
      return ((this.state.selectedBrewery === null) ?
                <BreweryList onBreweryItemClick={this.onBrewerySelect} /> :
                <BreweryDetailsContainer
                  brewery={this.state.selectedBrewery}
                  renderBackButton={this.state.renderCompact}
                  onBackToList={this.onBackToList}
                />);
    }
    else {
      // The window is wide enough for the full view. Render both components.
      return (<Container fluid={true}>
                <Row className="">
                  <Col sm={5} md={4} xl={3}>
                    <BreweryList onBreweryItemClick={this.onBrewerySelect} />
                  </Col>
                  <Col sm={7} md={8} xl={9}>
                    <BreweryDetailsContainer 
                      brewery={this.state.selectedBrewery}
                      renderBackButton={this.state.renderCompact} 
                      onBackToList={this.onBackToList}
                    />
                  </Col>
                </Row>
              </Container>);
    }
  }
}

// Export the App component as the default for use in index.tsx.
export default App;