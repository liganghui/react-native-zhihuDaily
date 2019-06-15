## RN版知乎日报

知乎日报的 react-native 版本 , 用于日常使用和项目练习.   

<br/>


> ### 运行

  
  
     react-native run-android
  >>由于缺少IOS开发环境 , 无法确定IOS存在的问题 , 所以暂时只支持安卓运行 .  
 

<br/>
<br/>

> ### 演示

<img  width="270" height="480" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/gif/1.gif"/> <img width="270" height="480" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/gif/2.gif"/><img width="270" height="480" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/gif/3.gif"/><img width="270" height="480" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/gif/4.gif"/><img width="270" height="480" src="https://raw.githubusercontent.com/liganghui/react-native-zhihuDaily/master/doc/gif/5.gif"/>
<br/>
<br/>

> ### 功能
   - 轮播图
   - 日期选择器
   - 主题化
   - 热更新(codePush)
   - 登录流程
   - 图片保存
   - 图像查看器
   - WebView集成
   - 启动屏
   - 极光推送
   - Mobx集成
   - 头像拍摄和裁切
   - 深连接
   
<br/>

> ### 待办项 

- [ ] IOS适配 
- [ ] 适配iPhoneX和安卓异形屏  
<br/>

>  ### 目录结构
```
├─assets 资源文件夹
│  ├─images  图像资源
│  └─video   视频文件
├─componetns  组件文件夹
│  ├─AvatarPicker  头像选择
│  ├─Bar   进度条
│  ├─CountDownButton  倒计时按钮
│  ├─ProgressBarModal  下载进度弹层
│  ├─PullUpLoading  下拉加载
│  ├─ScrollView    集成上拉刷新和下拉加载的ScrollView
│  └─StoriesList 公共日报列表
├─pages  页面文件夹
│  ├─Comment 评论页
│  ├─Details 详情页
│  ├─Drawer  侧边栏
│  ├─Home    首页
│  ├─ImgView 图像缩放下载
│  ├─Login    登录
│  ├─Registered 注册
│  ├─Section  栏目
│  └─Setting  设置
├─routers  路由文件夹
│ └─AppRouter.js APP主路由
├─store 状态管理仓库文件夹
│  ├─index.js 导出Store
│  └─ThemeStore.js 主题Store
├─theme  主题文件夹
│  ├─ blackTheme.js 夜间主题配色 
│  └─ defaultTheme.js 默认主题配色
├─utils 工具和配置文件夹
│  ├─ api.js  API配置文件
│  ├─ axios.js Axios配置文件
│  ├─ fontSize.js 字体缩放适配
│  ├─ index.js  统一导出各工具组件
│  ├─ storage.js  本地存储初始化配置文件
│  ├─ strageSync.js 本地存储同步远程数据函数
|  ├─ system.js   获取系统信息
|  └─ tools.js 工具函数 
|   
|_ App.js  应用根节点 

```

> ### [组件文档](https://github.com/liganghui/react-native-zhihuDaily/blob/master/doc/%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.md)
