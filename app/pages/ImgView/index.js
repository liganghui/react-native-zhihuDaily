import React, { Component } from "react";
import { View, Text, Platform, CameraRoll,ToastAndroid,PermissionsAndroid} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import Toast from "react-native-root-toast";
import { Header, Icon, Button } from "react-native-elements";
import RNFetchBlob from "rn-fetch-blob";
import TOOLS from "../../config/tools";


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
          title=""
          type="clear"
          onPress={params.handleMore}
          icon={
            <Icon type="material" name="more-vert" size={24} color="white" />
          }
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ handleMore: this.bindMoreBtn });
  }
  bindMoreBtn=()=> {
    this.requestReadPermission().then((res)=>{
      if (res === PermissionsAndroid.RESULTS.GRANTED) {
        this.saveImg(this.props.navigation.getParam("url"), "日报RN版");
      } else {
        this.toast('保存失败：缺少存储权限')
      }
    })
  }
  // 获取读写权限
  async requestReadPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': '提示',
                'message': '保存图片需要使用您的本地存储，请允许权限。'
            }
        )
        return granted;
    } catch (err) {
        console.warn(err.toString())
    }
  } 
  /*
    保存图片文件到本地
    Android中使用rn-fetch-blob保存 , IOS使用RN组件:CameraRoll.

    @param imgSrc {String} 图像网络地址
    @param folderName {String} 安卓中存放图片的文件夹名称
  
  */
  saveImg=(imgSrc, folderName)=>{

    // 安卓下保存到指定文件夹中
    if (Platform.OS === "android") {
      // 下载文件
      RNFetchBlob.config({
        fileCache: true, //保存称临时文件
        appendExt: "jpg" //临时文件扩展名
      }).fetch("GET", imgSrc)
        .then(res => {
          // 图片文件名
          const fileName=TOOLS.getDate()+'_'+res.taskId
          // 判断文件夹是否存在
          RNFetchBlob.fs.isDir(`${RNFetchBlob.fs.dirs.PictureDir}/${folderName}`).then((isDir) => {
           if(!isDir){
            //  创建文件夹
            RNFetchBlob.fs.mkdir(`${RNFetchBlob.fs.dirs.PictureDir}/${folderName}`)
           }
        }).then(()=>{
          // 移动临时文件到文件夹
          RNFetchBlob.fs.mv(res.path(),`${RNFetchBlob.fs.dirs.PictureDir}/${folderName}/${fileName}.jpg`)
        }).then(()=>{
          // 刷新相册
          RNFetchBlob.fs.scanFile([ { path :`${RNFetchBlob.fs.dirs.PictureDir}/${folderName}/${fileName}.jpg`}])
          this.toast('保存成功')
        }).catch(()=>{
            // 当RNFetchBlob异常时, 尝试系统方法
            CameraRoll.saveToCameraRoll(res.path())
            .then(res => {
              this.toast('保存成功')
            })
            .catch(error => {
              this.toast('保存失败')
            });
          })
        })
    } else {
      // IOS 调用系统方法
      CameraRoll.saveToCameraRoll(url).then(
        this.toast('保存成功')
      ).catch(
        this.toast('保存失败')
      );
    }
  }
  toast(text) {
    let toast = Toast.show(text, {
      position: Toast.positions.BOTTOM,
      shadow: false,
      backgroundColor: "#ffffff",
      textColor: "#000000"
    });
  }
  render() {
    const images = [
      {
        url: this.props.navigation.getParam("url")
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <ImageViewer imageUrls={images} renderIndicator={() => {}} />
      </View>
    );
  }
}
