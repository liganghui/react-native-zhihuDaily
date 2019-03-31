//  日报详情页
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Linking,
  InteractionManager
} from "react-native";
import { Icon } from "react-native-elements";
import AutoHeightWebView from "react-native-autoheight-webview";
import LinearGradient from "react-native-linear-gradient";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { Tools } from "../../config";

const IMG_MAX_HEIGHT = 200;
const HEAD_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 0;
// 记录当前Header高度
var tempHeight = HEAD_HEIGHT;
// 记录Y轴坐标
var offsetY;
export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTransparent: true,
      headerStyle: {
        overflow: "hidden",
        height: params.height ? params.height : HEAD_HEIGHT,
        backgroundColor: "#00a2ed",
        opacity: params.opacity
      }
    };
  };
  constructor(props) {
    super(props);
    let id = this.props.navigation.getParam("itemId");
    this.scrollY = new Animated.Value(0);
    // 记录Y轴滚动坐标 用户计算滚动方向
    this.state = {
      itemId: id,
      daily: {
        section: null //栏目分类信息
      },
      body: "", //供webview渲染的HTML格式内容
      // 动态调整webview为设备的宽度
      webviewWidth: null,
      // 记录webviewI初始化状态
      webviewInit: false,
      // 用于判断页面是否为初次加载
      first: null,
      opacity: new Animated.Value(0),
      headerHeight: new Animated.Value(HEAD_HEIGHT)
    };
    let opacity = this.scrollY.interpolate({
      inputRange: [0, IMG_MAX_HEIGHT, 210, 211],
      outputRange: [1, 0, 0, 1],
      extrapolate: "clamp"
    });
    this.props.navigation.setParams({ height: this.state.headerHeight });
    this.props.navigation.setParams({ opacity: opacity });
  }
  componentDidMount() {

    // 检测页面是否为初次加载
    storage
      .load({
        key: "first"
      })
      .then((res) => {
        if (!res) {
          console.warn('初次加载')
          this.setState({
            first: true
          });
          global.storage.save({
            key: "first",
            data: true
          });
        }else{
          this.setState({
            first: false
          });
        }
      })
      .then(() => {
        this._init();
      });
  }
  _init() {
    storage
      .load({
        key: "details",
        id: this.state.itemId
      })
      .then((response) => {
        if (!response || !response.body) {
          Tools.toast("服务器数据异常");
          return false;
        }
        let html = `<!DOCTYPE html><html><head><meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no"></head>
        <link rel="stylesheet" href="${response.css[0]}" />
        <body>${response.body}</body></html>`;
        if (this.state.first) {
          this.setState({
            daily: response
          });
          // webview等待动画完成后渲染,减少初次加载页面时卡顿问题
          InteractionManager.runAfterInteractions(() => {
            this.setState({
              body: html
            });
          });
        } else {
          this.setState({
            daily: response,
            body: html
          });
        }
      })
      .catch((error) => {});
  }
  bindMessage(event) {
    let data = event.nativeEvent.data;
    if (String(data).indexOf("img:") !== -1) {
      let imgUrl = data.split("img:")[1].replace('"', "");
      this.props.navigation.navigate("ImgView", {
        url: imgUrl
      });
    } else if (String(data).indexOf("init:") !== -1) {
      this.setState({ webviewInit: true });
    } else if (String(data).indexOf("a:") !== -1) {
      let src = data.split("a:")[1].replace('"', "");
      Linking.openURL(src).catch((err) => {
        Tools.toast("无法打开浏览器了..");
      });
    }
  }
  bindOnScroll = (event) => {
    let y = event.nativeEvent.contentOffset.y;
    let direction = y > offsetY ? "down" : "up";
    offsetY = y;
    if (y < IMG_MAX_HEIGHT) {
      this.state.headerHeight.setValue(HEAD_HEIGHT);
    } else {
      if (direction == "down") {
        if (tempHeight == HEAD_HEIGHT) {
          this.state.headerHeight.setValue(HEADER_MIN_HEIGHT);
          tempHeight = HEADER_MIN_HEIGHT;
        }
      } else if (direction == "up") {
        if (tempHeight == HEADER_MIN_HEIGHT) {
          this.state.headerHeight.setValue(HEAD_HEIGHT);
          tempHeight = HEAD_HEIGHT;
        }
      }
    }
  };

  renderSectioHeader = () => {
    const imgTop = this.scrollY.interpolate({
      inputRange: [0, 400],
      outputRange: [HEAD_HEIGHT, -HEAD_HEIGHT],
      extrapolate: "clamp"
    });
    return (
      <Animated.View key='background' style={{ translateY: imgTop }}>
        <Image
          style={[styles.backgroundImage]}
          source={{ uri: this.state.daily.image }}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
          style={styles.linearGradient}>
          <Text style={[styles.title]}>{this.state.daily.title}</Text>
          <Text style={[styles.source]}>{this.state.daily.image_source}</Text>
        </LinearGradient>
      </Animated.View>
    );
  };
  render() {
    return (
      <View
        style={styles.fill}
        onLayout={(event) => {
          this.setState({ webviewWidth: event.nativeEvent.layout.width });
        }}>
        <ParallaxScrollView
          scrollEnabled={this.body ? false : true}
          backgroundColor={"#fff"}
          onMessage={this.bindMessage}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
            {
              listener: this.bindOnScroll
            }
          )}
          parallaxHeaderHeight={250}
          renderBackground={this.renderSectioHeader}>
          {/* TODO : Webview在安卓模拟器7.0+以上版本时 存在内容被裁切情况. 真机没有复现此问题  */}

          {this.state.first===false || this.state.body ? (
            <AutoHeightWebView
              style={{ width: this.state.webviewWidth }}
              source={{ html: this.state.body }}
              onMessage={this.bindMessage.bind(this)}
              // 为webview图片绑定点击事件 , 触发查看大图
              customScript={`
             window.onload=function(){
             window.ReactNativeWebView.postMessage(JSON.stringify("init:true"));
             var imgs = document.getElementsByTagName("img");
             if(imgs){
               for(var i=0;i<imgs.length;i++){
                 imgs[i].addEventListener('click',function(e){
                   window.ReactNativeWebView.postMessage(JSON.stringify("img:"+this.src));
                 })
               }
             }
             var a = document.getElementsByTagName('a');
             if(a){
               for(var i = 0; i < a.length; i++){
                 a[i].onclick = function (event) {
                   window.ReactNativeWebView.postMessage(JSON.stringify("a:"+this.href));
                   event.preventDefault();
                 }
               }
             }
           }
            `}
            customStyle={` 
           .img-place-holder{ 
             display:none
           }
           body{
             background:none !important;
           }
         `}
            />
          ) : null}
          {/* 栏目信息  */}
          {this.state.daily.section && this.state.webviewInit ? (
            <TouchableOpacity
              style={styles.sectionWrapper}
              onPress={() => {
                console.warn(this.state.daily.section.id);
              }}>
              <Image
                style={styles.thumbnailImg}
                source={{ uri: this.state.daily.section.thumbnail }}
              />
              <Text style={styles.thumbnailName}>
                本文来自：{this.state.daily.section.name} · 合集
              </Text>
              <Icon
                iconStyle={styles.iconRightArrow}
                name='angle-right'
                type='font-awesome'
                color='#333'
                size={22}
              />
            </TouchableOpacity>
          ) : null}
        </ParallaxScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  title: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18
  },
  linearGradient: {
    width: "100%",
    height: IMG_MAX_HEIGHT,
    position: "absolute",
    zIndex: 2
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
    height: IMG_MAX_HEIGHT,
    resizeMode: "cover"
  },
  title: {
    fontSize: 22,
    color: "#fff",
    position: "absolute",
    paddingHorizontal: 15,
    bottom: 30,
    textAlign: "left"
  },
  source: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    position: "absolute",
    bottom: 10,
    right: 20
  },
  sectionWrapper: {
    backgroundColor: "#f0f0f0",
    marginHorizontal: 20,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center"
  },
  thumbnailImg: {
    height: 50,
    width: 50
  },
  thumbnailName: {
    flex: 1,
    color: "#000",
    marginLeft: 10
  },
  iconRightArrow: {
    right: 10,
    position: "absolute"
  }
});
