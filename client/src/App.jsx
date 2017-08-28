import React from 'react';
import PropTypes from 'react-proptypes';
/**
 * App class declaration
 */
export default class App extends React.Component {
  /**
   * Renders the component
   * @return {XML} XML/JSX
   */
  render() {
    return this.props.children;
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired
};
