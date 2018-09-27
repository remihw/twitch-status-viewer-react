import React, { Component } from 'react';
import UserChannelCard from './UserChannelCard';

const UserChannelCardList = (props) => {

  console.log('props: ', props);

  return props.userChannelData.map(user => {

    return (
      // <UserChannelCard user={user} key={} />
      <div>test</div>
    );

  });

};

export default UserChannelCardList;
