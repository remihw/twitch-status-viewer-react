import React, { Component } from 'react';

class AddUserName extends Component {

  handleSubmit() {
    this.props.addNewUsername(this.refs.usernameInput.value);
  };

  render() {

    return (
      <div className='add-username'>
        <input ref='usernameInput'></input>
        <button onClick={this.handleSubmit.bind(this)}>Add</button>
      </div>
    );

  };

}

export default AddUserName;
