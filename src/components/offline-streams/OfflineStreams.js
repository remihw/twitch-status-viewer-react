import React, { Component } from 'react';
import OfflineStreamDetails from './offline-stream-details/OfflineStreamDetails';

const OfflineStreams = (props) => {

  const offlineStreamsList = props.offlineStreamData.map(user => {

    return (
      <OfflineStreamDetails
        user={user}
        key={user.name}
        deleteChannelCard={props.deleteChannelCard}
      />
    );

  });

  return (

    <div className='offline-streams'>

      <h4>OFFLINE:</h4>

      <div className='cards-container'>
        {
          offlineStreamsList.length > 0
          ? offlineStreamsList
          : <div className='no-users'>All your streams are online!</div>
        }
      </div>

    </div>

  )


};

export default OfflineStreams;
