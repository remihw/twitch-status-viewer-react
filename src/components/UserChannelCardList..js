import React, { Component } from 'react';
import UserChannelCard from './UserChannelCard';

const UserChannelCardList = (props) => {

  if (props.userChannelData.length === 0) {
    return <div className='no-users'>No users are currently offline</div>;
  }

  return props.userChannelData.map(user => {

    return (
      <UserChannelCard user={user} key={user.name}
        deleteChannelCard={props.deleteChannelCard}
      />
    );

  });

};

export default UserChannelCardList;
