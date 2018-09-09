import React, { Component } from 'react';

const UserCard = (props) => {

  return props.userDataFromTwitch.map(user => {

    return (
      <div className='user-card' key={user.name}>
        <div>{user.name}</div>
        <div>{user.status}</div>
        <div>{user.game}</div>
      </div>
    )

  });

};

export default UserCard;
