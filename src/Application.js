import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AddNewChannel from './components/add-new-channel/AddNewChannel';
import ChannelsOverview from './components/channels-overview/ChannelsOverview';

class Application extends Component {

  constructor() {

    super();

    this.state = {
      usernames: ['streamerhouse', 'saltybet', 'mtggoldfish', 'twitch'],
      onlineChannels: [],
      offlineChannels: []
    };

  };

  componentDidMount = () => {
    this.getChannelDetailsFromTwitch(this.state.usernames);
  };

  getChannelDetailsFromTwitch = (usernames) => {

    let promises = [];

    usernames.forEach(username => {
      promises.push(this.getOnlineChannelDetails(username));
    });

    Promise.all(promises)
      .then(evt => this.updateChannels(evt));

  };

  getOnlineChannelDetails = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/streams/${username}`)

      .then(response => {
        return response.json();
      })

      .then(data => {

        if (data.stream === null) {
          return this.getOfflineChannelDetails(username);
        }

        return data;

      });

  };

  getOfflineChannelDetails = (username) => {

    return fetch(`https://wind-bow.glitch.me/twitch-api/channels/${username}`)
      .then(response => response.json());

  };

  updateChannels = (data) => {

    // TODO: the username is already added here, add this check sooner when the
    // username is still available and can be passed to addNewUsername.
    if (data.length === 1 && typeof(data[0].error) !== 'undefined') {
      return;
    }

    this.updateOnlineChannels(data.filter(user => {
      return typeof(user.stream) !== 'undefined'
    }))

    this.updateOfflineChannels(data.filter(user => {
      return typeof(user.stream) === 'undefined'
    }))

  };

  updateOnlineChannels = (data) => {

    this.setState({
      onlineChannels: [...this.state.onlineChannels, ...data]
    });

  };

  updateOfflineChannels = (data) => {

    this.setState({
      offlineChannels: [...this.state.offlineChannels, ...data]
    });

  };

  addNewUsername = (username) => {

    // Note: only add the username after we get the data back from Twitch so
    // that we know for sure that the user actually exists.

    this.setState({
      usernames: [...this.state.usernames, username]
    });

  };

  deleteOnlineChannel = (deletedUsername) => {

    this.setState({

      onlineChannels: this.state.onlineChannels.filter(user => {
        return user.stream.channel.display_name !== deletedUsername;
      })

    });

  };

  deleteOfflineChannel = (deletedUsername) => {

    this.setState({

      offlineChannels: this.state.offlineChannels.filter(user => {
        return user.display_name !== deletedUsername;
      })

    });

  };

  deleteUsername = (deletedUsername) => {

    this.setState({

      usernames: this.state.usernames.filter(username => {
        return username !== deletedUsername.toLowerCase();
      })

    });

  };

  render() {

    return (

      <div>

        <AddNewChannel
          usernames={this.state.usernames}
          addNewUsername={this.addNewUsername}
          getChannelDetailsFromTwitch={this.getChannelDetailsFromTwitch}
          isChannelNotFound={this.state.isChannelNotFound}
        />

        <ChannelsOverview
          onlineChannels={this.state.onlineChannels}
          offlineChannels={this.state.offlineChannels}
          deleteOnlineChannel={this.deleteOnlineChannel}
          deleteOfflineChannel={this.deleteOfflineChannel}
          deleteUsername={this.deleteUsername}
        />

      </div>

    );

  };

}

export default Application;

ReactDOM.render(<Application />, document.getElementById("container"));
