import React, { Component } from 'react';
import UserChannelCard from './UserChannelCard';

const UserChannelCardList = (props) => {

  return props.userChannelData.map(user => {

    return (
      <UserChannelCard user={user} key={user.name} />
    );

  });

};

export default UserChannelCardList;
