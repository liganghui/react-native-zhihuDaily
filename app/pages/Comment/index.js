import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
  } from "react-native";
import Modal from "react-native-modal";
import Spinner  from "react-native-spinkit"
import CardView from "react-native-cardview";
import { Tools,Api,Axios,System} from "../../config";


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
    };
  }

  bindModalTap=()=>{
    this.setState({
      isModalVisible:!this.state.isModalVisible
    })
  }
  render() {
    return (
      <View>
        <Text>深度长评虚位以待</Text>
        {/*  遮罩层 */}
        <Modal style={styles.modal}  animationType={'none'} animationOut={'fadeOut'} isVisible={this.state.isModalVisible} backdropOpacity={0.5} onBackdropPress={this.bindModalTap}>
        {this.state.isModalVisible?
          <CardView  cardElevation={5} cornerRadius={2}  style={styles.loadWrapper}>
              <Spinner isVisible={this.state.isModalVisible} size={45} type={'Circle'} color={'#00a2ed'} />
              <Text  style={styles.loadText}>努力加载中</Text>
          </CardView>
           :<View></View>}
        </Modal>
      </View>

     
    )
  }
}
const styles = StyleSheet.create({
  modal:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadWrapper:{
    backgroundColor:"#fff",
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent:'flex-start',
    alignItems: 'center',
    width:300,
    height:80,
  },
  loadText:{
    fontSize:16,
    marginLeft: 30,
  }
});
