import React, { Component } from 'react';
import UserStreamingCard from './UserStreamingCard';

const UserStreamingCardList = (props) => {

  if (props.userStreamingData.length === 0) {
    return <div className='no-users'>No users are currently streaming</div>;
  }

  return props.userStreamingData.map(user => {

    return (
      <UserStreamingCard user={user} key={user.stream.channel.display_name}
        deleteStreamingCard={props.deleteStreamingCard}
      />
    );

  });

};

export default UserStreamingCardList;
