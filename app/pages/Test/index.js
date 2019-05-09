/*
 *
 * -------------------------------
 *  功能测试页 , 用于新功能的调试
 *  当前项 : 图像选择与拍摄
 * ------------------------------
 *
 */
import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Container, Header, Button, Content, Text } from "native-base";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import ImagePicker from "react-native-image-picker";
import ImageClip from "react-native-image-crop-picker";
const ActionSheetOptions = ["取消", "拍摄图片", "图库中选择"];
const imagePickerOptions = {
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: {}
    };
  }
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  bindActionSheetClick = index => {
    if (index == 1) {
      ImagePicker.launchCamera(imagePickerOptions, response => {
        if (response.uri) {
          this.clip(response.uri, this.showimg);
        }
      });
    } else if (index == 2) {
      ImagePicker.launchImageLibrary(imagePickerOptions, response => {
        if (response.uri) {
          this.clip(response.uri, this.showimg);
        }
      });
    }
  };
  /**
   *  裁切图像
   *  @param src {String} 图像路径
   *  @param config {Object} 配置参数
   */
  clip = (src, callback, config = {}) => {
    ImageClip.openCropper({
      path: src,
      width: 300,
      height: 300,
      cropperCircleOverlay: true,
      ...config
    }).then(res => {
      callback && callback(res);
    });
  };

  showimg = res => {
    this.setState({
      imgData: res
    });
    storage
    .save({
      key: "userToken",
      data: {
        name: "狗蛋",
        avatar:res.path
      },
      expires: null
    })
    .then(() => {
     
    })
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Button onPress={this.showActionSheet}>
            <Text>选择图片</Text>
          </Button>
          <ActionSheet
            ref={el => (this.ActionSheet = el)}
            title={"选择图片"}
            options={ActionSheetOptions}
            cancelButtonIndex={0}
            destructiveButtonIndex={0}
            onPress={this.bindActionSheetClick}
          />

          {this.state.imgData ? (
            <View style={{ flex: 1 }}>
              <Text>{this.state.imgData.path}</Text>
              <Image
                source={{ uri: this.state.imgData.path }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  marginTop: 50,
                  marginLeft: 50
                }}
              />
            </View>
          ) : null}
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({});
