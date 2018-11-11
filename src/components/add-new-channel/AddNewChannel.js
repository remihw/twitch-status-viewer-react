import React, { Component } from 'react';

class AddNewChannel extends Component {

  handleSubmit = () => {

    const username = this.refs.usernameInput.value;

    this.props.addUsername(username);
    this.props.getChannelDetailsFromTwitch([username]);

    this.refs.usernameInput.value = '';

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

          <p className='channel-not-found'>
            {this.props.isChannelNotFound && <span>Channel not found</span>}
          </p>

      </div>

    );

  };

}

export default AddNewChannel;
