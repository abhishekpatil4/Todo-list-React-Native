import * as Notifications from 'expo-notifications';

// First, set the handler that will cause the notification
// to show the alert

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Second, call the method

export const notify = () => {
    Notifications.scheduleNotificationAsync({
        content: {
            title: 'Task',
            body: "notification body",
        },
        trigger: {
            seconds:10,
        },
    });
}