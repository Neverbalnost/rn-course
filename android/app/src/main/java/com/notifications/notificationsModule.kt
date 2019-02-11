package com.notifications

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.rncourse.MainActivity

class NotificationsModule(reactContext: ReactApplicationContext? )
    : ReactContextBaseJavaModule(reactContext) {

    val channelId = "com.rncourse.notifications"
    lateinit var notificationManager : NotificationManager;

    override fun getName() : String {
        return "Notifications"
    }

    @ReactMethod
    fun initModule() {
        notificationManager =
                reactApplicationContext.getSystemService(
                        Context.NOTIFICATION_SERVICE
                ) as NotificationManager

        createNotificationChannel (
                channelId,
                "Notifications For React Native",
                "The channel contains notifications"
                )
    }

    private fun createNotificationChannel(id: String, name: String, description: String)

    {
        val importance = NotificationManager.IMPORTANCE_LOW
        val channel = NotificationChannel(id, name, importance)

        channel.description = description
        channel.enableVibration(true)

        notificationManager?.createNotificationChannel(channel)
    }

    @ReactMethod
    fun showNotifications(title: String, message: String, callback: Callback) {

        val notification = Notification.Builder(reactApplicationContext, channelId)
                .setContentTitle(title)
                .setContentText(message)
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setChannelId(channelId)
                .setContentIntent(createPendingIntent())
                .build()

        val notificationId = 1;
        notificationManager?.notify(notificationId, notification)

        callback?.invoke(notificationId)

    }

    private fun createPendingIntent() : PendingIntent {
        val resultIntent = Intent(reactApplicationContext, MainActivity::class.java)

        return PendingIntent.getActivity(
                reactApplicationContext,
                0,
                resultIntent,
                PendingIntent.FLAG_UPDATE_CURRENT
        )
    }

    fun notifyNewIntent() {
        reactApplicationContext
                ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("notificationClicked", null)
    }

}
