import React, { Component } from 'react';
import OnlineStreamDetails from './online-stream-details/OnlineStreamDetails';

const OnlineStreams = (props) => {

  const onlineStreamsList = props.onlineStreamData.map(user => {

    return (
      <OnlineStreamDetails
        user={user}
        key={user.stream.channel.display_name}
        deleteStreamingCard={props.deleteStreamingCard}
      />
    );

  });

  return (

    <div className='online-streams'>

      <h4>STREAMING:</h4>

      <div className='cards-container'>
        {
          onlineStreamsList.length > 0
          ? onlineStreamsList
          : <div className='no-users'>All your streams are offline...</div>
        }
      </div>

    </div>

  )

};

export default OnlineStreams;
