const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { StaleWhileRevalidate, CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // define callback function, which filters requests we want to cache
  //in this example, this will include our JS and CSS files
  ({ request }) => ['style', 'script', 'worker'].includes( request.destination ),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      // cache status of 0 or 200; 
      // expiration plugin will cache responses to max age of 30 days

      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // new ExpirationPlugin({
      //   maxEntries: 60,
      //   maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      // }),
    ],
  })
);
