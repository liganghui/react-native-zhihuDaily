/*
 * @Author: liganghui
 * @Date: 2019-10-26 10:09:31
 * @LastEditTime: 2019-11-05 14:16:03
 * @Description: 增加 react-native-bootsplash 配置信息
 */
package com.zhihudaily;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash;
import com.taumu.rnDynamicSplash.DynamicSplash;
import com.taumu.rnDynamicSplash.utils.Config;
import java.text.SimpleDateFormat;
import java.util.Date;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "zhihuDaily";
  }
   @Override
  protected void onCreate(Bundle savedInstanceState) {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
      String currentDateandTime = sdf.format(new Date());
      Config splashConfig = new Config();  // Splash configuration class
      splashConfig.setImageUrl("http://106.52.75.247:3000/build/daliy.png&date="+currentDateandTime);
      splashConfig.setAutoHide(true);
      new DynamicSplash(this, splashConfig);  // Add display splash here
      super.onCreate(savedInstanceState);
    // RNBootSplash.show(R.drawable.bootsplash, MainActivity.this);  <- display the "bootsplash" xml view over our MainActivity
  }
}
