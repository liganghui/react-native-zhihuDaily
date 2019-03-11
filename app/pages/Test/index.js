/*
    功能测试页 , 用于新功能的调试
*/
import React, { Component } from "react";
import { View, Text, StyleSheet ,Button,Image,Platform} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state={
      uri:''
    }
  }
    downloadImage(){
      var date      = new Date();
      var url       = "https://pic3.zhimg.com/v2-2e3aaa3b1b34273062e5a06822a984ce.jpg'";
      var ext       = this.getExtention(url);
      ext = "."+ext[0];
      const { config, fs } = RNFetchBlob ; 
      let PictureDir = fs.dirs.PictureDir
      let options = {
      fileCache: true,
       addAndroidDownloads : {
         useDownloadManager : true,
         notification : true,
         path:  PictureDir + "/image_6666666",
        description : 'Image'
         }
      }
       config(options).fetch('GET', url).then((res) => {
         Alert.alert("Download Success !");
      });
   }
     getExtention(filename){
       return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : 
   undefined;
  }
  render() {
    return(
    <View style={styles.fill}>
      <Text>功能测试页</Text>
      <Text>当前测试项: 图片保存</Text>
      <Text>保存的图片:</Text>
      <Image source={{uri:'https://pic3.zhimg.com/v2-2e3aaa3b1b34273062e5a06822a984ce.jpg'}} style={{width:400,height:300}}/>
      <Button onPress={this.downloadImage.bind(this)} title="保存图片"/>
      <Text>{this.state.uri}</Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  }
});
