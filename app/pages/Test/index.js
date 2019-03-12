/*
    功能测试页 , 用于新功能的调试
*/
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Platform,
  ToastAndroid,
  CameraRoll
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: ""
    };
  }
  saveToCameraRoll = () => {
    const { selectedImage, downlaodUrl } = this.state;
    let dirs = RNFetchBlob.fs.dirs;
    let url = "https://pic3.zhimg.com/v2-2e3aaa3b1b34273062e5a06822a984ce.jpg";
    ToastAndroid.show("图片保存中...", ToastAndroid.SHORT);
    if (Platform.OS === "android") {
      RNFetchBlob.config({
        fileCache: true,
        appendExt: "jpg",
        path: dirs.DocumentDir + "/测试文件夹"
      })
        .fetch("GET", url)
        .then(res => {
          CameraRoll.saveToCameraRoll(res.path())
            .then(res => {
              ToastAndroid.show("保存成功", ToastAndroid.SHORT);
            })
            .catch(error => {
              ToastAndroid.show("保存失败", ToastAndroid.SHORT);
            });
        });
    } else {
      CameraRoll.saveToCameraRoll(url).then(alert("成功", "图片已保存在相册"));
      ToastAndroid.show("图片保存成功", ToastAndroid.SHORT);
    }
  };
  render() {
    return (
      <View style={styles.fill}>
        <Text>功能测试页</Text>
        <Text>当前测试项: 图片保存</Text>
        <Text>保存的图片:</Text>
        <Image
          source={{
            uri:
              "https://pic3.zhimg.com/v2-2e3aaa3b1b34273062e5a06822a984ce.jpg"
          }}
          style={{ width: 400, height: 300 }}
        />
        <Button onPress={this.saveToCameraRoll.bind(this)} title="保存图片" />
        <Text>{this.state.uri}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  }
});
