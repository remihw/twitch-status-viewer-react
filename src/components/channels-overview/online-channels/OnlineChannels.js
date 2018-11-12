import React, { Component } from 'react';
import OnlineChannelDetails from './online-channel-details/OnlineChannelDetails';

const OnlineStreams = (props) => {

  const onlineChannels = props.onlineChannels.map(user => {

    return (

      <OnlineChannelDetails
        user={user}
        key={user.stream.channel.display_name}
        deleteOnlineChannel={props.deleteOnlineChannel}
        deleteUsername={props.deleteUsername}
      />

    );

  });

  return (

    <div className='online-streams'>

      <h4>STREAMING:</h4>

      <div className='cards-container'>
        {
          onlineChannels.length > 0
          ? onlineChannels
          : <div className='no-users'>All your streams are offline...</div>
        }
      </div>

    </div>

  )

};

export default OnlineStreams;
