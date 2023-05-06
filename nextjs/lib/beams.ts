import * as PusherPushNotifications from '@pusher/push-notifications-web';

const beamsClient = new PusherPushNotifications.Client({
  instanceId: '948012ca-b295-4880-b193-993f2f0ebf73',
});

export default beamsClient;