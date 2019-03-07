//  日报详情页
import Storage from "react-native-storage";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { Tile, Icon } from "react-native-elements";
import AutoHeightWebView from "react-native-autoheight-webview";
import LinearGradient from "react-native-linear-gradient";

const IMG_MAX_HEIGHT = 200;
const IMG_MIN_HEIGHT = 0;
const IMG_SCROLL_DISTANCE = IMG_MAX_HEIGHT - IMG_MIN_HEIGHT;
const HEAD_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTransparent: true,
      headerStyle: {
        height: !params ? 55 : params.height,
        backgroundColor: "#00a2ed",
        opacity: !params ? 0 : params.animatedValue
      }
    };
  };
  constructor(props) {
    super(props);

    this._animatedValue = new Animated.Value(0);
    const id = this.props.navigation.getParam("itemId");
    this.state = {
      itemId: id,
      daily: {
        css: [],
        section: null
      },
      // 动态调整webview为设备的宽度
      webviewWidth: null,
      // 记录webviewI初始化状态
      webviewInit: false,
      scrollY: new Animated.Value(0),
      headerHeight: new Animated.Value(55)
    };
  }
  componentDidMount() {
    this.init();
    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    this.props.navigation.setParams({ animatedValue: headerOpacity });
    this.props.navigation.setParams({ height:this.state.headerHeight });
    this.fadeOutAnimated = Animated.timing(
      this.state.headerHeight,
      {
          toValue: 55,  //透明度动画最终值
          duration: 2000 //动画时长3000毫秒
      }
    );

  }
  init() {
    // TODO:封装接口
    fetch(API.details + this.state.itemId)
      .then(response => response.json())
      .then(responseJson => {
        let html = `<!DOCTYPE html><html><head><meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no"></head><body>${
          responseJson.body
        }</body></html>`;
        responseJson.body = html;
        this.setState({
          daily: responseJson
        });
      })
      .catch(error => {
        // TODO:接口异常处理
      });
  }
  bindMessage(event) {
    let data = event.nativeEvent.data;
    if (String(data).indexOf("url:") !== -1) {
      let url = data.split("url:")[1].replace('"', "");
      this.props.navigation.navigate("ImgView", {
        url
      });
    }
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 350],
      outputRange: [200, 0],
      extrapolate: "clamp"
    });
    const headerTop = this.state.scrollY.interpolate({
      inputRange: [0, 250],
      outputRange: [50, -50],
      extrapolate: "clamp"
    });
   
    return (
      <View
        style={styles.fill}
        onLayout={event => {
          this.setState({ webviewWidth: event.nativeEvent.layout.width });
        }}
      >
        <ScrollView
          scrollEventThrottle={16}
          onMessage={this.bindMessage}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
              listener: event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                console.warn(offsetY);
                if(offsetY>=190){

                }else if(offsetY>=400){
                  this.props.navigation.setParams({ animatedValue: headerOpacity });
                  this.fadeOutAnimated.start(() => this.state.fadeOutOpacity.setValue(1));
                }
                // console.warn(offsetY)
              }
            }
          )}
        >
          {/* TODO : Webview在安卓模拟器7.0+以上版本时 存在内容被裁切情况  */}
          <AutoHeightWebView
            style={[styles.webview, { width: this.state.webviewWidth }]}
            source={{ html: this.state.daily.body }}
            onMessage={this.bindMessage.bind(this)}
            onLoadEnd={() => {
              this.setState({ webviewInit: true });
            }}
            files={[
              {
                href: this.state.daily.css[0],
                type: "text/css",
                rel: "stylesheet"
              }
            ]}
            // 为webview图片绑定点击事件 , 触发查看大图
            customScript={`
              window.onload=function(){
                var imgs = document.getElementsByTagName("img");
                if(imgs){
                  for(var i=0;i<imgs.length;i++){
                    imgs[i].addEventListener('click',function(e){
                      var src=this.src;
                      window.ReactNativeWebView.postMessage(JSON.stringify("url:"+src));
                    })
                  }
                }
              }
              `}
          />
          {/* 栏目信息  */}
          {this.state.daily.section && this.state.webviewInit ? (
            <TouchableOpacity
              style={styles.sectionWrapper}
              onPress={() => {
                console.warn(this.state.daily.section.id);
              }}
            >
              <Image
                style={styles.thumbnailImg}
                source={{ uri: this.state.daily.section.thumbnail }}
              />
              <Text style={styles.thumbnailName}>
                本文来自：{this.state.daily.section.name} · 合集
              </Text>
              <Icon
                iconStyle={styles.iconRightArrow}
                name="angle-right"
                type="font-awesome"
                color="#333"
                size={22}
              />
            </TouchableOpacity>
          ) : null}
        </ScrollView>
        <Animated.View
          style={[styles.header, { height: headerHeight, top: headerTop }]}
        >
          <Animated.Image
            style={[styles.backgroundImage]}
            source={{ uri: this.state.daily.image }}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
            style={styles.linearGradient}
          >
            <Animated.Text style={[styles.title]}>
              {this.state.daily.title}
            </Animated.Text>
            <Animated.Text style={[styles.source]}>
              {this.state.daily.image_source}
            </Animated.Text>
          </LinearGradient>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  header: {
    position: "absolute",
    top: HEAD_HEIGHT,
    left: 0,
    right: 0,
    overflow: "hidden"
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
    left: 0,
    right: 0,
    zIndex: 1,
    width: null,
    height: IMG_MAX_HEIGHT,
    resizeMode: "cover"
  },
  webview: {
    marginTop: HEAD_HEIGHT
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
    fontSize: 14,
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