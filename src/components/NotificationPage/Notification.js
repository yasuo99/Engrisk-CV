import PushNotification from "react-native-push-notification";

class Notification {
    configure = () => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
              console.log("TOKEN:", token);
            },
          
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
              console.log("NOTIFICATION:", notification);
           },
           // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
              console.log("ACTION:", notification.action);
              console.log("NOTIFICATION:", notification);
          
              // process the action
            },
            onRegistrationError: function(err) {
              console.error(err.message, err);
            },
            permissions: {
              alert: true,
              badge: true,
              sound: true,
            },
            popInitialNotification: true,
          
            requestPermissions: true,
            requestPermissions: Platform.OS === 'ios'
          });
    }
    buatChannel = (channel) => {
        PushNotification.createChannel(
            {
              channelId: channel, // (required)
              channelName: "My channel", // (required)
              channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
              playSound: false, // (optional) default: true
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              importance: 4, // (optional) default: 4. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          );
    }
    kirimNotifikasi = (channel,judul,date,pesan) => {
        PushNotification.localNotification({
            channelId: channel, // 
            title: judul, // (optional)
            date: date,
            message: pesan, // (required)
        });
    }

    kirimNotifikasiJadwal = (channel,judul,date,pesan) => {
        PushNotification.localNotificationSchedule({
            channelId:channel,
            message: pesan, // (required)
            // date: new Date(Date.now() + (5 * 1000)), // in 60 secs
            date: date,
            title:judul,
          });
    }
}

export const notification = new Notification();