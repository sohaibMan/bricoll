self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker 🤙");
});

// importScripts("https://js.pusher.com/beams/service-worker.js");

// import {} from ".";
// declare var self: ServiceWorkerGlobalScope;

// self.addEventListener("push", function (event: any) {
//   console.log("Push event!! ", event);

//   if (event.data) {
//     console.log("This push event has data: ", event.data.text());
//   } else {
//     console.log("This push event has no data.");
//   }
// });

// self.addEventListener("install", (event: any) => {
//   console.log("Service Worker installed.");
//   event.waitUntil(
//     caches
//       .open("my-cache")
//       .then((cache) =>
//         cache.addAll([
//           "/_next/static/css/styles.chunk.css",
//           "/_next/static/chunks/main.js",
//           "/_next/static/runtime/webpack.js",
//           "/_next/static/runtime/main.js",
//           "/_next/static/chunks/webpack.js",
//           "/_next/static/chunks/pages/index.js",
//         ])
//       )
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service Worker activated.");
// });

// self.addEventListener("fetch", (event: any) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       }

//       return fetch(event.request).then((response: any) => {
//         if (!response || response.status !== 200 || response.type !== "basic") {
//           return response;
//         }

//         const responseToCache = response.clone();
//         caches
//           .open("my-cache")
//           .then((cache) => cache.put(event.request, responseToCache));

//         return response;
//       });
//     })
//   );
// });
