package com.zhihudaily;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.react.rnspinkit.RNSpinkitPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.taumu.rnDynamicSplash.DynamicSplashReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSpinkitPackage(),
            new ReactVideoPackage(),
            new ImagePickerPackage(),
            new PickerPackage(),
            new AndroidOpenSettingsPackage(),
            new RNFetchBlobPackage(),
            new RNCWebViewPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new RNSharePackage(),
            new ReactNativeRestartPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new ReactNativeExceptionHandlerPackage(),
            new DynamicSplashReactPackage(),
            new RNDeviceInfo(),
            new RNCardViewPackage(),
            new NetInfoPackage(),
            new AsyncStoragePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
