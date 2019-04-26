/*
*   
* -------------------------------
*  功能测试页 , 用于新功能的调试
*  当前项 : 动画
* ------------------------------
*
*/
import React, { Component } from "react";
import { Button, View ,Text,TouchableWithoutFeedback} from "react-native";
import * as Animatable from 'react-native-animatable';
import { Tools, Axios, Api } from "../../config";

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleViewRef = ref => this.view = ref;
  bounce = () => this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.bounce}>
        <Animatable.View ref={this.handleViewRef}>
          <Text>Bounce me!</Text>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }
}