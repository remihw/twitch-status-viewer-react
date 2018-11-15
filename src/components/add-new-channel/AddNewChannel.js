import React, { Component } from 'react';
import getChannelService from '../../services/GetChannelService';

class AddNewChannel extends Component {

  constructor() {

    super();

    this.state = {
      isUsernameAlreadyAdded: false
    };

  };

  handleSubmit = () => {

    const newUsername = this.refs.usernameInput.value;

    if (this.isUsernameAlreadyAdded(newUsername)) {

      this.setState({ isUsernameAlreadyAdded: true })
      return;

    }

    getChannelService.getChannelDetails([ newUsername ])
      .then(evt => this.props.updateChannels(evt));

    this.setState({ isUsernameAlreadyAdded: false })
    this.refs.usernameInput.value = '';

  };

  isUsernameAlreadyAdded(newUsername) {

    return this.props.usernames.filter(username => {
      return username === newUsername;
    }).length === 1;

  };

  render() {

    return (

      <div>

        <div className='add-username'>

          <input ref='usernameInput'></input>

          <button className='btn-add' onClick={this.handleSubmit.bind(this)}>
            <span>+</span>
          </button>

        </div>

        <p className='error-message'>

          {this.props.isChannelNotFound &&
            <span>This channel does not seem to exist</span>
          }

          {this.state.isUsernameAlreadyAdded &&
            <span>You already added this channel</span>
          }

        </p>

      </div>

    );

  };

}

export default AddNewChannel;
