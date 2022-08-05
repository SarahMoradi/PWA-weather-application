const CASHE_NAME = 'version-1'
const urlsToCashe = ['index.html', 'offline.html']

const self = this

self.addEventListener('install', (event) => {
  //این دستور باعث میشود که برای فراخوانی متد نصب ابتدا کش مورد نظر باز شود و این کش به دو نسخه ایندکس و افلاین اضافه گردد و در واقع کش برای دو فایل در نظر گرفته میشود
  event.waitUntil(
    caches.open(CASHE_NAME).then((cashe) => {
      console.log('opened cashe')
      return cashe.addAll(urlsToCashe)
    })
  )
})

self.addEventListener('fetch', (event) => {
  //برای هر درخواستی که به این فایل زده میشود یک متد اجرا میشود و درغیر این صورت اگر امکان پذیر نباشد از فایل افلاین استفاده میکند
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'))
    })
  )
})

self.addEventListener('activate', (event) => {
    //فقط کشی که جدید است باید نگه داشته شود و سایر نسخه های کش باید حذف شود 
  const cacheWhitelist = []
  cacheWhitelist.push(CASHE_NAME)

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => { 
            if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  )
})
