import React from 'react';
import { Link, browserHistory } from 'react-router';
import NotFoundHeader from './headers/NotFoundHeader.jsx';
/**
 * GroupUsersPage class declaration
 */
export default class NotFoundPage extends React.Component {
  /**
   * renders component
   * @return {XML} XML/JSX
   */
  handleClick(e) {
    browserHistory.goBack();
  }
  render() {
    return (
      <div id="not-found-div">
        <NotFoundHeader/>
        <div id="not-found-body" onClick={this.handleClick}></div>
      </div>
    );
  }
}

