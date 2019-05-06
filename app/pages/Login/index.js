import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { Icon, Button, Avatar, ListItem } from "react-native-elements";
import Video from "react-native-video";
import { Api, Tools, Axios, System } from "../../config";
export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      paused:false,//视频是否暂停
      muted: true, //视频是否静音
    };
  }
  componentDidMount() {
    // react-navigation生命周期 : 页面已经显示
    this.navigationWillFocus = this.props.navigation.addListener(
      'willFocus',
      (obj)=>{
        this.setState({
          paused:false,
          muted:true
        })
      }
   )
    // react-navigation生命周期 : 页面将要移除
    this.navigationWillBlur=this.props.navigation.addListener(
      'willBlur',
      (obj)=>{
          this.setState({
            paused:true,
            muted:true
          })
      }
    )
  }
  componentWillUnmount() {
    // 移除监听
    this.navigationWillFocus.remove();
    this.navigationWillBlur.remove();
}
  loginTo= () => {
      this.props.navigation.navigate("SignIn");
  };
  signUp = () => {
    this.props.navigation.navigate("Registered");
  };   
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            this.setState({
              muted: !this.state.muted
            });
          }}
          style={styles.mask}
        />
        <Video
          style={styles.backgroundVideo}
          source={require("../../assets/video/login-background.mp4")}
          muted={this.state.muted}
          paused={this.state.paused}
          resizeMode="cover"
          ref={ref => {
            this.player = ref;
          }}
        />
        {/* <Icon name="volume-up" type="material" size={24} color="#fff" /> */}
        {this.state.muted ? (
          <View style={styles.noticeContainer}>
            <View style={styles.noticeBackground}>
              <Icon name="volume-up" type="material" size={24} color="#fff" />
              <Text style={styles.noticeText}>点击屏幕取消静音</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <Button
            title="登录"
            onPress={this.loginTo}
            buttonStyle={styles.signInBtn}
            titleStyle={styles.buttonTitle}
          />
          <Button
            title="注册"
            onPress={this.signUp}
            buttonStyle={styles.signUpBtn}
            titleStyle={[styles.buttonTitle, styles.signUpTitle]}
          />
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    position: "absolute",
    width: System.SCREEN_WIDTH,
    bottom: 40,
    zIndex: 3,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  signUpBtn: {
    backgroundColor: "rgba(27, 163, 225, 0.7)",
    height: 50,
    width: 150
  },
  signInBtn: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.5)",
    width: 150
  },
  buttonTitle: {
    color: "#333",
    letterSpacing: 4,
    fontSize: 20
  },
  signUpTitle: {
    color: "#fff"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2
  },
  noticeContainer: {
    zIndex: 2,
    top: 25,
    flexDirection: "row",
    justifyContent: "center"
  },
  noticeBackground: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 200,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  noticeText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 2
  }
});
