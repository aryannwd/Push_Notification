var self = this;

self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);

  var title = 'Shop here';  
  var body = 'We have some offer for you';  
  var icon = 'https://lh3.googleusercontent.com/wEiHALMmfEShBEFzlDq8tdc9kAa-ADTwpda9YM2Di9W5Ee-QJ1qo8c_I3bhj1EGA3GfcXzFJOXEarepc9fzozUomP0RtPMsQ5KMcioeuyw1vYWJWsyHfZnKAt-saki4kIvn3gAY1c8nyK0jzJpqIF4WvyKfSJWz70yTpZt8N2hdoK_hyJXUGPAACabm7BI0U-FuTH-iFf5QZ2VJ0Epo7BzzdjVaZqvuEfmOC2WzxK9azYOAkqd2KFo0-dy_b39cOnmyxuYMFhLCBA5b8uLeILv55tESNTphRD9y74rqoka8BRkueqNKbLfF-uCH4Xc0JiJNVc6wx709hA3zjS5KV3CSUZ_mNm1jU9wmfJytz-l5wnP3G8InVOCJKfu5sJDp1mNfgzI0gNIgwuIhz2cXzm84weisz4In6KigRgEOCcdSb_B7DEmlLKjKrQ_ck3v-GE14cjAau7AOOLfJM6NB62z0K_z5sWoLvZZvXlYZf01opm9QPnbJQDyK5qUmQd9A1jGBp7sM92GQltLgs2LvD-14FWvGNK7Fd07XJVEJdQO0u2WHpono6QjW3NMGkaWX8Ma2-RhpQjlTobpWO5yPNTBl0z6uAV1jChMK0rSD8zrA=w100-h102-no';  
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});


self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);

    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
            .then(function(clientList){
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
})