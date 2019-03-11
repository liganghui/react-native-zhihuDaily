/*
    功能测试页 , 用于新功能的调试
*/
import React, { Component } from "react";
import { View, Text, StyleSheet ,Button,Image} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state={
      uri:''
    }
  }
  imgSave(){
    RNFetchBlob
    .config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache : true,
    })
    .fetch('GET', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552900167&di=25ee7d0026b36b1d95ca04ecc0611dd7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201303%2F15%2F20130315223944_EvRW3.thumb.700_0.jpeg', {
      //some headers ..
    })
    .then((res) => {
      let path=res.path();
      this.setState({
        uri:path
      })
      console.warn('保存的图片路径 ',path)
    })
  }
  render() {
    return(
    <View style={styles.fill}>
      <Text>功能测试页</Text>
      <Text>当前测试项: 图片保存</Text>
      <Text>保存的图片:</Text>
      <Image source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552900167&di=25ee7d0026b36b1d95ca04ecc0611dd7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201303%2F15%2F20130315223944_EvRW3.thumb.700_0.jpeg'}} style={{width:400,height:300}}/>
      <Button onPress={this.imgSave.bind(this)} title="保存图片"/>
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
