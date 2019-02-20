//  日报详情页
import Storage from 'react-native-storage';
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  WebView,
  Animated,
  AsyncStorage
} from "react-native";
import { Tile } from "react-native-elements";
import HTML from "./html";

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
      stories: {
        images: []
      }
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
          // 数据传输只支持字符串类型   "$R%N*D5A+F4HAA0O"  用于方便分割字符串
        this.webview.postMessage(responseJson.image + "$R%N*D5A+F4HAA0O" +responseJson.body +"$R%N*D5A+F4HAA0O" +responseJson.image_source +"$R%N*D5A+F4HAA0O" +responseJson.title);
        // storage.save({
        //   key: 'details', // 注意:请不要在key中使用_下划线符号!
        //   id:  this.state.itemId, // 注意:请不要在id中使用_下划线符号!
        //   data: responseJson,
        // });
      })
      .catch(error => {
        // TODO:接口异常处理
      });
  }

  onMessage = event => {
    //webview中的html页面传过来的的数据在event.nativeEvent.data上
    let data = event.nativeEvent.data;
    if (data === "up") {
      this.props.navigation.setParams({
        headerOpacity: 1
      });
    } else if (data === "down") {
      this.props.navigation.setParams({
        headerOpacity: 0
      });
    } else if (data.indexOf("error")) {
      // TODO:数据异常处理
    }
  };
  render() {
    return (
      <WebView
        ref={webview => {
          this.webview = webview;
        }}
        source={{ html: HTML, baseUrl: "" }}
        onMessage={this.onMessage}
      />
    );
  }
}
