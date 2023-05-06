import { useEffect } from 'react';
import * as PusherPushNotifications from '@pusher/push-notifications-web';

import beamsClient from "../lib/beams"

// beamsClient.subscribe(
//   'my-interest',
//   () => {
//     console.log('Subscribed to notifications');
//   (error: any) => {
//     console.error('Error subscribing to notifications:', error);
//   },
// );

const YourComponent = () => {
  useEffect(() => {
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: '948012ca-b295-4880-b193-993f2f0ebf73',
    });

    beamsClient
      .start()
      .then((beamsClient) => beamsClient?.getDeviceId())
      .then((deviceId) =>
        console.log('Successfully registered with Beams. Device ID:', deviceId)
      )
      .then(() => beamsClient.addDeviceInterest("hello"))
      .then(() => beamsClient.getDeviceInterests())
      .then((interests) => console.log("Current interests:", interests))
      .catch(console.error);

    // cleanup function to unsubscribe on component unmount
    return () => {
      beamsClient.stop().catch(console.error);
    };
  }, []);

  return <h1>Pusher Push Notifications Example</h1>;
};


export default YourComponent;
