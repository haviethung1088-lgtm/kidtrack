/* KidTrack – Service Worker: offline + Web Push */
var V = "kidtrack-v60";
var NOTICE_DB = "kidtrack-notices-v1";
function openNoticeDB() { return new Promise(function(resolve,reject){ var r=indexedDB.open(NOTICE_DB,1); r.onupgradeneeded=function(){if(!r.result.objectStoreNames.contains("items"))r.result.createObjectStore("items",{keyPath:"id"});}; r.onsuccess=function(){resolve(r.result);}; r.onerror=function(){reject(r.error);}; }); }
function updatePushBadge() { return openNoticeDB().then(function(db){return new Promise(function(resolve,reject){var r=db.transaction("items","readonly").objectStore("items").getAll();r.onsuccess=function(){var count=(r.result||[]).filter(function(n){return !n.read;}).length;try{if(count&&self.navigator&&self.navigator.setAppBadge)Promise.resolve(self.navigator.setAppBadge(count)).then(resolve,resolve);else if(!count&&self.navigator&&self.navigator.clearAppBadge)Promise.resolve(self.navigator.clearAppBadge()).then(resolve,resolve);else resolve();}catch(e){resolve();}};r.onerror=function(){reject(r.error);};});}); }function storePushNotice(n) { return openNoticeDB().then(function(db){return new Promise(function(resolve,reject){var r=db.transaction("items","readwrite").objectStore("items").put(n);r.onsuccess=function(){resolve();};r.onerror=function(){reject(r.error);};});}); }
function markPushNoticeRead(id) { if(!id)return Promise.resolve(); return openNoticeDB().then(function(db){return new Promise(function(resolve,reject){var tx=db.transaction("items","readwrite"),s=tx.objectStore("items"),r=s.get(id);r.onsuccess=function(){if(r.result){var n=r.result;n.read=true;s.put(n);} };tx.oncomplete=function(){resolve();};tx.onerror=function(){reject(tx.error);};});}); }
/* Ảnh bài bổ trợ được lưu vào cache khi người dùng mở bài; không tải cả bộ khi cài app. */
var ASSETS = ["./", "index.html", "kidtrack-core.mjs", "firebase-config.js", "push-config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(ASSETS); }).catch(function () {}).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return (k.indexOf("kidtrack-") === 0 || k.indexOf("sohoctap-") === 0) && k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
/* Dùng bản đã lưu trước, tải bản mới ngầm để app mở nhanh khi mạng yếu. */
self.addEventListener("fetch", function (e) {
  var r = e.request;
  var u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== self.location.origin) return;
  /* version.json luôn đi thẳng ra mạng để biết chính xác có bản mới hay không (mất mạng thì báo lỗi, không dùng bản cũ) */
  if (/\/version\.json$/.test(u.pathname)) return;
  function network() {
    return fetch(r).then(function (res) {
      if (res && res.ok) return caches.open(V).then(function (c) { return c.put(r, res.clone()).then(function () { return res; }); });
      return res;
    }).catch(function () { return null; });
  }
  /* cache:reload được dùng chủ động khi app phát hiện bản mới; cập nhật cache trước khi tải lại trang. */
  if (r.cache === "reload") {
    /* Không trả cache cũ trong luồng cập nhật: nếu mạng lỗi, để fetch thất bại để app báo và không tải lại nhầm bản. */
    e.respondWith(fetch(r).then(function (res) {
      if (!res || !res.ok) throw new Error("Update fetch failed");
      return caches.open(V).then(function (c) { return c.put(r, res.clone()).then(function () { return res; }); });
    }));
    return;
  }
  var fresh = network();
  e.respondWith(caches.match(r).then(function (cached) {
    if (cached) return cached;
    return fresh.then(function (res) { return res || caches.match("./"); });
  }));
  e.waitUntil(fresh.then(function () {}));
});

/* Nhận thông báo đẩy từ Worker */
self.addEventListener("push", function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : "" }; }
  var noticeId = "push:" + String(d.id || d.tag || Date.now());
  var item = { id: noticeId, type: "push", title: d.title || "KidTrack", body: d.body || "", created: Date.now(), read: false, url: d.url || "./" };
  e.waitUntil(Promise.all([
    storePushNotice(item).then(updatePushBadge).catch(function () {}),
    self.registration.showNotification(item.title, { body: item.body, tag: d.tag || noticeId, icon: "apple-touch-icon.png", badge: "apple-touch-icon.png", data: { url: item.url, noticeId: noticeId } })
  ]).then(function () { return self.clients.matchAll({ type: "window", includeUncontrolled: true }); }).then(function (cs) { cs.forEach(function (c) { c.postMessage({ type: "kidtrack-notice-updated" }); }); }));
});self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  var data = e.notification.data || {}, id = data.noticeId;
  var u = new URL(data.url || "./", self.registration.scope).href;
  e.waitUntil(Promise.all([
    markPushNoticeRead(id).then(updatePushBadge).catch(function () {}),
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
      for (var i = 0; i < cs.length; i++) if ("focus" in cs[i]) { cs[i].postMessage({ type: "kidtrack-notice-updated" }); return cs[i].focus(); }
      return self.clients.openWindow(u);
    })
  ]));
});
