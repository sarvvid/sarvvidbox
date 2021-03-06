import React, {Component} from "react";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, {Importance} from "react-native-push-notification";
// var PushNotification = require("react-native-push-notification");

export default class PushController extends Component{
    componentDidMount(){
       

    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // (required)
        channelName: `Default channel`, // (required)
        channelDescription: "A default channel", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.createChannel(
      {
        channelId: "sound-channel-id", // (required)
        channelName: `Sound channel`, // (required)
        channelDescription: "A sound channel", // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel 'sound-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
   
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
              console.log("TOKEN:", token);
            },
          
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);
              PushNotification.localNotification({
                channelId: 'default-channel-id',
                ticker: 'My Notification Ticker', // (optional)
                autoCancel: false, // (optional) default: true
                largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                 // (optional) default: "message" prop
                subText: 'Decentralised Network', // (optional) default: none
                 // (optional) default: system default
                vibrate: true, // (optional) default: true
                vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                tag: 'some_tag', // (optional) add tag to message
                group: 'group', // (optional) add group to message
                groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
                ongoing: false, // (optional) set whether this is an "ongoing" notification
                actions: ['Open'], // (Android only) See the doc for notification actions to know more
                invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
          
                when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
                usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
                timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
          
                /* iOS only properties */
                category: '', // (optional) default: empty string
              // (optional) smaller title below notification title
          
                /* iOS and Android properties */
             // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                title: notification.title, // (optional)
                message: notification.message, // (required)
                userInfo: { screen: 'home' }, // (optional) default: {} (using null throws a JSON value '<null>' error) // (optional) default: true
                soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                number: 10, 
              });
          
              // process the notification here
          
              // required on iOS only 
            //   notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // Android only
            senderID: "1090501687137",
            // iOS only
            permissions: {
              alert: true,
              badge: true,
              sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
          });
    }

    render(){
        return null;
    }
}