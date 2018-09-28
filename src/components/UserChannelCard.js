import React, { Component } from 'react';

const UserChannelCard = (props) => {

  return (
    <div className='user-channel-card'>
      <div>{props.user.display_name}</div>
      <div>Offline</div>
    </div>
  );

};

export default UserChannelCard;
