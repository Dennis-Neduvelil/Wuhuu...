self.addEventListener("install",(e)=>{
    e.waitUntil(
        caches.open("static").then(cache=>{
            return cache.addAll(['/public/assets/404.svg','/public/assets/avatar.png','/public/assets/male.png',
            '/public/assets/female.png','/public/assets/human.png','/public/assets/ejs.png','/public/assets/express.png',
            '/public/assets/mongo.png','/public/assets/node.png','/public/assets/favicon.png','/public/assets/up-imgs.png'])
        })
    )
})

self.addEventListener('fetch',(e)=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request)
        })
    )
})