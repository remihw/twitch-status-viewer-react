import React, { Component } from 'react';

const UserStreamingCard = (props) => {

  return (
    <div className='card'>
      <img src={props.user.stream.channel.logo} />
      <div className='card-details'>
        <div className='username'>{props.user.stream.channel.display_name}</div>
        <div className='playing'>{props.user.stream.channel.game}</div>
        <div className='viewers'>Watching: {props.user.stream.viewers}</div>
      </div>
    </div>
  );

};

export default UserStreamingCard;
