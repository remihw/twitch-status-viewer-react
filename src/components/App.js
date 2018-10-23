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
      .then(evt => this.updateComponentView(evt));

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

  updateComponentView = (data) => {

    this.updateUserStreamingDataState(data.filter(user => {
      return typeof(user.stream) !== 'undefined'
    }))

    this.updateUserChannelDataState(data.filter(user => {
      return typeof(user.stream) === 'undefined'
    }))

  };

  updateUserStreamingDataState = (data) => {

    this.setState({
      userStreamingData: [...this.state.userStreamingData, ...data]
    });

  };

  updateUserChannelDataState = (data) => {

    this.setState({
      userChannelData: [...this.state.userChannelData, ...data]
    });

  };

  addNewUserCard = (username) => {

    this.setState({ usernames: [...this.state.usernames, username] });

    this.getUserDataFromTwitch([ username ])
      .then(evt => this.updateComponentView(evt));

  };

  deleteStreamingCard = (deletedUsername) => {

    this.setState({

      userStreamingData: this.state.userStreamingData.filter(user => {
        return user.stream.channel.display_name !== deletedUsername;
      })

    });

    this.deleteUsername(deletedUsername);

  };

  deleteChannelCard = (deletedUsername) => {

    this.setState({

      userChannelData: this.state.userChannelData.filter(user => {
        return user.display_name !== deletedUsername;
      })

    });

    this.deleteUsername(deletedUsername);

  };

  deleteUsername = (deletedUsername) => {

    this.setState({

      usernames: this.state.usernames.filter(username => {
        return username === deletedUsername.toLowerCase();
      })

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
            <UserStreamingCardList userStreamingData={this.state.userStreamingData}
              deleteStreamingCard={this.deleteStreamingCard}
            />
          </div>

        </div>

        <div className='offline-users'>

          <h4>OFFLINE:</h4>

          <div className='cards-container'>
            <UserChannelCardList userChannelData={this.state.userChannelData}
              deleteChannelCard={this.deleteChannelCard}
            />
          </div>

        </div>

      </div>

    );

  };

}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
