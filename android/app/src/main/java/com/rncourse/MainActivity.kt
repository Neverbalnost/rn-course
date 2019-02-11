package com.rncourse

import android.content.Intent
import com.facebook.react.ReactActivity
import com.facebook.react.ReactApplication

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "RNCourse"
    }

//    override fun onNewIntent(intent: Intent?) {
//        super.onNewIntent(intent)
//
//        val reactNativeHost = (application as ReactApplication).reactNativeHost
//        val notificationModule = reactNativeHost.getNotificationsPackage().notificationModule
//        notificationModule.notifyNewIntent()
//    }
}
