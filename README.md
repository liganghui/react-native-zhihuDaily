<!--
 * @Author: liganghui
 * @Date: 2019-10-28 10:45:03
 * @LastEditTime: 2019-10-28 12:40:34
 * @Description: 
 -->

## RN版知乎日报

知乎日报的 react-native 版本 , 用于日常使用和开发学习.      



> 主要涉及的功能点  :

     轮播图    日期选择器   主题化    热更新(codePush)   登录流程  图片保存  图像查看器  WebView集成   启动屏

     极光推送    Mobx集成    头像图片拍摄和裁切   消息推送与深连接  离线数据缓存
<br/>



> #### 运行  

    react-native run-android  或者  react-native run-ios
    注 :  IOS 版本未经测试 , 请先尝试Android版本
    
> 参考文档

1. [项目概况](https://www.jianshu.com/p/8d7e6dd3c152)

2. [技术选型](https://www.jianshu.com/p/80ee11c12f53)

3. [目录结构与文件说明](https://www.jianshu.com/p/4cfc92ef0a30)

4. [页面功能实现](https://www.jianshu.com/p/0383c2e20bcf)

>  IOS插件配置

  由于缺少IOS开发环境 , 此App没有在IOS环境下的运行过 . 建议先尝试运行Android版本 , 如要运行IOS版本 ,请先解决以下问题 .

  
  1.  [react-native-image-crop-picker(图像选取器)](https://github.com/ivpusic/react-native-image-crop-picker) 需要手动配置 , 请参考文档增加 ios 的配置 .

  2. [react-native-bootsplash(启动屏)](https://github.com/zoontek/react-native-bootsplash)  需要手动配置 , 请参考文档增加 ios 的配置 .
  
  3. [react-native-vector-icons(图标库)](https://github.com/oblador/react-native-vector-icons)  需要手动配置 , 请参考文档增加 ios 的配置 .
  4. 为应用更换IOS的图标和名称 (可选)


  > 极光推送与热更新功能(CodePush)

  App 默认注释这两项功能的代码 , 如果开启请参考对应的插件文档 , 增加依赖性并配置Key值 .
   

>  演示   

<img  width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-d5cbb25e1fae5efa.gif?imageMogr2/auto-orient/strip"/> <img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-6dad2aa89481e4cb.gif?imageMogr2/auto-orient/strip"/><img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-31c7c8ea52162c36.gif?imageMogr2/auto-orient/strip"/><img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-0bdba4e3ee275440.gif?imageMogr2/auto-orient/strip"/><img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-88fe4383128547a8.gif?imageMogr2/auto-orient/strip"/><img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-aa471f6aa4c72116.gif?imageMogr2/auto-orient/strip"/>      

<br/>
<br/>

> 下载

 [Android版本](https://rink.hockeyapp.net/api/2/apps/5cf4cc3667854feb8088434dd7fc6715/app_versions/7?format=apk&avtoken=dffd76161bee2381ca74bfcd121332eed2f47da6&download_origin=hockeyapp&mctoken=df01a976859e617ab19e2e2cd1031e4efc933b83)    

> 更新记录 

 2019/10/28

 1. 升级项目版本到RN v0.61.2 &&   所有第三方依赖更新至最新版本 .
 2. 适配 react-navigation V4.0+
 3. 将启动屏组件更换为react-native-bootsplash
