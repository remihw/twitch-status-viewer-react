import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddUsername from './AddUsername';
import UserStreamingCardList from './UserStreamingCardList';
import UserChannelCardList from './UserChannelCardList.';

class App extends Component {

  constructor() {

    super();

    this.state = {
      usernames: ['streamerhouse', 'saltybet', 'monstercat', 'mtggoldfish'],
      userStreamingData: [],
      userChannelData: []
    };

  };

  componentDidMount = () => {
    this.getAllUserDataFromTwitch();
  };

  getAllUserDataFromTwitch = () => {

    let promises = [],
        streamingData = [],
        channelData = [];

    this.state.usernames.forEach(username => {
      promises.push(this.getUserStreamingData(username));
    });

    Promise.all(promises)

      .then(evt => {

        console.log(evt);

        this.setState({
          userStreamingData: null,
          userChannelData: null
        })

      });

  };

  getUserStreamingData = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/streams/${username}`)

      .then(response => {
        return response.json();
      })

      .then(data => {

        if (data.stream === null) {
          return this.getUserChannelData(username);
        }

        return data;

      });

  };

  getUserChannelData = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/channels/${username}`)
      .then(response => response.json());

  };

  addNewUsername = (username) => {

    this.setState({ usernames: [...this.state.usernames, username] });

    this.getUserStreamingData(username)

      .then(evt => this.setState({
        userStreamingData: [...this.state.userStreamingData, evt]
      }));

  };

  render() {

    return (
      <div>
        <AddUsername addNewUsername={this.addNewUsername} />
        <UserStreamingCardList userStreamingData={this.state.userStreamingData} />
        <UserChannelCardList userChannelData={this.state.userChannelData} />
      </div>
    );

  };

}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
