## RN版知乎日报

 react-native 知乎日报的简化版分支 , 在开发版本基础上移除无用功能 .

>### 扫码下载(Android)

<img src='https://github.com/liganghui/react-native-zhihuDaily/blob/simple/doc/qrCode.png'/>

>### 为什么没有IOS版本?
  
  因为IOS版本需要使用苹果电脑才可以生成 , 作者没有啊.


<br/>

> ### 打包IOS面临的问题
  
  打包IOS版本很可能会存在不少问题 , 主要问题点应该是开源组件配置问题 ，因为有些组件的IOS配置Windows下无法完成.
  功能代码都是通用的应该不会存在大问题.

  已知缺少IOS配置的依赖:

1. 热更新  (codePush)
2. 极光推送 (jpush-react-native)
<br/>
> ### 待办项 

- [ ] 使用最新react-native版本 重构依赖项 
