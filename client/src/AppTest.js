import React from 'react';
import ReactDom from 'react-dom';
import AppTest2 from './AppTest2';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'hmmmm'
    };
  }
  onClick(e) {
    this.setState({
      username: this.username.value
    });
  }
  render() {
    return (
      <li className="item">
        <h3>{this.state.username}</h3>
        <h2>The life of a programmer</h2>
        <p className="hid">technology</p>
        <input type="text" id="username" ref={input => this.username = input } name="username"/><br/>
        <input type="text" id="email" name="email"/>
        <button className="btn-post" onClick={e => this.onClick(e)}>Submit</button>
        <AppTest2 speak={ this.props.speak } />
      </li>
    );
  }
}
export default App;
