import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { Icon, Button, Avatar, ListItem } from "react-native-elements";
import Video from "react-native-video";
import { Api, Tools, Axios, System } from "../../config";
/**
 *
 *  功能未完成 2019年4月29日
 *
 */
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: true, //视频是否静音
      loginLoading: false
    };
  }
  userLogin = () => {
    this.setState({
      loginLoading: !this.state.loginLoading
    });
    storage
      .save({
        key: "userToken",
        data: {
          name: "李二狗",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
        },
        expires: null
      })
      .then(() => {
        setTimeout(() => {
          this.setState(
            {
              loginLoading: false
            },
            () => {
              setTimeout(() => {
                this.props.navigation.navigate("App");
                Tools.toast("登录成功");
              }, 0);
            }
          );
        }, 600);
      })
      .catch(err => {
        this.setState({
          loginLoading: false
        });
        Tools.toast("登录失败");
      });
  };
  userRegister = () => {
    Tools.toast("点击了注册按钮");
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
            loading={this.state.loginLoading}
            onPress={this.userLogin}
            buttonStyle={styles.loginBtn}
            titleStyle={styles.buttonTitle}
          />
          <Button
            title="注册"
            onPress={this.userRegister}
            buttonStyle={styles.registerBtn}
            titleStyle={[styles.buttonTitle, styles.registerTitle]}
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
  registerBtn: {
    backgroundColor: "rgba(27, 163, 225, 0.7)",
    height: 50,
    width: 150
  },
  loginBtn: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.6)",
    width: 150
  },
  buttonTitle: {
    color: "#555",
    letterSpacing: 4,
    fontSize: 20
  },
  registerTitle: {
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
