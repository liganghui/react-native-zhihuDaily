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
  AsyncStorage,
  ScrollView,
  Image
} from "react-native";
import { Tile } from "react-native-elements";
import HTML from "./html";
import AutoHeightWebView from 'react-native-autoheight-webview'
const HEADER_MAX_HEIGHT = 160;
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
      news:{
        css:[]
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
        this.setState({
          news:responseJson
        })
          // 数据传输只支持字符串类型   "$R%N*D5A+F4HAA0O"  用于方便分割字符串
        // this.webview.postMessage(responseJson.image + "$R%N*D5A+F4HAA0O" +responseJson.body +"$R%N*D5A+F4HAA0O" +responseJson.image_source +"$R%N*D5A+F4HAA0O" +responseJson.title);
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
      <View style={styles.fill}>
       <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
       >
      <AutoHeightWebView
        source={{ html: this.state.news.body}}
        files={[{
          href: this.state.news.css[0],
          type: 'text/css',
          rel: 'stylesheet'
      }]}
      />
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#03A9F4",
    overflow: "hidden"
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
});
