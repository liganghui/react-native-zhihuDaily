import React, { Component } from "react";
import SplashScreen from 'react-native-splash-screen'
import {Platform } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { Provider, observer } from "mobx-react";
import stores from "./store";
import codePush from "react-native-code-push";
import { Tools} from "./utils";
import "./utils/storage";
import ProgressBarModal from "./componetns/ProgressBarModal";
import JPushModule from "jpush-react-native";
import AppNavigation from "./routers/AppRouter";



/* 
 *   应用根组件 , 负责向 Navigation 挂载重要组件 .
 *      
 *   主要挂载：mobx , 热更新(codepush) , 极光推送 ,启动屏 ,本地存储 ,深连接.
 * 
*/


const prefix = "daily://"; //react-navigation 深连接的URI前缀

@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,//热更新下载进度(百分比)
      progressModalVisible: false, //控制热更新下载弹层显示
      totalPackageSize: null,//热更新下载数据总量
      receivedPackageSize: null//当前下载数据量
    };
  }
  componentDidMount() {
    SplashScreen.hide();//隐藏启动屏
    JPushModule.initPush();//初始化极光推送
    if(Platform.OS==='android'){ 
      // 安卓需要增加 否则点击推送消息无反应
      JPushModule.notifyJSDidLoad((resultCode) => {
      });
    }
    // 推送消息点击事件
    JPushModule.addReceiveOpenNotificationListener((res)=>{
      // 获取额外参数
      let param=JSON.parse(res.extras);
      // ......
    })
  }

  componentWillUnmount() {
    // 移除事件监听
    JPushModule.removeReceiveOpenNotificationListener();
  }


  // 热更新状态
  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        // console.warn("正在检查更新");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // console.warn("开始下载更新");
        this.setState({
          progressModalVisible: true
        });
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({
          progressModalVisible: false
        });
        Tools.toast("正在安装更新...");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        // console.warn("当前为最新包");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // console.warn("已安装更新。");
        break;
    }
  }
  // 热更新下载进度
  codePushDownloadDidProgress(progress) {
    let percentage = parseInt(
      (progress.receivedBytes / progress.totalBytes) * 100
    );
    this.setState({
      progress: percentage,
      totalPackageSize: Number(progress.totalBytes / 1024 / 1024).toFixed(1),
      receivedPackageSize: Number(progress.receivedBytes / 1024 / 1024).toFixed(1)
    });
  }
  render() {
    return (
      
      <Provider {...stores}>
        {/* <Provider> 用于集成 Mobx   <MenuProvider>是弹出菜单组件  此处用于确保遮罩层 层级高于Navigation显示  */}
        <MenuProvider>
           <AppNavigation  uriPrefix={prefix}  screenProps={{ theme: stores.theme.colors.navBackground }}/>
          {/* 下载进度组件 */}
           <ProgressBarModal
            progress={this.state.progress}
            totalPackageSize={this.state.totalPackageSize + "MB"}
            receivedPackageSize={this.state.receivedPackageSize}
            progressModalVisible={this.state.progressModalVisible} 
          />
       </MenuProvider> 
      </Provider>
    );
  }
}

// codePush 热更新配置
const CodePushOptions = {
  updateDialog: {
    //指示是否要将可用版本的描述附加到显示给最终用户的通知消息中。默认为false。
    appendReleaseDescription: false,
    // 表示在向最终用户显示更新通知时，您希望在发布说明前加上字符串（如果有）。默认为" Description: "
    descriptionPrefix: "",
    // 用于最终用户必须按下的按钮的文本，以便安装强制更新。默认为"Continue"。
    mandatoryContinueButtonLabel: "安装",
    // 将更新指定为必需时，用作更新通知正文的文本。默认为"An update is available that must be installed."
    mandatoryUpdateMessage: "重要更新，新版很好用的!",
    // 用于最终用户可以按下的按钮的文本，以便忽略可用的可选更新。默认为"Ignore"
    optionalIgnoreButtonLabel: "拒绝吾儿",
    // 用于最终用户可以按下以便安装可选更新的按钮的文本。默认为"Install"
    optionalInstallButtonLabel: "立即更新",
    //当更新是可选的时，用作更新通知正文的文本。默认为"An update is available. Would you like to install it?"。
    optionalUpdateMessage: "赏脸更新一下吧，新版很好用的!",
    // 用作向最终用户显示的更新通知的标题的文本。默认为"Update available"。
    title: "爸爸，有新版本！"
  },
  // 指定何时安装可选更新（即未标记为必需更新的更新）。默认为codePush.InstallMode.ON_NEXT_RESTART。
  installMode: codePush.InstallMode.IMMEDIATE //表示您要安装更新并立即重新启动应用程序。
};

export default codePush(CodePushOptions)(App);
