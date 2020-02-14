---
layout: projects
title: How to make your app work offline with the power of JavaScript
date: 2020-02-02T12:17:19.363Z
thumbnail: /api/medias/1_jRhKpS-07YTKIH6g-xJnbQ.jpeg
---


In today’s world, connectivity has made us more mobile than ever which (paradoxically) cause us to be offline sometimes: when we’re in airplane mode, have a bad connection, have no more data, are on the subway…and so on.

A second effect of this mobility is the slow loading of heavy websites: Amazon found that just[100 milliseconds of extra load time cost them 1% of sales](https://www.forbes.com/sites/steveolenski/2016/11/10/why-brands-are-fighting-over-milliseconds/).

In these situations, we would like to have offline access to our content. That’s why tools like[Instapaper](https://www.instapaper.com/)and[Pocket](https://getpocket.com/)exist.[Spotify](https://support.spotify.com/us/listen_everywhere/on_phone_tablet_desktop/listen-offline/)and[Netflix](https://techcrunch.com/2016/11/30/netflix-adds-offline-viewing-for-smartphones-and-tablets/)also allow you to download media for offline use.

We can easily see there is a demand for this feature and how it can benefit your business.

**It is time for the web to go offline.**

Luckily we don’t need to build native apps to achieve this goal anymore. We can create an offline website with the power of JavaScript thanks to the new**service workers**and**Cache API**features.

### What is a service Worker (SW)?

Service workers are JavaScript code that runs in the background of your website, even when the page is closed. For offline uses, one of their goals is to store network requests or images in the browser cache.

The agency BETC made a demo website called[whentheinternetisdown.com](https://whentheinternetisdown.com/)for the french telecom company Bouygues. It only works offline and feels kind of magical. Go try it out :)

> *It’s the caching that makes the magic of the site: you can come back in 3 weeks, 1 month, 1 year, still without a connection, and access all the content. — Maxime Huygue, Head of BETC Digital Studio*

**Ok this is cool, tell me how to do it then.**

Ok, let’s begin with some prerequisites:

* In order to use SWs, you must enable https on your website.
* You should have decent comprehension of how[JavaScript promises](https://scotch.io/tutorials/javascript-promises-for-dummies)work.
* SWs works in all[modern browsers](https://caniuse.com/#feat=serviceworkers)except our friend IE.
* Even if it’s JavaScript, they run in the context of[web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). Which means: no DOM, and run outside of the main thread.
* Understand how databases operate.
* The code of your service worker needs to be in a separate JavaScript file. Example: service-worker.js

### Service workers lifecycle

![](https://cdn-media-1.freecodecamp.org/images/0*kwQX495DA0fAv3QZ.png)

To be able to work, SWs must be registered within your application, then installed. You should check if SWs are compatible with your client before doing so.

#### **1) Registration**

If available, register your SW file. It will return a promise, so you can handle errors. You can also specify a scope of urls in the[registration options](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register).

#### **2) Installation**

**Service workers are event-based.**Briefly, you have to attach callbacks to events, as you would do with an[element.addEventListener](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener). The first event you need to use is the install event. This is a good time to cache all your vital resources as Javascript, CSS, HTML, Images… This is where the[Cache API](https://developer.mozilla.org/fr/docs/Web/API/Cache)joins the party!

Then open the method or create a cache linked to a desired name. The returned promise needs to be wrapped into event.waitUntil(), which will delay the installation of the service worker until the promise is resolved. Otherwise, the install event fails and the service worker will be discarded.

Please be cautious with caching: your user’s storage is precious, so don’t abuse it. Also, be careful: the install event can only be called once, and you’ll need to update your SW to modify it.

#### **3) Activation**

This one is a bit subtle.

Once the installation has completed, the service worker isn’t active yet: we are in the installed state.

In this state, it waits to take control of the page. It then moves on to the next phase in the lifecycle, which is the activation phase.

The activation phase is handy when you update a SW. The most common case is to clear the cache of the previous SW installed.

Please note that, once successfully installed, the updated worker will wait until the existing worker is controlling zero clients (clients overlap during a refresh).

self.skipWaiting() prevents the waiting, meaning the service worker activates as soon as it’s finished installing. The advantage of this method is that you can receive fetch events faster.

It doesn’t really matter when you call skipWaiting(), as long as it’s during or before waiting. It’s pretty common to call it in the install event.

**Phew! Let’s take a break and sum up what we’ve seen:**

* Service workers are pieces of JavaScript that enable offline features such as caching.
* We explored the SW Lifecycle: registration, installation, activation
* We learned how to implement common uses cases such as: caching resources and clearing caches with the Cache API.
* We saw that self.skipWaiting and self.clients.claim allow us to activate SWs faster in order to catch events faster.

Ok moving right along…

#### **4) Fetch**

The fetch event allows us to intercept network requests and store responses or customize them.

The main advantage of this hook is to return the cached resources instead of making a request call. You should take a look at the[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)for handling your request calls.

We can’t cover all the possibilities offered by service workers in one article. Still, I encourage you to look into what’s possible:[Custom 404](https://gohugohq.com/howto/go-offline-with-service-worker/),[Background Sync API for offline analytics](https://developers.google.com/web/updates/2016/07/offline-google-analytics),[ServiceWorker-side templating](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#serviceworker-side-templating)…. the future looks exciting!

So far we’ve seen what a service worker is, how it works through its lifecycle, and the most common use cases by playing with Cache and Fetch API. Those two APIs give us a whole new way of managing**URL addressable resources**in the browser. To complete this guide, let see how we can store other types of data, for example a user’s[JSON](https://en.wikipedia.org/wiki/JSON)from your database.

### Store custom data with IndexedDB

*A general guideline for data storage is that URL addressable resources should be stored with the[Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache)interface, and other data should be stored with[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). For example HTML, CSS, and JS files should be stored in the cache, while JSON data should be stored in IndexedDB. Note that this is only a guideline, not a firm rule. ([source](https://developers.google.com/web/ilt/pwa/live-data-in-the-service-worker))*

In short, we will see**when you shouldn’t use Cache API**but[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)instead. Both are asynchronous and accessible in service workers, web workers, and the[window interface](https://developer.mozilla.org/fr/docs/Web/API/Window). The good news is that[it is well supported](https://caniuse.com/#feat=indexeddb), even in recent versions of IE.

IndexedDB is a NoSQL database. IndexedDB data are stored as key-value pairs in**object stores**rather than tables. A single database can contain any number of object stores. Whenever a value is stored in an object store, it is associated with a key. It looks like this:

![](https://cdn-media-1.freecodecamp.org/images/1*6ES2yg8KcJaEpi_nAv31yA.png)

Pretty classic, right? The main thing to understand is the concept of[key path](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB#gloss_keypath). It tells the browser which key to use to extract data from in the object store or index.

In this example, we can see that our key path is the property id, and it is defined in line 10. Then we return all the items from the database. This is a very basic use case, so if you want to learn more about how IndexedDB works, I advise you to read this excellent[article](https://itnext.io/getting-started-with-persistent-offline-storage-with-indexeddb-1af66727246c).

### Conclusion

Taking advantage of the offline web is great for the user experience, and some companies have started to take loot at it. It mostly relies on service workers, JavaScript scripts that run in the background of your website.

We’ve seen how to use them trough the service worker lifecycle and what you can do by using the Cache and Fetch API. The possibilities are almost limitless. so be creative and not too greedy on the device storage.

You can even use databases offline: that what’s IndexedDB is made for. These offline capabilities certainly are part of the future of the web, so it plays well with the new type of websites that Google are creating: Progressive Web Apps.

### Further reading:

* The Offline Cookbook:<https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/>
* PWA and offline:<https://developers.google.com/web/ilt/pwa/lab-offline-quickstart>
* Lab: Caching Files with Service Worker:<https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker>
* The Service Worker Lifecycle:<https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle>
* Demystifying The Service Worker Lifecycle:<https://scotch.io/tutorials/demystifying-the-service-worker-lifecycle>
* Activate Service Workers Faster:<https://davidwalsh.name/service-worker-claim>
* Live Data in the Service Worker:<https://developers.google.com/web/ilt/pwa/live-data-in-the-service-worker>
* IndexedDBBasic concepts:<https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB>
* Getting Started with Persistent Offline Storage with IndexedDB:<https://itnext.io/getting-started-with-persistent-offline-storage-with-indexeddb-1af66727246c>
