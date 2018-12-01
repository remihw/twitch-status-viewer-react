import React, { Component } from 'react';
import GetChannelDetailsService from '../../services/GetChannelDetailsService';

class AddNewChannel extends Component {

  constructor() {

    super();

    this.state = {
      newUsername: '',
      isNewUsernameAlreadyAdded: false
    };

  };

  handleChange = (evt) => {
    this.setState({ newUsername: evt.target.value });
  }

  handleSubmit = () => {

    const newUsername = this.state.newUsername;

    if (this.isNewUsernameAlreadyAdded(newUsername)) {
      this.setState({ isNewUsernameAlreadyAdded: true })
      return;
    }

    GetChannelDetailsService.getChannelDetails([ newUsername ])
      .then(evt => this.props.updateChannels(evt));

    this.setState({
      newUsername: '',
      isNewUsernameAlreadyAdded: false
    })

  };

  isNewUsernameAlreadyAdded(newUsername) {
    return this.props.usernames
      .filter(username => username === newUsername).length === 1;
  };

  render() {

    return (

      <div>

        <div className='add-username'>

          <input value={this.state.newUsername} onChange={this.handleChange}></input>

          <button className='btn-add' onClick={this.handleSubmit}>
            <span>+</span>
          </button>

        </div>

        <p className='error-message'>

          {this.props.isChannelNotFound &&
            <span>This channel does not seem to exist</span>
          }

          {this.state.isNewUsernameAlreadyAdded &&
            <span>You already added this channel</span>
          }

        </p>

      </div>

    );

  };

}

export default AddNewChannel;
