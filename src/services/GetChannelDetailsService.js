const getChannelService = {

  baseUrl: 'https://wind-bow.glitch.me/twitch-api',

  getChannelDetails(usernames) {

    let promises = [];

    usernames.forEach(username => {
      promises.push(this.getOnlineChannelDetails(username));
    });

    return Promise.all(promises);

  },

  getOnlineChannelDetails(username) {

    return fetch(`${this.baseUrl}/streams/${username}`)

      .then(response => {
        return response.json();
      })

      .then(data => {

        if (data.stream === null) {
          return this.getOfflineChannelDetails(username);
        }

        return data;

      });

  },

  getOfflineChannelDetails(username) {

    return fetch(`${this.baseUrl}/channels/${username}`)

      .then(response => {
        return response.json()
      })

      .then(data => {

        if (data.hasOwnProperty('error')) {
          return { usernameNotFound: username };
        }

        return data;

      })

  }

}

export default getChannelService;
