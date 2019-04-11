/*
*   
* -------------------------------
*  功能测试页 , 用于新功能的调试
*  当前项 : 弹出菜单
* ------------------------------
*
*/
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Platform,
  ToastAndroid,
  CameraRoll
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { MenuProvider } from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened:false
    };
  };
  bindTap(){
    this.setState({
      opened:!this.state.opened
    })
  }
  render() {
    return (
      <MenuProvider>
      <View style={styles.fill}>
      <Button onPress={this.bindTap.bind(this)}   title="点击"></Button>
    <Menu   opened={this.state.opened} onBackdropPress={() => this.bindTap()}>
      <MenuTrigger />
      <MenuOptions >
        <MenuOption onSelect={() => alert(`Save`)} text='Save' />
        <MenuOption onSelect={() => alert(`Delete`)} >
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
      </MenuOptions>
    </Menu>
      </View>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  }
});
