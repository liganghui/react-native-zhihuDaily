/*
 *
 * -------------------------------
 *  功能测试页 , 用于新功能的调试
 *  当前项 : 视频
 * ------------------------------
 *
 */
import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import Video from "react-native-video";
export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Video
        source={require("../../assets/video/login-background.mp4")}
        muted={false}
        resizeMode="cover"
        ref={ref => {
          this.player = ref;
        }} 
        // onBuffer={this.onBuffer}                // Callback when remote video is buffering
        // onError={this.videoError}               // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      />
    );
  }
}
var styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
