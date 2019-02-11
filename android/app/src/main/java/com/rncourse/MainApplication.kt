package com.rncourse

import android.app.Application

import com.facebook.react.ReactApplication
import com.oblador.vectoricons.VectorIconsPackage
import com.airbnb.android.react.maps.MapsPackage
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage
import com.airbnb.android.react.lottie.LottiePackage
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader
import com.notifications.NotificationsPackage

import java.util.Arrays

class MainApplication : Application(), ReactApplication {

    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            return Arrays.asList(
                    MainReactPackage(),
                    NotificationsPackage(),
                    VectorIconsPackage(),
                    MapsPackage(),
                    RNGestureHandlerPackage(),
                    LottiePackage()
            )
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun onCreate() {
        setTheme(R.style.AppTheme)
        super.onCreate()
        SoLoader.init(this, /* native exopackage */ false)
    }
}
