import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserCard from './UserCard';

const url = "https://wind-bow.glitch.me/twitch-api";

class App extends Component {

  constructor() {

    super();

    this.state = {
      userNames: ['streamerhouse'],
      userDataFromTwitch: [
        {
          name: 'spo0oky',
          status: 'online',
          game: 'Word of Warcraft'
        },
        {
          name: 'Veneratio',
          status: 'online',
          game: 'Ragnarok Online'
        }
      ]
    };

  }

  componentDidMount() {

    // fetch(`${url}/streams/streamerhouse`)

    //   .then(response => {
    //     return response.json();
    //   })

    //   .then(data => {
    //     console.log(data)
    //   })

  }

  render() {
    return <UserCard userDataFromTwitch={this.state.userDataFromTwitch} />
  }

}

export default App;

ReactDOM.render(
  <App />, document.getElementById("container")
);
