import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserCard from './UserCard';

const twitchApi = 'https://wind-bow.glitch.me/twitch-api/streams/';

const getUserDataFromTwitch = function(userName) {

  return fetch(`${twitchApi}${userName}`)
    .then(response => response.json());

};

class App extends Component {

  constructor() {

    super();

    this.state = {
      userNames: ['streamerhouse', 'saltybet', 'monstercat'],
      userDataFromTwitch: []
    };

  }

  componentDidMount() {

    let promises = [];

    this.state.userNames.forEach(userName => {
      promises.push(getUserDataFromTwitch(userName));
    });

    Promise.all(promises)

      .then(evt => {

        this.setState({
          userDataFromTwitch: evt
        });

      })

  }

  render() {
    return <UserCard userDataFromTwitch={this.state.userDataFromTwitch} />
  }

}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
