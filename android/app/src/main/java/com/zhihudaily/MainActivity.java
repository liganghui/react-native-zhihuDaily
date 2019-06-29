package com.zhihudaily;
import android.os.Bundle;
import android.content.SharedPreferences;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import org.devio.rn.splashscreen.SplashScreen; 
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.taumu.rnDynamicSplash.DynamicSplash;
import com.taumu.rnDynamicSplash.utils.Config;
import java.text.SimpleDateFormat;
import java.util.Date;


public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SharedPreferences setting = getSharedPreferences("FirstLoad", 0);
        Boolean user_first = setting.getBoolean("FIRST", true);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
        String currentDateandTime = sdf.format(new Date());
          if (user_first) {// 第一次则跳转到欢迎页面
              setting.edit().putBoolean("FIRST", false).commit();
              Config splashConfig = new Config(); 
              splashConfig.setImageUrl("http://106.52.75.247:3000/build/daliy.png&date="+currentDateandTime);
              splashConfig.setAutoHide(true);
              splashConfig.setAutoHideTime(0);
              new DynamicSplash(this, splashConfig);
              SplashScreen.show(this);
         } else {
            Config splashConfig = new Config(); 
            splashConfig.setImageUrl("http://106.52.75.247:3000/build/daliy.png&date="+currentDateandTime);
            splashConfig.setDynamicShow(true);
            splashConfig.setAutoHideTime(3500);
            splashConfig.setAutoHide(true);
            new DynamicSplash(this, splashConfig);
         }
        super.onCreate(savedInstanceState);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected  String getMainComponentName() {
        return "zhihuDaily";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
         @Override
         protected ReactRootView createRootView() {
            return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
