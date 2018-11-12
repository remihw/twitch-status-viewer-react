import React, { Component } from 'react';
import OfflineChannelDetails from './offline-channel-details/OfflineChannelDetails';

const OfflineChannels = (props) => {

  const offlineChannels = props.offlineChannels.map(user => {

    return (

      <OfflineChannelDetails
        user={user}
        key={user.name}
        deleteOfflineChannel={props.deleteOfflineChannel}
        deleteUsername={props.deleteUsername}
      />

    );

  });

  return (

    <div className='offline-streams'>

      <h4>OFFLINE:</h4>

      <div className='cards-container'>
        {
          offlineChannels.length > 0
          ? offlineChannels
          : <div className='no-users'>All your streams are online!</div>
        }
      </div>

    </div>

  )


};

export default OfflineChannels;
