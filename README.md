## RN版知乎日报

知乎日报的 react-native 版本 , 用于日常使用和项目练习.    
<br/>


> ### 安装

    yarn  或者  npm install
     

> ### 运行  
     react-native run-android  或者 react-native run-ios
   
 
> 运行前的修改

 由于  ```react-native-snap-carousel v3.8.0``` 中 ,  firstItem属性 存在问题 , 社区已给出解决方案 , 但还未同步到npm中  需要手动修改```node_modules```下的文件. 
   修改内容 :  [点击此处]( https://github.com/rtalwork/react-native-snap-carousel/commit/73261bbae26e753bb3c3c37bcd03dc8d35919fe1)
         [社区讨论]( https://github.com/archriss/react-native-snap-carousel/issues/538)
         
> IOS版本存在的问题

  由于我缺少IOS开发环境 , App没有在IOS环境下的测试过 . 建议先尝试运行Android版本 , 如要运行IOS版本 ,请先解决以下问题 .

  
  1.  [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker) 需要手动配置 , 请参考文档增加 ios 的配置 .

  2. [react-native-splash-screen(启动图)](https://github.com/crazycodeboy/react-native-splash-screen)  需要手动配置 , 请参考文档增加 ios 的配置 .

  3. 为应用更换IOS的图标和名称 (可选)
  
  > 极光推送与热更新功能(CodePush)

  代码包含 极光推送 和 CodePush热更新功能代码 , 但没有增加相关功能的依赖项配置 . 
  
  如要开启这两功能  请参考相关文档 , 配置依赖项与Key . 


<br/>
<br/>


> ### 演示

<img  width="270" height="480" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/gif/1.gif"/> <img width="270" height="480" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/gif/2.gif"/><img width="270" height="480" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/gif/4.gif"/><img width="270" height="480" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/gif/5.gif"/>
<br/>
<br/>



<!-- > ### 下载演示(Anroid)

 <img  width="210" height="210" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/qrCode.png"/>
<br/>
<br/>
 -->


> 

