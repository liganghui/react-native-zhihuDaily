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
import { Api, Tools, Axios, System } from "../../utils";
import ProgressBarModal from "../../componetns/ProgressBarModal";


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
          <Text>热更新测试v2</Text>
          <Image
            source={require("../../assets/images/test1.png")}
            style={styles.img}
          />
          <Image
            source={require("../../assets/images/test2.jpg")}
            style={styles.img}
          />
          <Image
            source={require("../../assets/images/test3.jpg")}
            style={styles.img}
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
