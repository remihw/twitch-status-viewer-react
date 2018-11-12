import React, { Component } from 'react';
import OnlineChannels from './online-channels/OnlineChannels';
import OfflineChannels from './offline-channels/OfflineChannels';

const ChannelsOverview = (props) => {

  return (

  <div className='channels-overview'>

    <OnlineChannels
      onlineChannels={props.onlineChannels}
      deleteOnlineChannel={props.deleteOnlineChannel}
      deleteUsername={props.deleteUsername}
    />

    <OfflineChannels
      offlineChannels={props.offlineChannels}
      deleteOfflineChannel={props.deleteOfflineChannel}
      deleteUsername={props.deleteUsername}
    />

  </div>

  )

};

export default ChannelsOverview;
