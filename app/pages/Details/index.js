//  日报详情页
import Storage from "react-native-storage";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  WebView,
  Animated,
  AsyncStorage,
  ScrollView,
  Image
} from "react-native";
import { Tile } from "react-native-elements";
import HTML from "./html";
import AutoHeightWebView from "react-native-autoheight-webview";
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTransparent: true,
      headerStyle: {
        opacity: params.headerOpacity ? params.headerOpacity : 1,
        backgroundColor: "#00a2ed"
      }
    };
  };
  constructor(props) {
    super(props);
    const id = this.props.navigation.getParam("itemId");
    this.state = {
      itemId: id,
      news: {
        css:[]
      },
      scrollY: new Animated.Value(0)
    };
    this.props.navigation.setParams({
      headerOpacity: 1
    });
  }
  componentDidMount() {
    this.init();
  }
  init() {
    // TODO:封装接口
    fetch(API.details + this.state.itemId)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          news: responseJson
        });
      })
      .catch(error => {
        // TODO:接口异常处理
      });
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: "clamp"
    });
    return (
      <View style={styles.fill}>
        <ScrollView style={styles.fill} scrollEventThrottle={16}  onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}>
          <AutoHeightWebView
            source={{ html: this.state.news.body }}
            files={[
              {
                href: this.state.news.css[0],
                type: "text/css",
                rel: "stylesheet"
              }
            ]}
          />
        </ScrollView>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{uri:this.state.news.image}}
          />
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
    top: 50,
    left: 0,
    right: 0,
    overflow: "hidden"
  },
  title: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  }
});
