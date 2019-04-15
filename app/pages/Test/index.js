/*
*   
* -------------------------------
*  功能测试页 , 用于新功能的调试
*  当前项 : modal
* ------------------------------
*
*/
import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

export default class ModalTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
  _toggleModal = () =>{
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text>显示遮罩层</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible} animationType={'fade'}>
         
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Hide me!</Text>
              </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}