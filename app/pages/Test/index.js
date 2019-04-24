/*
*   
* -------------------------------
*  功能测试页 , 用于新功能的调试
*  当前项 : 日期选择器
* ------------------------------
*
*/
import React, { Component } from "react";
import { Button, View ,Text} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker"; 
import { Tools, Axios, Api } from "../../config";

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }
 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    let dateStr=Tools.formatDay(date).split('-').join('');
    this.props.navigation.navigate("Section", {
      date: dateStr,
    });
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View>
        <Text>功能测试页 : 当前项 日期选取器</Text>
        <Button title="显示日期选择器" onPress={this.showDateTimePicker} />
        <DateTimePicker
          maximumDate={Number(Tools.formatTime().split(':')[0])>=7?new Date():new Date(new Date().getTime() - 24*60*60*1000)}
          minimumDate={new Date(2013,10,20)}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}