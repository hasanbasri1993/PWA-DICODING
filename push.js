let webPush = require('web-push');
let vapidKeys = {
    "publicKey": "BBhQpvncq1OvmGneZ_YBlWEI9Iaiugf-MH9THp4uaRLdGScr8Pf9qFzsa5z1widuBXrf81YTIlwY82qSvuEiIj8",
    "privateKey": "rSC1gO4yKfC4Mn9kB9abdMAieMozdplaoTZZUxwG8wc"
};


webPush.setVapidDetails(
    'mailto:hasanbasri1493@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fkOAu0B-vjE:APA91bFok-8mYVXg5aBDaKBRSCnmwZD2q9eywkhUOOeQQa5RyFRzO315XZ8qTzfR7v2B91EqzEJSw6Ic3C4im3iprDz3tuTENnggyguoR6tScXIcjyx4hIpnOYJyp7LKS4sTNyFXKWO8",
    "keys": {
        "p256dh": "BM94EDm7rimCmM/QBkTZPycZIicWbnLx6C2ekhDB1L2PupqiAlyPn2fZmStECI63UaQCPtRP/lN9sZGWBtGcl8I=",
        "auth": "zUoSbaokk3cQew1azJ09xQ=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
let options = {
    gcmAPIKey: '209542127547',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
