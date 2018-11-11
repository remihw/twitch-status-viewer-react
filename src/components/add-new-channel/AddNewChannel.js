import React, { Component } from 'react';

class AddNewChannel extends Component {

  handleSubmit = () => {
    this.props.addNewChannel(this.refs.usernameInput.value);
    this.refs.usernameInput.value = '';
  };

  render() {

    return (

      <div className='add-username'>

        <input ref='usernameInput'></input>

        <button className='btn-add' onClick={this.handleSubmit.bind(this)}>
          <span>+</span>
        </button>

      </div>

    );

  };

}

export default AddNewChannel;
