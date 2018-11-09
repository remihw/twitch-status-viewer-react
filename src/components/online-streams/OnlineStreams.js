import React, { Component } from 'react';
import OnlineStreamDetails from './online-stream-details/OnlineStreamDetails';

const OnlineStreams = (props) => {

  const currentlyStreaming = props.onlineStreamData.map(user => {

    return (
      <OnlineStreamDetails
        user={user}
        key={user.stream.channel.display_name}
        deleteStreamingCard={props.deleteStreamingCard}
      />
    );

  });

  if (props.onlineStreamData.length === 0) {
    return <div className='no-users'>No users are currently streaming</div>;
  }

  return (

    <div className='online-streams'>

      <h4>STREAMING:</h4>

      <div className='cards-container'>
        {currentlyStreaming}
      </div>

    </div>

  )

};

export default OnlineStreams;
