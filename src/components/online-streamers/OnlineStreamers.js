import React, { Component } from 'react';
import OnlineStreamerDetails from './online-streamer-details/OnlineStreamerDetails';

const OnlineStreamers = (props) => {

  if (props.onlineStreamerData.length === 0) {
    return <div className='no-users'>No users are currently streaming</div>;
  }

  return props.onlineStreamerData.map(user => {

    return (
      <OnlineStreamerDetails user={user} key={user.stream.channel.display_name}
        deleteStreamingCard={props.deleteStreamingCard}
      />
    );

  });

};

export default OnlineStreamers;
