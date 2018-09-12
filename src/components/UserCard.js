import React, { Component } from 'react';

const UserCard = (props) => {

  return props.userDataFromTwitch.map(user => {

    return (
      <div className='user-card' key={user.stream.channel.display_name}>
        <div>{user.stream.channel.display_name}</div>
        <div>Playing: {user.stream.channel.game}</div>
      </div>
    );

  });

};

export default UserCard;
