const CacheKey = 'sw-app-v2';

const timeout = 400;

const initCache = () => {
  return caches.open(CacheKey).then(
    cache => {
      return cache.addAll(['./index.html']);
    },
    error => {
      console.log(error);
    },
  );
};

const tryNetwork = (req, timeout) => {
  console.log(req.url);
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(req).then(res => {
      clearTimeout(timeoutId);
      const responseClone = res.clone();
      caches.open(CacheKey).then(cache => {
        console.log(req.url);
        cache.put(req, responseClone);
      });
      resolve(res);
    }, reject);
  });
};

const getFromCache = req => {
  // console.log('getting from cache...');
  return caches.open(CacheKey).then(cache => {
    return cache.match(req).then(result => {
      return result || Promise.reject('no-match');
    });
  });
};

self.addEventListener('install', e => {
  console.log('Installed');
  e.waitUntil(initCache());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CacheKey) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

self.addEventListener('fetch', e => {
  // if (!e.request.url.startsWith('http:')) {
  //   return e.respondWith(fetch(e.request));
  // }

  e.respondWith(
    tryNetwork(e.request, timeout).catch(() => getFromCache(e.request)),
  );
});
