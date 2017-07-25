import React from 'react';
import groupBackGround from '../../utils/groupPagesBackground';

export default class NullPage extends React.Component {
  componentDidMount() {
    groupBackGround();
  }
  render() {
    return null;
  }
}
