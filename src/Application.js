import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import GetChannelDetailsService from './services/GetChannelDetailsService';
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
    GetChannelDetailsService.getChannelDetails(this.state.usernames)
      .then(evt => this.updateChannels(evt));
  };

  updateChannels = (data) => {

    if (data[0].hasOwnProperty('usernameNotFound')) {
      return;
    }

    this.updateOnlineChannels(data.filter(user => {
      return user.hasOwnProperty('stream');
    }))

    this.updateOfflineChannels(data.filter(user => {
      return !user.hasOwnProperty('stream');
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
          updateChannels={this.updateChannels}
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
