import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AddNewStreamer from './components/add-new-streamer/AddNewStreamer';
import OnlineStreamers from './components/online-streamers/OnlineStreamers';
import OfflineStreamers from './components/offline-streamers/OfflineStreamers';

class App extends Component {

  constructor() {

    super();

    this.state = {
      usernames: ['streamerhouse', 'saltybet', 'mtggoldfish', 'twitch'],
      onlineStreamerData: [],
      offlineStreamerData: []
    };

  };

  componentDidMount = () => {

    this.getDataFromTwitch(this.state.usernames)
      .then(evt => this.updateComponentView(evt));

  };

  getDataFromTwitch = (usernames) => {

    let promises = [];

    usernames.forEach(username => {
      promises.push(this.getOnlineStreamerDetails(username));
    });

    return Promise.all(promises);

  };

  getOnlineStreamerDetails = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/streams/${username}`)

      .then(response => {
        return response.json();
      })

      .then(userData => {

        if (userData.stream === null) {
          return this.getOfflineStreamerDetails(username);
        }

        return userData;

      });

  };

  getOfflineStreamerDetails = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/channels/${username}`)
      .then(response => response.json());

  };

  updateComponentView = (data) => {

    this.updateOnlineStreamerDataState(data.filter(user => {
      return typeof(user.stream) !== 'undefined'
    }))

    this.updateOfflineStreamerDataState(data.filter(user => {
      return typeof(user.stream) === 'undefined'
    }))

  };

  updateOnlineStreamerDataState = (data) => {

    this.setState({
      onlineStreamerData: [...this.state.onlineStreamerData, ...data]
    });

  };

  updateOfflineStreamerDataState = (data) => {

    this.setState({
      offlineStreamerData: [...this.state.offlineStreamerData, ...data]
    });

  };

  addNewUserCard = (username) => {

    this.setState({ usernames: [...this.state.usernames, username] });

    this.getDataFromTwitch([ username ])
      .then(evt => this.updateComponentView(evt));

  };

  deleteStreamingCard = (deletedUsername) => {

    this.setState({

      onlineStreamerData: this.state.onlineStreamerData.filter(user => {
        return user.stream.channel.display_name !== deletedUsername;
      })

    });

    this.deleteUsername(deletedUsername);

  };

  deleteChannelCard = (deletedUsername) => {

    this.setState({

      offlineStreamerData: this.state.offlineStreamerData.filter(user => {
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
          <AddNewStreamer addNewUserCard={this.addNewUserCard} />
        </div>

        <div className='streaming-users'>

          <h4>STREAMING:</h4>

          <div className='cards-container'>

            <OnlineStreamers onlineStreamerData={this.state.onlineStreamerData}
              deleteStreamingCard={this.deleteStreamingCard}
            />

          </div>

        </div>

        <div className='offline-users'>

          <h4>OFFLINE:</h4>

          <div className='cards-container'>

            <OfflineStreamers offlineStreamerData={this.state.offlineStreamerData}
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
