import React from 'react';
export default class AppTest2 extends React.Component {
  render(){
    return (
      <div>
        <p>{ this.props.speak }</p>
      </div>
    )
  }
}