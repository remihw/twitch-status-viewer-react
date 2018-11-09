import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AddNewStream from './components/add-new-stream/AddNewStream';
import OnlineStreams from './components/online-streams/OnlineStreams';
import OfflineStreams from './components/offline-streams/OfflineStreams';

class App extends Component {

  constructor() {

    super();

    this.state = {
      usernames: ['streamerhouse', 'saltybet', 'mtggoldfish', 'twitch'],
      onlineStreamData: [],
      offlineStreamData: []
    };

  };

  componentDidMount = () => {

    this.getDataFromTwitch(this.state.usernames)
      .then(evt => this.updateComponentView(evt));

  };

  getDataFromTwitch = (usernames) => {

    let promises = [];

    usernames.forEach(username => {
      promises.push(this.getOnlineStreamDetails(username));
    });

    return Promise.all(promises);

  };

  getOnlineStreamDetails = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/streams/${username}`)

      .then(response => {
        return response.json();
      })

      .then(userData => {

        if (userData.stream === null) {
          return this.getOfflineStreamDetails(username);
        }

        return userData;

      });

  };

  getOfflineStreamDetails = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/channels/${username}`)
      .then(response => response.json());

  };

  updateComponentView = (data) => {

    this.updateOnlineStreamDataState(data.filter(user => {
      return typeof(user.stream) !== 'undefined'
    }))

    this.updateOfflineStreamDataState(data.filter(user => {
      return typeof(user.stream) === 'undefined'
    }))

  };

  updateOnlineStreamDataState = (data) => {

    this.setState({
      onlineStreamData: [...this.state.onlineStreamData, ...data]
    });

  };

  updateOfflineStreamDataState = (data) => {

    this.setState({
      offlineStreamData: [...this.state.offlineStreamData, ...data]
    });

  };

  addNewUserCard = (username) => {

    this.setState({ usernames: [...this.state.usernames, username] });

    this.getDataFromTwitch([ username ])
      .then(evt => this.updateComponentView(evt));

  };

  deleteStreamingCard = (deletedUsername) => {

    this.setState({

      onlineStreamData: this.state.onlineStreamData.filter(user => {
        return user.stream.channel.display_name !== deletedUsername;
      })

    });

    this.deleteUsername(deletedUsername);

  };

  deleteChannelCard = (deletedUsername) => {

    this.setState({

      offlineStreamData: this.state.offlineStreamData.filter(user => {
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

        <AddNewStream
          addNewUserCard={this.addNewUserCard}
        />

        <OnlineStreams
          onlineStreamData={this.state.onlineStreamData}
          deleteStreamingCard={this.deleteStreamingCard}
        />

        <OfflineStreams
          offlineStreamData={this.state.offlineStreamData}
          deleteChannelCard={this.deleteChannelCard}
        />

      </div>

    );

  };

}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
