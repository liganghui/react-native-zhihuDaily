/*
 *
 *  头像图片选择组件
*   @param  {function}   callback      头像选择完成回调函数     [必填]
 *  @param  {object}   clipConfig    头像裁切配置               [可选]
 *  @param  {object}       pickerConfig  头像选择配置           [可选]
 */
import React, { Component } from "react";
import { View,PermissionsAndroid,Alert } from "react-native";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import ImagePicker from "react-native-image-picker";
import ImageClip from "react-native-image-crop-picker";
import PropTypes from "prop-types";
import AndroidOpenSettings from 'react-native-android-open-settings'


const ActionSheetOptions = ["取消", "拍摄图片", "图库中选择"];

export default class index extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    clipConfig: PropTypes.object,
    pickerConfig: PropTypes.object
  };
  constructor(props) {
    super(props);
  }
  //对外方法
  show = () => {
    this.ActionSheet.show();
  };
  bindActionSheetClick = index => {
    const imagePickerOptions = {
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: "images",
        ...this.props.pickerConfig
      }
    };
    if (index == 1) {
      this.requestCameraPermission(()=>{
        ImagePicker.launchCamera(imagePickerOptions, response => {
          if (response.uri) {
            this.clip(response.uri,this.props.callback);
          }
        });
      },()=>{
        Alert.alert(
          '相机无法使用', 
          '应用没有使用相机的权限,请前往 设置 手动为应用开启相机权限',
          [
            {text: '一会再说' },
            {
              text: '去开启',
              onPress: () => AndroidOpenSettings.appDetailsSettings(),
            },
          ],
          {cancelable: false},
        );
      },(err)=>{
        Alert.alert(
          '无法请求权限',
          '应用无法请求相机权限,请前往 设置 手动为应用开启相机权限',
          [
            {text: '一会再说' },
            {
              text: '去开启',
              onPress: () =>AndroidOpenSettings.appDetailsSettings(),
            },
          ],
          {cancelable: false},
        );
      })
   
    } else if (index == 2) {
      this.requestCameraPermission();
      ImagePicker.launchImageLibrary(imagePickerOptions, response => {
        if (response.uri) {
          this.clip(response.uri,this.props.callback);
        }
      });
    }
  };

  // 处理权限
  async requestCameraPermission(succesCallback,failCallback,errCallback) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '请求权限',
          message:
            '更换头像需要使用您的权限授权',
          buttonNeutral: '过会再说',
          buttonPositive: '好的',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        succesCallback&&succesCallback()
      } else {
        failCallback&&failCallback()
      }
    } catch (err) {
      errCallback&&errCallback(err)
    }
  }
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
      ...this.props.clipConfig
    }).then(res => {
      callback && callback(res);
    });
  };
  render() {
    return (
      <View>
        <ActionSheet
          ref={el => (this.ActionSheet = el)}
          title={"选择图片"}
          options={ActionSheetOptions}
          cancelButtonIndex={0}
          destructiveButtonIndex={0}
          onPress={this.bindActionSheetClick}
        />
      </View>
    );
  }
}
