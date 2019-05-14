/*
 *
 * -------------------------------
 *  功能测试页 , 用于新功能的调试
 * ------------------------------
 *
 */
import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react";
import { Container, Header, Button, Content, Text } from "native-base";
import { Api, Tools, Axios, System } from "../../config";
import ProgressBarModal from "../../componetns/ProgressBarModal";
import { setInterval } from "core-js";


@inject("test")
@inject("theme")
@observer
export default class index extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: "功能测试:热更新",
      headerStyle: {
        backgroundColor: screenProps.theme
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      progressModalVisible:false
    };
  }
  switchrogressModal=()=>{
    this.setState({
      progressModalVisible:!this.state.progressModalVisible
    })
    let add=setInterval(()=>{
      if(this.state.progress<100){
        this.setState({
          progress:this.state.progress+10
        })
      }else{
        this.setState({
          progress:0,
          progressModalVisible:false
        })
        clearInterval(add)
      }
    },500)
  }
  render() {
    return (
      <Container>
        <Content padder>
          <Text>新增更新测试1.0</Text>
          <Button onPress={this.switchrogressModal}><Text>显示下载进度</Text></Button>
           {/* 热更新下载进度modal */}
          <ProgressBarModal
            progress={this.state.progress}
            totalPackageSize={'10mb'}
            receivedPackageSize={20}
            progressModalVisible={this.state.progressModalVisible}// 是否显示弹窗控制
           />
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200
  }
});
