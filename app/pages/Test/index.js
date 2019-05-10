/*
 *
 * -------------------------------
 *  功能测试页 , 用于新功能的调试
 * ------------------------------
 *
 */
import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import {observer,inject} from 'mobx-react';
import { Container, Header, Button, Content, Text } from "native-base";


@inject('test') 
@inject('theme') 
@observer
export default class index extends Component {
  static navigationOptions = ({ navigation,screenProps  }) => {
    return {
      title: '功能测试:主题化',
      headerStyle:{
        backgroundColor:screenProps.theme
      }
    };
  };
  constructor(props) {
    super(props);
  }
  updateName=()=>{
    this.props.test.setName('6666')
  }
  updateTheme=()=>{
    this.props.theme.setTheme('black')
    console.warn('切换到夜间主题')
  }
  render() {
    return (
      <Container>
        <Content padder>
          <Button onPress={this.updateName}>
            <Text>更新名字</Text>
          </Button>
          <Text>{this.props.test.name}</Text>
          <Button onPress={this.updateTheme}>
            <Text>设置主题</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({});
