
console.log('Service Worker Registered!');

// This function build an array of urls,
// fetch them, and store the responses in the cache,
// example: key: 'main.js' value: 'alert(3)'
self.addEventListener('install', event => {
    const urlsToCache = [
        '/',
        'js/main.js',
        'img/puk.gif',
        'https://fonts.googleapis.com/css?family=Barrio',
        'https://fonts.gstatic.com/s/barrio/v1/qC9DkIiXyrH5oRNKaVpE0g.woff2'

    ];
    event.waitUntil(
        caches.open('my-cache').then(cache => {
            return cache.addAll(urlsToCache)
        })
    );

});


self.addEventListener('fetch', event => {
    console.log('Fetch of: ', event.request.url);

    event.respondWith(
        // the response is resolved to null if there is no match 
        caches.match(event.request)
            .then(response => {
                var res = response;
                if (!res) {
                    console.log('NOT IN CACHE, FETCHED FROM NETWORK!')
                    res = fetch(event.request)
                } else {
                    console.log('FOUND IN CACHE')

                }

                return res
            })
    );

})







// self.addEventListener('fetch', event => {
    // console.log('Fetch of: ', event.request);




    // if (event.request.url.endsWith('.css')) {
    //     console.log('Fetch of: ', event.request);

    //     var resData = {
    //         headers: { 'Content-Type': 'text/css' }
    //     };

    //     event.respondWith(new Response('body {color: red}', resData));
    // }
    // if (event.request.url === 'http://127.0.0.1:8080/js/main.js') {
    //     console.log('Fetch of: ', event.request);
    //     event.respondWith(new Response('alert("Ma Kore?")'));
    // }

    // event.respondWith(new Response('Hello <b>World</b>',
    //     {headers: {'Content-Type' : 'text/html'}}));


    // event.respondWith(fetch('img/van.jpg'))

    // event.respondWith(
    //     fetch(event.request)
    //         .then(res => {
    //             if (res.status === 404) {
    //                 console.log('404 for: ', event.request.url);
    //                 return new Response('Not Found Dude')
    //             } else {
    //                  return res;
    //             }
    //         })
    //         .catch(err => {
    //             console.log('Big Problem talking to that server');
    //             return new Response('Big Problem')
    //         })
    // );



// })
