import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddUsername from './AddUsername';
import UserStreamingCardList from './UserStreamingCardList';
import UserChannelCardList from './UserChannelCardList.';

class App extends Component {

  constructor() {

    super();

    this.state = {
      usernames: ['streamerhouse', 'saltybet', 'mtggoldfish'],
      userStreamingData: [],
      userChannelData: []
    };

  };

  componentDidMount = () => {
    this.getDataFromTwitchForEachUsername();
  };

  getDataFromTwitchForEachUsername = () => {

    let promises = [];

    this.state.usernames.forEach(username => {
      promises.push(this.getUserStreamingDataFromTwitch(username));
    });

    Promise.all(promises)

      .then(evt => this.updateUserStreamingAndChannelCards(evt));

  };

  getUserStreamingDataFromTwitch = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/streams/${username}`)

      .then(response => {
        return response.json();
      })

      .then(data => {

        if (data.stream === null) {
          return this.getUserChannelDataFromTwitch(username);
        }

        return data;

      });

  };

  getUserChannelDataFromTwitch = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/channels/${username}`)
      .then(response => response.json());

  };

  updateUserStreamingAndChannelCards = (data) => {

    const userStreamingData = data.filter(user => {
            return typeof(user.stream) !== 'undefined'
          }),
          userChannelData = data.filter(user => {
            return typeof(user.stream) === 'undefined'
          });

    this.setState({

      userStreamingData:
        [...this.state.userStreamingData, ...userStreamingData],
      userChannelData:
        [...this.state.userChannelData, ...userChannelData]

    });

  };

  addNewTwitchUsername = (username) => {

    this.setState({ usernames: [...this.state.usernames, username] });

    this.getUserStreamingDataFromTwitch(username)

      .then(evt => this.updateUserStreamingAndChannelCards([ evt ]));

  };

  render() {

    return (

      <div>

        <div>
          <AddUsername addNewTwitchUsername={this.addNewTwitchUsername} />
        </div>

        <h3>Streaming:</h3>
        <div className='cards-container'>
          <UserStreamingCardList userStreamingData={this.state.userStreamingData} />
        </div>

        <h3>Offline:</h3>
        <div className='cards-container'>
          <UserChannelCardList userChannelData={this.state.userChannelData} />
        </div>

      </div>

    );

  };

}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
