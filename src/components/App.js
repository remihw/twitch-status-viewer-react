import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserCard from './UserCard';

const twitchApi = "https://wind-bow.glitch.me/twitch-api";

class App extends Component {

  constructor() {

    super();

    this.state = {
      userNames: ['streamerhouse', 'kylestreamsstuff'],
      userDataFromTwitch: []
    };

  }

  componentDidMount() {

    this.state.userNames.forEach((name, index) => {

      fetch(`${twitchApi}/streams/${this.state.userNames[index]}`)

        .then(response => {
          return response.json();
        })

        .then(data => {
          console.log(data);
        })

    });

  }

  render() {
    return <UserCard userDataFromTwitch={this.state.userDataFromTwitch} />
  }

}

export default App;

ReactDOM.render(
  <App />, document.getElementById("container")
);
