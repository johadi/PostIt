import React from 'react';
import { browserHistory } from 'react-router';
import { NotFoundHeader } from './headers';
/**
 * NotFoundPage class declaration
 * @class NotFoundPage
 * @extends {React.Component}
 */
export default class NotFoundPage extends React.Component {
  /**
   * Handles click to go back home
   * @param {object} e - event
   * @return {void}
   */
  handleClick(e) {
    browserHistory.push('/');
  }
  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    return (
      <div id="not-found-div">
        <NotFoundHeader/>
        <div id="not-found-body" onClick={this.handleClick}></div>
      </div>
    );
  }
}

