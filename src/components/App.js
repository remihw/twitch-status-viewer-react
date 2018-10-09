import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddUsername from './AddUsername';
import UserStreamingCardList from './UserStreamingCardList';
import UserChannelCardList from './UserChannelCardList.';

class App extends Component {

  constructor() {

    super();

    this.state = {
      usernames: ['streamerhouse', 'saltybet', 'mtggoldfish', 'twitch'],
      userStreamingData: [],
      userChannelData: []
    };

  };

  componentDidMount = () => {

    this.getUserDataFromTwitch(this.state.usernames)
      .then(userData => this.updateUserDataStates(userData));

  };

  getUserDataFromTwitch = (usernames) => {

    let promises = [];

    usernames.forEach(username => {
      promises.push(this.getUserStreamingData(username));
    });

    return Promise.all(promises);

  };

  getUserStreamingData = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/streams/${username}`)

      .then(response => {
        return response.json();
      })

      .then(userData => {

        if (userData.stream === null) {
          return this.getUserChannelData(username);
        }

        return userData;

      });

  };

  getUserChannelData = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/channels/${username}`)
      .then(response => response.json());

  };

  updateUserDataStates = (userData) => {

    const userStreamingData = userData.filter(user => {
            return typeof(user.stream) !== 'undefined'
          }),
          userChannelData = userData.filter(user => {
            return typeof(user.stream) === 'undefined'
          });

    this.setState({

      userStreamingData:
        [...this.state.userStreamingData, ...userStreamingData],
      userChannelData:
        [...this.state.userChannelData, ...userChannelData]

    });

  };

  addNewUserCard = (username) => {

    this.setState({ usernames: [...this.state.usernames, username] });

    this.getUserDataFromTwitch([ username ])
      .then(userData => this.updateUserDataStates(userData));

  };

  deleteUserStreamingCard = (username) => {

    const deletedUsername = username.toLowerCase();

    this.setState({
      usernames: this.state.usernames.filter(username => deletedUsername),
    });

  };

  render() {

    return (

      <div>

        <div>
          <AddUsername addNewUserCard={this.addNewUserCard} />
        </div>

        <div className='streaming-users'>

          <h4>STREAMING:</h4>

          <div className='cards-container'>
            <UserStreamingCardList userStreamingData={this.state.userStreamingData} />
          </div>

        </div>

        <div className='offline-users'>

          <h4>OFFLINE:</h4>

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
