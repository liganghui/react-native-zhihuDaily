import React from 'react';
import {Alert} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider, observer} from 'mobx-react';
import stores from './store';
import './utils/storage';
import AppNavigation from './routers/AppRouter';
import RNRestart from 'react-native-restart';
import DeviceInfo from 'react-native-device-info';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {Axios} from './utils';
import RNBootSplash from 'react-native-bootsplash';

// import ProgressBarModal from './componetns/ProgressBarModal';  //下载进度弹层
// import JPushModule from "jpush-react-native";  // 极光推送
// import codePush from "react-native-code-push"; // codePush热更新

/*
 *   应用根组件 , 负责向导航路由(Navigation) 挂载全局组件 , 并导出APP.
 *
 *   主要挂载：mobx , 热更新(codepush) , 极光推送 ,启动屏 ,本地存储 ,深连接 , 错误处理.
 *
 */
const prefix = 'daily://'; //react-navigation 深连接的URI前缀

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
      '系统错误',
      `
        应用发生错误： ${isFatal ? '错误信息:' : ''} ${e.name} ${e.message}
        建议您重启应用.
        `,
      [
        {
          text: '重启应用',
          onPress: () => {
            RNRestart.Restart();
          },
        },
      ],
    );
  } else {
    console.log(e);
  }
};

setJSExceptionHandler(errorHandler);

setNativeExceptionHandler(errorString => {
  //向服务器发送错误日志
  let errInfo = {
    品牌: DeviceInfo.getBrand(),
    应用版本号: DeviceInfo.getReadableVersion(),
    系统版本: DeviceInfo.getSystemVersion(),
    是否为平板电脑: DeviceInfo.isTablet(),
    触发时间: new Date(),
    错误信息: errorString,
  };
  Axios.post('http://106.52.75.247:3000/feedback', {
    title: '知乎日报APP错误日志',
    content: JSON.stringify(errInfo),
  })
    .then(() => {})
    .catch(() => {});
});

@observer
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     progress: 0,//热更新下载进度(百分比)
  //     progressModalVisible: false, //控制热更新下载弹层显示
  //     totalPackageSize: null,//热更新下载数据总量
  //     receivedPackageSize: null//当前下载数据量
  //   };
  // }
  componentDidMount() {
    // JPushModule.initPush(); //初始化极光推送
    // if (Platform.OS === "android") {
    //   // 安卓需要增加 否则点击推送消息无反应
    //   JPushModule.notifyJSDidLoad(resultCode => {});
    // }
    // // 推送消息点击事件
    // JPushModule.addReceiveOpenNotificationListener(res => {
    //   // 获取额外参数
    //   let param = JSON.parse(res.extras);
    //   if(param.link){ //当推送的消息 包含link参数时 ，根据参数打开浏览器窗口
    //     Linking.openURL(param.link )
    //   }
    // });

    // // 隐藏启动屏图片
    RNBootSplash.hide({duration: 250});
  }

  // componentWillUnmount() {
  //   // 移除事件监听
  //   JPushModule.removeReceiveOpenNotificationListener();
  // }

  // 热更新状态
  // codePushStatusDidChange(status) {
  //   switch (status) {
  //     case codePush.SyncStatus.CHECKING_FOR_UPDATE:
  //       // console.warn("正在检查更新");
  //       break;
  //     case codePush.SyncStatus.DOWNLOADING_PACKAGE:
  //       // console.warn("开始下载更新");
  //       this.setState({
  //         progressModalVisible: true
  //       });
  //       break;
  //     case codePush.SyncStatus.INSTALLING_UPDATE:
  //       this.setState({
  //         progressModalVisible: false
  //       });
  //       Tools.toast("正在安装更新...");
  //       break;
  //     case codePush.SyncStatus.UP_TO_DATE:
  //       // console.warn("当前为最新包");
  //       break;
  //     case codePush.SyncStatus.UPDATE_INSTALLED:
  //       // console.warn("已安装更新。");
  //       break;
  //   }
  // }

  // 计算热更新下载进度
  // codePushDownloadDidProgress(progress) {
  //   let percentage = parseInt(
  //     (progress.receivedBytes / progress.totalBytes) * 100
  //   );
  //   this.setState({
  //     progress: percentage,
  //     totalPackageSize: Number(progress.totalBytes / 1024 / 1024).toFixed(1),
  //     receivedPackageSize: Number(progress.receivedBytes / 1024 / 1024).toFixed(1)
  //   });
  // }
  render() {
    return (
      <Provider {...stores}>
        {/* <Provider> 用于集成 Mobx   <MenuProvider>是弹出菜单组件  此处用于确保遮罩层 层级高于Navigation显示  */}
        <MenuProvider>
          <AppNavigation
            uriPrefix={prefix}
            screenProps={{theme: stores.theme.colors.navBackground}}
          />
          {/* 更新下载进度组件 */}
          {/* <ProgressBarModal
            progress={this.state.progress}
            totalPackageSize={this.state.totalPackageSize + "MB"}
            receivedPackageSize={this.state.receivedPackageSize}
            progressModalVisible={this.state.progressModalVisible}
          /> */}
        </MenuProvider>
      </Provider>
    );
  }
}

// codePush 热更新配置
// const CodePushOptions = {
//   updateDialog: {
//     //指示是否要将可用版本的描述附加到显示给最终用户的通知消息中。默认为false。
//     appendReleaseDescription: false,
//     // 表示在向最终用户显示更新通知时，您希望在发布说明前加上字符串（如果有）。默认为" Description: "
//     descriptionPrefix: "",
//     // 用于最终用户必须按下的按钮的文本，以便安装强制更新。默认为"Continue"。
//     mandatoryContinueButtonLabel: "安装",
//     // 将更新指定为必需时，用作更新通知正文的文本。默认为"An update is available that must be installed."
//     mandatoryUpdateMessage: "重要更新，新版很好用的!",
//     // 用于最终用户可以按下的按钮的文本，以便忽略可用的可选更新。默认为"Ignore"
//     optionalIgnoreButtonLabel: "拒绝吾儿",
//     // 用于最终用户可以按下以便安装可选更新的按钮的文本。默认为"Install"
//     optionalInstallButtonLabel: "立即更新",
//     //当更新是可选的时，用作更新通知正文的文本。默认为"An update is available. Would you like to install it?"。
//     optionalUpdateMessage: "赏脸更新一下吧，新版很好用的!",
//     // 用作向最终用户显示的更新通知的标题的文本。默认为"Update available"。
//     title: "爸爸，有新版本！"
//   },
//   // 指定何时安装可选更新（即未标记为必需更新的更新）。默认为codePush.InstallMode.ON_NEXT_RESTART。
//   installMode: codePush.InstallMode.IMMEDIATE //表示您要安装更新并立即重新启动应用程序。
// };

//export default codePush(CodePushOptions)(App);
export default App;
//  react-native-image-crop-picker
