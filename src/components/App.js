import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddUserName from './AddUserName';
import UserCard from './UserCard';

class App extends Component {

  constructor() {

    super();

    this.state = {
      userNames: ['streamerhouse', 'saltybet', 'monstercat'],
      userDataFromTwitch: []
    };

  };

  componentDidMount() {
    this.getAllUserDataFromTwitch();
  };

  getAllUserDataFromTwitch() {

    let promises = [];

    this.state.userNames.forEach(userName => {
      promises.push(this.getUserDataFromTwitch(userName));
    });

    Promise.all(promises)
      .then(evt => this.setState({ userDataFromTwitch: evt }));

  };

  getUserDataFromTwitch(userName) {

    return fetch(`https://wind-bow.glitch.me/twitch-api/streams/${userName}`)
      .then(response => response.json());

  };

  render() {

    return (
      <div>
        <AddUserName />
        <UserCard userDataFromTwitch={this.state.userDataFromTwitch} />
      </div>
    );

  };

}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
