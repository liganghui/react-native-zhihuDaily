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
import { Icon, Button } from "react-native-elements";
import AutoHeightWebView from "react-native-autoheight-webview";
import LinearGradient from "react-native-linear-gradient";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Share from "react-native-share";
import * as Animatable from "react-native-animatable";
import { Tools, Api, Axios } from "../../config";

const IMG_MAX_HEIGHT = 200;
const HEAD_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 0;
let tempHeight = HEAD_HEIGHT; // 记录当前Header高度
let offsetY=0; // 记录Y轴坐标
let that; //保存this引用
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
      },
      headerRight: (
        <View style={styles.headerRightWrapper}>
          {/* 分享 */}
          <Button
            type="clear"
            onPress={() => {
              that.openShare();
            }}
            icon={<Icon type="material" name="share" size={24} color="white" />}
          />
          {/* 收藏 */}
          <Button
            type="clear"
            onPress={() => {
              that.bindHeaderBtnTap("collect");
            }}
            icon={
              <Animatable.View ref={ref => (that.collectView = ref)}>
                <Icon
                  type="material"
                  name="star"
                  size={24}
                  color={params.collect ? "#ffff00" : "#fff"}
                />
              </Animatable.View>
            }
          />
          {/* 评论 */}
          <Button
            title={
              params.extra
                ? String(
                    params.extra.comments > 999 ? "999+" : params.extra.comments
                  )
                : " ... "
            }
            titleStyle={styles.headerRightButton}
            type="clear"
            onPress={() => {
              if (params.extra) {
                navigation.navigate("Comment", {
                  id: navigation.getParam("id"),
                  comments: params.extra.comments,
                  longComments: params.extra.long_comments,
                  shortComments: params.extra.short_comments
                });
              }
            }}
            icon={
              <Icon type="material" name="comment" size={24} color="white" />
            }
          />
          {/* 点赞 */}
          <Button
            title={
              params.extra
                ? String(
                    params.extra.popularity > 1000
                      ? Number(params.extra.popularity / 1000).toFixed(1) + "K"
                      : params.extra.popularity
                  )
                : " ... "
            }
            titleStyle={styles.headerRightButton}
            type="clear"
            onPress={() => {
              that.bindHeaderBtnTap("like");
            }}
            icon={
              <Animatable.View ref={ref => (that.popularityView = ref)}>
                <Icon
                  type="material"
                  name="thumb-up"
                  size={24}
                  color={params.like ? "#fea500" : "#fff"}
                />
              </Animatable.View>
            }
          />
        </View>
      )
    };
  };
  constructor(props) {
    super(props);
    let id = this.props.navigation.getParam("id");
    this.scrollY = new Animated.Value(0); // 记录Y轴滚动坐标 用户计算滚动方向
    this.state = {
      dailyId: id,
      daily: {
        section: null //栏目分类信息
      },
      body: null, //供webview渲染的HTML格式内容
      extra: {}, //日报额外信息
      webviewWidth: null, // 动态调整webview为设备的宽度
      webviewInit: false, // 记录webviewI初始化状态
      webviewFirst: null, // 用于判断页面是否为初次加载
      like: false, //点赞按钮
      collect: false, //收藏按钮
      bigSize: null, //webview大字号
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
    that = this;
  }
  componentDidMount() {
    this.init();
    // 检测页面是否为初次加载
  }
  /*
   *  初始化
   */
  init() {
    Tools.getNetworkState().then(newWorkInfo => {
      if (newWorkInfo.online) {
        this.getExtraData();
      }
    });
    this.getDailyData();
    storage
      .load({
        key: "webviewFirst"
      })
      .then(res => {
        if (res) {
          this.setState({
            webviewFirst: true
          });
        } else {
          this.setState({
            webviewFirst: false
          });
        }
      });
    storage
      .load({
        key: "bigSize"
      })
      .then(res => {
        if (res) {
          this.setState({
            bigSize: true
          });
        }
      });
  }
  // 页面数据初始化
  getDailyData() {
    storage
      .load({
        key: "details",
        id: this.state.dailyId
      })
      .then(response => {
        if (!response || !response.body) {
          Tools.toast("服务器数据异常");
          return false;
        }
        let html = `<!DOCTYPE html><html><head><meta name="viewport" content="initial-scale=0.5, maximum-scale=1, user-scalable=no"></head>
                    <link rel="stylesheet" href="${response.css[0]}" />
                    ${this.state.bigSize? " <style>*{font-size:120%;}</style>": ""}
                    <body>${response.body}</body></html>`;
        if (this.state.webviewFirst) {
          this.setState(
            {
              daily: response
            },
            () => {
              // webview等待动画完成后渲染,减少初次加载页面时卡顿问题
              InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                this.setState(
                  {
                    body: html,
                    webviewFirst: false
                  },
                  () => {
                      global.storage.save({
                        key: "webviewFirst",
                        data: false
                      });
                  }
                );
              }, 0);
              });
            }
          );
        } else {
          this.setState({
            daily: response,
            body: html
          });
        }
      })
      .catch(error => {});
  }
  // 日报额外信息  (评论数,点赞数等)
  getExtraData() {
    storage
      .load({
        key: "extra",
        id: this.state.dailyId
      })
      .then(res => {
        if (res) {
          this.props.navigation.setParams({ extra: res });
          this.setState({
            extra: res
          });
        }
      })
      .catch(() => {});
  }

  /*
   * 接受并处理Webview发送的信息
   * @param {Object} event 消息事件对象
   */
  bindMessage(event) {
    let data = event.nativeEvent.data;
    if (String(data).indexOf("img:") !== -1) {
      let imgUrl = data.split("img:")[1].replace('"', "");
      this.props.navigation.navigate("ImgView", {
        url: imgUrl
      });
    } else if (String(data).indexOf("init:") !== -1) {
      setTimeout(() => {
        this.setState({ webviewInit: true });
      }, 500);
    } else if (String(data).indexOf("a:") !== -1) {
      let src = data.split("a:")[1].replace('"', "");
      Linking.openURL(src).catch(err => {
        Tools.toast("无法打开浏览器了..");
      });
    }
  }
  /*
   *  系统分享弹窗
   */
  openShare() {
    let shareOptions = {
      title: "知乎日报",
      message: "知乎日报 · " + that.state.daily.title,
      url: that.state.daily.share_url,
      subject: "Share Link"
    };
    Share.open(shareOptions);
  }

  /*
   *  监听页面滚动 记录滚动方向 , 控制Header显示.
   *  @param {Object} event 滚动事件对象
   */
  bindOnScroll = event => {
    let y = event.nativeEvent.contentOffset.y;
    let direction = y > offsetY ? "down" : "up";
    offsetY=y;
    if (y <= IMG_MAX_HEIGHT) {
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
  /*
   * 跳转到栏目列表
   */
  bindSectionTap = () => {
    this.props.navigation.push("Section", {
      id: this.state.daily.section.id,
      title: this.state.daily.section.name
    });
  };
  /*
   * 处理收藏与点赞点击事件(静态模拟无实际功能)
   * @param {String} type 区分收藏和点赞
   */
  bindHeaderBtnTap(type) {
    let extra = that.state.extra;
    if (!extra.popularity) {
      return;
    } else if (type === "like") {
      if (!that.state.like) {
        that.popularityView.tada(800);
        Tools.toast("+1");
        extra.popularity += 1;
      } else {
        extra.popularity -= 1;
      }
      that.setState(
        {
          like: !that.state.like,
          extra
        },
        () => {
          this.props.navigation.setParams({ like: that.state.like });
          this.props.navigation.setParams({
            popularity: String(extra.popularity)
          });
        }
      );
    } else if (type === "collect") {
      that.collectView.bounceIn(800);
      that.setState(
        {
          collect: !that.state.collect
        },
        () => {
          this.props.navigation.setParams({ collect: that.state.collect });
        }
      );
    }
  }

  renderSectioHeader = () => {
    const imgTop = this.scrollY.interpolate({
      inputRange: [0, 400],
      outputRange: [HEAD_HEIGHT, -HEAD_HEIGHT],
      extrapolate: "clamp"
    });
    return (
      <Animated.View key="background" style={{ translateY: imgTop }}>
        <Image
          style={[styles.backgroundImage]}
          source={{ uri: this.state.daily.image }}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
          style={styles.linearGradient}
        >
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
        onLayout={event => {
          this.setState({ webviewWidth: event.nativeEvent.layout.width });
        }}
      >
        <ParallaxScrollView
          // 无数据时 禁止滚动
          scrollEnabled={this.state.body ? true : false}
          backgroundColor={"#fff"}
          onMessage={this.bindMessage}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
            {
              listener: this.bindOnScroll
            }
          )}
          parallaxHeaderHeight={250}
          renderBackground={this.renderSectioHeader}
        >
          {this.state.body ? (
            <AutoHeightWebView
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
             `}
            />
          ) : null}
          {/* 栏目信息  */}
          {this.state.daily.section && this.state.webviewInit ? (
            <TouchableOpacity
              style={styles.sectionWrapper}
              onPress={this.bindSectionTap}
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
        </ParallaxScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  headerRightWrapper: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: 230
  },
  headerRightButton: {
    fontSize: 14,
    marginLeft: 2,
    color: "#fff"
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
