import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddUsername from './AddUsername';
import UserCard from './UserCard';

class App extends Component {

  constructor() {

    super();

    this.state = {
      usernames: ['streamerhouse', 'saltybet', 'monstercat'],
      userDataFromTwitch: []
    };

  };

  componentDidMount() {
    this.getAllUserDataFromTwitch();
  };

  getAllUserDataFromTwitch = () => {

    let promises = [];

    this.state.usernames.forEach(username => {
      promises.push(this.getUserDataFromTwitch(username));
    });

    Promise.all(promises)
      .then(evt => this.setState({ userDataFromTwitch: evt }));

  };

  getUserDataFromTwitch = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/streams/${username}`)
      .then(response => response.json());

  };

  addNewUsername = (username) => {

    this.setState({ usernames: [...this.state.usernames, username] });

    this.getUserDataFromTwitch(username)

      .then(evt => this.setState({
        userDataFromTwitch: [...this.state.userDataFromTwitch, evt]
      }));

  };

  render() {

    return (
      <div>
        <AddUsername addNewUsername={this.addNewUsername}/>
        <UserCard userDataFromTwitch={this.state.userDataFromTwitch} />
      </div>
    );

  };

}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
