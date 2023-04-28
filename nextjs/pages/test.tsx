
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function handler(){
  Pusher.logToConsole = true;

  const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
    cluster: 'eu'
  });

  var channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function(data: any) {
    alert(JSON.stringify(data));
  });

  return (
    <div>
      <h1>Pusher Test</h1>
      <p>
      Try publishing an event to channel <code>my-channel</code>
      with event name <code>my-event</code>.
      </p>  
    </div>
  )
}
