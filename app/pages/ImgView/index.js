import React, { Component } from "react";
import {
  View,
  Platform,
  CameraRoll,
  PermissionsAndroid
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Icon, Button } from "react-native-elements";
import RNFetchBlob from "rn-fetch-blob";
import { Tools } from "../../config";

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "transparent"
      },
      headerRight: (
        <Button
          type="clear"
          onPress={params.handleMore}
          icon={<Icon type="material" name="get-app" size={24} color="white" />}
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ handleMore: this.bindMoreBtn });
  }
  bindMoreBtn = () => {
    if (Platform.OS === "android") {
      this.requestReadPermission().then(res => {
        if (res === PermissionsAndroid.RESULTS.GRANTED) {
          this.saveImg(this.props.navigation.getParam("url"), "日报RN版");
        } else {
          Tools.toast("保存失败：缺少存储权限");
        }
      });
    } else {
      this.saveImg(this.props.navigation.getParam("url"), "日报RN版");
    }
  };
  // 获取读写权限
  async requestReadPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "提示",
          message: "保存图片需要使用您的本地存储，请允许权限。"
        }
      );
      return granted;
    } catch (err) {
      console.warn(err.toString());
    }
  }
  /*
    保存图片文件到本地
    Android中使用rn-fetch-blob保存 , IOS使用RN组件:CameraRoll.

    @param imgSrc {String} 图像网络地址
    @param folderName {String} 安卓中存放图片的文件夹名称
  
  */
  saveImg = (imgSrc, folderName) => {
    // 安卓下保存到指定文件夹中
    if (Platform.OS === "android") {
      //获取图片格式
      let srcAry = imgSrc.toLowerCase().split(".");
      let imgFormat = srcAry[srcAry.length - 1];
      if (!/^.*[(git)|(jpeg)|(png)|(jpg)].*$/.test(imgFormat)) {  
        Tools.toast("保存失败：图片格式异常");
        return;
      }  
      // 下载文件
      RNFetchBlob.config({
        fileCache: true, //文件保存成临时文件
        appendExt: imgFormat //临时文件扩展名
      })
        .fetch("GET", imgSrc)
        .then(res => {
          // 图片文件名
          const fileName = Tools.formatDay() + "_" + res.taskId;
          // 判断文件夹是否存在
          RNFetchBlob.fs
            .isDir(`${RNFetchBlob.fs.dirs.PictureDir}/${folderName}`)
            .then(isDir => {
              if (!isDir) {
                //  创建文件夹
                RNFetchBlob.fs.mkdir(`${RNFetchBlob.fs.dirs.PictureDir}/${folderName}`);
              }
            })
            .then(() => {
              // 移动临时图片文件到文件夹
              RNFetchBlob.fs.mv( res.path(),`${RNFetchBlob.fs.dirs.PictureDir}/${folderName}/${fileName}.${imgFormat}`);
            })
            .then(() => {
              // 刷新相册
              RNFetchBlob.fs.scanFile([{path: `${RNFetchBlob.fs.dirs.PictureDir}/${folderName}/${fileName}.${imgFormat}`}]);
              Tools.toast(`保存成功，图片路径：${RNFetchBlob.fs.dirs.PictureDir}/${folderName}/${fileName}.${imgFormat}`);
            })
            .catch(() => {
              // 当RNFetchBlob异常时, 尝试系统方法
              CameraRoll.saveToCameraRoll(res.path())
                .then(res => {
                  Tools.toast("保存成功");
                })
                .catch(error => {
                  Tools.toast("保存失败，错误："+error);
                });
            });
        });
    } else {
      // IOS 调用系统方法
      CameraRoll.saveToCameraRoll(imgSrc)
        .then(()=>{Tools.toast("保存成功")})
        .catch(()=>{Tools.toast("保存失败")});
    }
  };

  render() {
    const images = [
      {
        url: this.props.navigation.getParam("url")
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <ImageViewer imageUrls={images} renderIndicator={() => {}}  onSave={this.bindMoreBtn} menuContext ={{ saveToLocal: '保存图像', cancel: '取消' }}/>
      </View>
    );
  }
}
