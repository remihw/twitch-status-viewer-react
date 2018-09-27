import React, { Component } from 'react';

const UserStreamingCard = (props) => {

  return (
    <div className='user-streaming-card'>
      <div>{props.user.stream.channel.display_name}</div>
      <div>Playing: {props.user.stream.channel.game}</div>
    </div>
  );

};

export default UserStreamingCard;
