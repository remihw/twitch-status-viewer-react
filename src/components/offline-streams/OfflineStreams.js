import React, { Component } from 'react';
import OfflineStreamDetails from './offline-stream-details/OfflineStreamDetails';

const OfflineStreams = (props) => {

  const currentlyOffline = props.offlineStreamData.map(user => {

    return (
      <OfflineStreamDetails
        user={user}
        key={user.name}
        deleteChannelCard={props.deleteChannelCard}
      />
    );

  });

  if (props.offlineStreamData.length === 0) {
    return <div className='no-users'>No users are currently offline</div>;
  }

  return (

    <div className='offline-streams'>

      <h4>OFFLINE:</h4>

      <div className='cards-container'>
        {currentlyOffline}
      </div>

    </div>

  )


};

export default OfflineStreams;
