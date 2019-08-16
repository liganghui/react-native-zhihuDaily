import {  DeviceEventEmitter } from "react-native";
import {
  createStackNavigator,
  createAppContainer, 
  createDrawerNavigator,
} from "react-navigation";
import StackViewStyleInterpolator from 'react-navigation-stack/lib/module/views/StackView/StackViewStyleInterpolator'
import HomeScreen from "../pages/Home";
import DetailsScreen from "../pages/Details";
import ImgScreen from "../pages/ImgView";
import SectionScreen from "../pages/Section";
import CommentScreen from "../pages/Comment";
import DrawerScreen from "../pages/Drawer";
import SettingScreen from "../pages/Setting";
import AboutScreen from "../pages/About";
import FeedbackScreen from "../pages/Feedback";
import LoginScreen from "../pages/Login";
import SignInScreen from "../pages/Login/SignIn";
import RegisteredScreen from "../pages/Registered";
import JoinScreen from "../pages/Registered/Join";
import stores from "../store";


/*
 *   构建导航
 *
 *   导航结构 ：
 *      >Home   (首页)
 *          >>Details (详情页)
 *          >>Comment (评论页)
 *          >>....
 *
 */

// 二级导航
const MainScreen = createStackNavigator(
  {
    Home: HomeScreen,
    Details: {
      screen: DetailsScreen,
      path: "details/:id" //定义路径地址,用于路由深连接 id为参数
      //传参示例 daily://details/3892357
    },
    ImgView: ImgScreen,
    Section: SectionScreen,
    Comment: CommentScreen,
    About:AboutScreen,
    Feedback:FeedbackScreen,
    Login: LoginScreen,
    SignIn: SignInScreen,
    Registered: RegisteredScreen,
    Join: JoinScreen,
    Setting: {
      screen: SettingScreen,
      path: "setting" //路径地址
    }
  },
  {
    // 设置header默认样式
    defaultNavigationOptions: {
      gesturesEnabled:true,
      headerStyle: {
        backgroundColor: "#00a2ed"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontSize: 16
      }
    },
      // 设置转场动画效果（安卓实现类似iOS的push动画)    来源： https://www.jianshu.com/p/dc9df5826651
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
      transitionSpec: {
        duration: 280 //动画时间
      }
    })
  }
);

/*
 * 处理抽屉的锁定模式
 * 当页面层级大于一时 ,抽屉将关闭，意味着抽屉将保持关闭而不响应右滑打开手势。
 */
MainScreen.navigationOptions = ({ navigation }) => {
  let drawerLockMode = "unlocked";
  if (navigation.state.index > 0) {
    drawerLockMode = "locked-closed";
  }
  return {
    drawerLockMode
  };
};

/*
 * 抽屉导航
 */
const DrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainScreen,
      path: "main" //路径地址
    },
    Drawer: {
      screen: DrawerScreen
    }
  },
  {
    initialRouteName:'Main',
    contentComponent: DrawerScreen
  }
);


/*
 *  监听抽屉是否获得焦点  触发自定义事件
 */
const defaultGetStateForAction = DrawerNavigator.router.getStateForAction;
DrawerNavigator.router.getStateForAction = (action, state) => {
  if (action) {
    if (action.type == "Navigation/MARK_DRAWER_SETTLING" && action.willShow) {
      //Drawer 获得焦点显示
      DeviceEventEmitter.emit("drawerState", {
        focus: true
      });
      stores.app.isDrawerOpen=true;
    } else if (
      action.type == "Navigation/MARK_DRAWER_SETTLING" &&
      !action.willShow
    ) {
      //  Drawer 关闭
      stores.app.isDrawerOpen=false;
    }
  }
  return defaultGetStateForAction(action, state);
};




const AppNavigator = createAppContainer(DrawerNavigator); 

export default AppNavigator