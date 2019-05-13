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
  }
  render() {
    return (
      <Container>
        <Content padder>
          <Text>新增更新2</Text>
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
