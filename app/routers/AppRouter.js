import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  StackViewTransitionConfigs
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
import SplashScreen from "../pages/SplashScreen";


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
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
      transitionSpec: {
        duration: 300 //动画时间
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
    contentComponent: DrawerScreen
  }
);

//创建应用
// const AppNavigator = createAppContainer(createSwitchNavigator(
//   {
//     Drawer: DrawerNavigator,
//     Splash: SplashScreen,
//   },
//   {
//     initialRouteName: 'Drawer',
//   }

// )); 
const AppNavigator = createAppContainer(DrawerNavigator); 

export default AppNavigator