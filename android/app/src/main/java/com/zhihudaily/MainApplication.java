package com.zhihudaily;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.taumu.rnDynamicSplash.DynamicSplashReactPackage;
import com.microsoft.codepush.react.CodePush;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import cl.json.RNSharePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import cn.jpush.reactnativejpush.JPushPackage; 

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
 // 设置为 true 将不会弹出 toast
    private boolean SHUTDOWN_TOAST = true;
    // 设置为 true 将不会打印 log
    private boolean SHUTDOWN_LOG = true;
        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeRestartPackage(),
            new ReactNativeExceptionHandlerPackage(),
            new DynamicSplashReactPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new SplashScreenReactPackage(),
            new RNCardViewPackage(),
            new RNCWebViewPackage(),
            new RNFetchBlobPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new NetInfoPackage(),
            new AsyncStoragePackage(),
            new RNSharePackage(),
            new VectorIconsPackage(),
            new RNDeviceInfo()
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
