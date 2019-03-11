/*
    功能测试页 , 用于新功能的调试
*/
import React, { Component } from "react";
import { View, Text, StyleSheet ,Button,Image,Platform,ToastAndroid,CameraRoll} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state={
      uri:''
    }
  }
  saveToCameraRoll = () => {
    const{selectedImage, downlaodUrl} = this.state
    let url ='https://pic3.zhimg.com/v2-2e3aaa3b1b34273062e5a06822a984ce.jpg';
    ToastAndroid.show("Image is Saving...", ToastAndroid.SHORT)
    if (Platform.OS === 'android'){ 
      RNFetchBlob
        .config({
          fileCache : true,
          appendExt : 'jpg'
        })
        .fetch('GET', url)
        .then((res) => {
            console.log()
         CameraRoll.saveToCameraRoll(res.path())

            .then((res) => {
             console.log("save", res)
             ToastAndroid.show("Image saved Successfully.", ToastAndroid.SHORT)
            }).catch((error) => {
                ToastAndroid.show("Ops! Operation Failed", ToastAndroid.SHORT)

            })

        })
    } else {
        CameraRoll.saveToCameraRoll(url)
          .then(alert('Success', 'Photo added to camera roll!'))
          ToastAndroid.show("Image saved Successfully.", ToastAndroid.SHORT)
    }
  }
  render() {
    return(
    <View style={styles.fill}>
      <Text>功能测试页</Text>
      <Text>当前测试项: 图片保存</Text>
      <Text>保存的图片:</Text>
      <Image source={{uri:'https://pic3.zhimg.com/v2-2e3aaa3b1b34273062e5a06822a984ce.jpg'}} style={{width:400,height:300}}/>
      <Button onPress={this.saveToCameraRoll.bind(this)} title="保存图片"/>
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
