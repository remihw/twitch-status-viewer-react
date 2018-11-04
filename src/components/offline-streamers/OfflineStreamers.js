import React, { Component } from 'react';
import OfflineStreamerDetails from './offline-streamer-details/OfflineStreamerDetails';

const OfflineStreamers = (props) => {

  if (props.offlineStreamerData.length === 0) {
    return <div className='no-users'>No users are currently offline</div>;
  }

  return props.offlineStreamerData.map(user => {

    return (
      <OfflineStreamerDetails user={user} key={user.name}
        deleteChannelCard={props.deleteChannelCard}
      />
    );

  });

};

export default OfflineStreamers;
