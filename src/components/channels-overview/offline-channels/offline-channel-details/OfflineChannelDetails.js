import React, { Component } from 'react';

const OfflineChannelDetails = (props) => {

  const onClick = () => {
    props.deleteOfflineChannel(props.user.display_name);
    props.deleteUsername(props.user.display_name);
  }

  return (

    <div className='card'>

      <div className='btn-delete-card' onClick={onClick}>X</div>

      <img src={props.user.logo} />

      <div className='card-details'>
        <div className='username'>{props.user.display_name}</div>
        <div>Followers: {props.user.followers}</div>
      </div>

    </div>

  );

};

export default OfflineChannelDetails;
