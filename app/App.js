import React, { Component } from "react";
import { Platform,Alert,Linking } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { Provider, observer } from "mobx-react";
import stores from "./store";
import codePush from "react-native-code-push";
import "./utils/storage";
import SplashScreen from "react-native-splash-screen";
import JPushModule from "jpush-react-native";
import AppNavigation from "./routers/AppRouter";
import RNRestart from 'react-native-restart';
import {setJSExceptionHandler,setNativeExceptionHandler} from 'react-native-exception-handler';
/*
 *   应用根组件 , 负责向导航路由(Navigation) 挂载全局组件 , 并导出APP.
 *
 *   主要挂载：mobx , 热更新(codepush) , 极光推送 ,启动屏 ,本地存储 ,深连接 , 错误处理.
 *
 */


const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
        '系统异常',
        `
        应用发生致命错误： ${(isFatal) ? '错误信息:' : ''} ${e.name} ${e.message}
        建议您重启应用.
        `,
      [{
        text: '重启应用',
        onPress: () => {
          RNRestart.Restart();
        }
      }]
    );
  } else {
    console.log(e); 
  }
};

setJSExceptionHandler(errorHandler);

setNativeExceptionHandler((errorString) => {
  // TODO 向服务器发送错误日志
});




const prefix = "daily://"; //react-navigation 深连接的URI前缀

@observer
class App extends React.Component {
  componentDidMount() {
    JPushModule.initPush(); //初始化极光推送
    if (Platform.OS === "android") {
      // 安卓需要增加 否则点击推送消息无反应
      JPushModule.notifyJSDidLoad(resultCode => {});
    }
    // 推送消息点击事件
    JPushModule.addReceiveOpenNotificationListener(res => {
      // 获取额外参数
      let param = JSON.parse(res.extras);
      if(param.link){
        Linking.openURL(param.link )
      }
      // ......
    });
    SplashScreen.hide();
  }

  componentWillUnmount() {
    // 移除事件监听
    JPushModule.removeReceiveOpenNotificationListener();
  }
  render() {
    return (
      <Provider {...stores}>
        {/* <Provider> 用于集成 Mobx   <MenuProvider>是弹出菜单组件  此处用于确保遮罩层 层级高于Navigation显示  */}
        <MenuProvider>
          <AppNavigation
            uriPrefix={prefix}
            screenProps={{ theme: stores.theme.colors.navBackground }}
          />
        </MenuProvider>
      </Provider>
    );
  }
}

export default codePush(App);
