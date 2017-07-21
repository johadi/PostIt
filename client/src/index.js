import React from 'react';
import ReactDOM from 'react-dom';
import './build/static/styles/custom.scss';

export default class App extends React.Component {
  render() {
    return (
        <div className="well alert">
          <h2>Welcome Jim!</h2>
        </div>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));
