import React, { Component } from 'react';
import OnlineChannels from './online-channels/OnlineChannels';
import OfflineChannels from './offline-channels/OfflineChannels';

const ChannelsOverview = (props) => {

  return (

  <div className='channels-overview'>

    <OnlineChannels
      onlineChannels={props.onlineChannels}
      deleteOnlineChannel={props.deleteOnlineChannel}
    />

    <OfflineChannels
      offlineChannels={props.offlineChannels}
      deleteOfflineChannel={props.deleteOfflineChannel}
    />

  </div>

  )

};

export default ChannelsOverview;
