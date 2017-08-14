import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <li className="item">
        <h2>The life of a programmer</h2>
        <p className="hid">technology</p>
        <button className="btn-post">Submit</button>
      </li>
    );
  }
}
export default App;
