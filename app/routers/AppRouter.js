import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import HomeScreen from "../pages/Home";
import DetailsScreen from "../pages/Details";
import ImgScreen from "../pages/ImgView";
import SectionScreen from "../pages/Section";
import CommentScreen from "../pages/Comment";
import SettingScreen from "../pages/Setting";
import AboutScreen from "../pages/About";


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
    Setting: {
      screen: SettingScreen,
      path: "setting" //路径地址
    }
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
        duration: 300 //动画时间
      }
    })
  }
);


//创建应用
const AppNavigator = createAppContainer(MainScreen); 

export default AppNavigator