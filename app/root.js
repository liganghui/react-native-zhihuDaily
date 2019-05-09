import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import  {DeviceEventEmitter} from 'react-native';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import HomeScreen from "./pages/Home";
import DetailsScreen from "./pages/Details";
import DrawerScreen from "./pages/Drawer";
import ImgScreen from "./pages/ImgView";
import SectionScreen from "./pages/Section";
import CommentScreen from "./pages/Comment";
import TestScreen from "./pages/Test";
import LoginScreen from "./pages/Login";
import  SignInScreen from "./pages/Login/SignIn";
import  RegisteredScreen from "./pages/Registered";
import  JoinScreen from "./pages/Registered/Join";
import  SettingScreen from "./pages/Setting";
import { MenuProvider } from "react-native-popup-menu";
import "./config/storage";

/*
 *   构建导航
 *
 *   导航结构 ：
 *      >Drawer
 *      >Home
 *          >>Details
 *          >>....
 *
 */
// 二级导航
const MainScreen = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: DetailsScreen
    },
    ImgView: {
      screen: ImgScreen
    },
    Test: {
      screen: TestScreen
    },
    Section: {
      screen: SectionScreen
    },
    Comment: {
      screen: CommentScreen
    },
    Login:{
      screen:LoginScreen
    },
    SignIn: {
      screen: SignInScreen
    },
    Registered:{
      screen: RegisteredScreen
    },
    Join:{
      screen: JoinScreen
    },
    Setting:{
      screen: SettingScreen
    },
  },
  {
    // 设置header默认样式
    defaultNavigationOptions: {
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
        duration: 280
      }
    })
  }
);

MainScreen.navigationOptions = ({ navigation }) => {
  let drawerLockMode = "unlocked";
  if (navigation.state.index > 0) {
    drawerLockMode = "locked-closed";
  }
  return {
    drawerLockMode
  };
};

//  根节点抽屉导航
const AppNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainScreen
    },
    Drawer: {
      screen: DrawerScreen
    },

  },
  {
    contentComponent: DrawerScreen
  }
);


const defaultGetStateForAction = AppNavigator.router.getStateForAction;

AppNavigator.router.getStateForAction = (action, state) => {

    if(action){
        if(action.type == 'Navigation/MARK_DRAWER_SETTLING' && action.willShow){ 
          //Drawer is open
          DeviceEventEmitter.emit('drawerState',{
            focus:true
          })
        } else if(action.type == 'Navigation/MARK_DRAWER_SETTLING' && !action.willShow) {
          // Drawer is close
          // DeviceEventEmitter.emit('drawerState',{
          //   focus:false
          // })
        }
    }

    return defaultGetStateForAction(action, state);
};


let Navigation = createAppContainer(AppNavigator);

// let Navigation = createAppContainer(
//   createSwitchNavigator(
//     {
//       App: AppNavigator,
//       Login: LoginScreen
//     },
//     {
//       initialRouteName: "App"
//     }
//   )
// );
export default class App extends React.Component {
  render() {
    return (
      <MenuProvider>
        <Navigation />
      </MenuProvider>
    );
  }
}
