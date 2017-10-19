import React from 'react';
import { browserHistory } from 'react-router';
import NotFoundHeader from './headers/NotFoundHeader.jsx';
/**
 * NotFoundPage class declaration
 */
export default class NotFoundPage extends React.Component {
  /**
   * renders component
   * @param {object} e
   * @return {void} void
   */
  handleClick(e) {
    browserHistory.push('/');
  }
  /**
   * renders component
   * @return {XML} XML/JSX
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

