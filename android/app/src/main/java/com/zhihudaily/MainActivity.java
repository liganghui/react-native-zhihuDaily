/*
 * @Author: liganghui
 * @Date: 2019-10-26 10:09:31
 * @LastEditTime: 2019-10-26 16:20:40
 * @Description: 增加 react-native-bootsplash 配置信息
 */
package com.zhihudaily;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash;
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
    super.onCreate(savedInstanceState);
    RNBootSplash.show(R.drawable.bootsplash, MainActivity.this); // <- display the "bootsplash" xml view over our MainActivity
  }
}
