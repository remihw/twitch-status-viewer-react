import React, { Component } from 'react';
import UserStreamingCard from './UserStreamingCard';

const UserStreamingCardList = (props) => {

  return props.userStreamingData.map(user => {

    return (
      <UserStreamingCard user={user} key={user.stream.channel.display_name}
        deleteStreamingCard={props.deleteStreamingCard}
      />
    );

  });

};

export default UserStreamingCardList;
