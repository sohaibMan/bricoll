import * as PusherPushNotifications from '@pusher/push-notifications-web';

import beamsClient from "../../lib/beams"

beamsClient.publish(
  ['my-interest'],
  {
    fcm: {
      notification: {
        title: 'New message',
        body: 'You have a new message',
      },
    },
  },
);



