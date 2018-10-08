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
    this.getDataForEachUsername();
  };

  getDataForEachUsername = () => {

    let promises = [];

    this.state.usernames.forEach(username => {
      promises.push(this.getUserStreamingData(username));
    });

    Promise.all(promises)

      .then(evt => this.updateUserCards(evt));

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

  updateUserCards = (data) => {

    const userStreamingData = data.filter(user => {
            return typeof(user.stream) !== 'undefined'
          }),
          userChannelData = data.filter(user => {
            return typeof(user.stream) === 'undefined'
          });

    this.setState({

      userStreamingData: [...this.state.userStreamingData, ...userStreamingData],
      userChannelData: [...this.state.userChannelData, ...userChannelData]

    });

  };

  addNewUsername = (username) => {

    this.setState({ usernames: [...this.state.usernames, username] });

    this.getUserStreamingData(username)

      .then(evt => this.updateUserCards([ evt ]));

  };

  render() {

    return (

      <div>

        <div>
          <AddUsername addNewUsername={this.addNewUsername} />
        </div>

        <div className='online-users'>

          <h3>STREAMING:</h3>

          <div className='cards-container'>
            <UserStreamingCardList userStreamingData={this.state.userStreamingData} />
          </div>

        </div>

        <div className='offline-users'>

          <h3>OFFLINE:</h3>

          <div className='cards-container'>
            <UserChannelCardList userChannelData={this.state.userChannelData} />
          </div>

        </div>

      </div>

    );

  };

}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
