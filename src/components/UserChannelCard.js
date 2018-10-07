import React, { Component } from 'react';

const UserChannelCard = (props) => {

  return (
    <div className='card'>
      <img src={props.user.logo} />
      <div className='card-details'>
        <div className='username'>{props.user.display_name}</div>
        <div>Followers: {props.user.followers}</div>
      </div>
    </div>
  );

};

export default UserChannelCard;
