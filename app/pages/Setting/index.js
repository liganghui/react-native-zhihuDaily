import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert
} from "react-native";
import {
  Container,
  Content,
  ListItem,
  CheckBox,
  Body,
  Left,
  Right,
} from "native-base";
import codePush from "react-native-code-push";
import DeviceInfo from 'react-native-device-info';
import { Api, Tools, Axios, System } from "../../config";
import { observer, inject } from "mobx-react";
@inject("theme")
@observer


export default class index extends Component {
  static navigationOptions = ({ navigation,screenProps }) => {
    return {
      title: '设置',
      headerStyle:{
        backgroundColor:screenProps.theme
      },
    };
  };
  constructor(props) {
    super(props);
     
    this.state = {
      bigSizeState: null,
      version:DeviceInfo.getVersion()
    };
  } 

  componentDidMount() {
    storage
      .load({
        key: "bigSize"
      })
      .then(res => {
        if (res) {
          this.setState({
            bigSizeState: true
          });
        }
      }).catch(()=>{

      });
  }
  componentWillMount(){
    codePush.disallowRestart();
   }

  componentWillUnmount(){
    // Reallow重新启动，
    codePush.allowRestart();
  }
  switchBigSizeSelct = () => {
    global.storage
      .save({
        key: "bigSize",
        data: !this.state.bigSizeState
      })
      .then(() => {
        this.setState({
          bigSizeState: !this.state.bigSizeState
        });
      })
      .catch(() => {
        Tools.toast("系统异常,无法切换");
      });
  };
  clearCache = () => {
    //Todo  清楚缓存
    Tools.toast("开发中...敬请期待");
  };
  checkUpdates = () => {
    codePush.checkForUpdate().then((update) => {
        if (!update) {
          Tools.toast('应用是最新的')
        } else {
          Alert.alert(
            '发现可用更新',
            '是否更新到最新版本？',
            [
              // {text: '更新', onPress: () => codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE })},
              {text: '更新', onPress: () => {
                // codePush.sync()
              }},
              {text: '取消',  style: 'cancel'},
            ],
          )
        }
    });
  }; 
  render() {
    return (
      <Container style={{backgroundColor:this.props.theme.colors.containerBackground}}>
        <Content >
          <ListItem itemDivider  style={{backgroundColor:this.props.theme.colors.listBackground}}>
            <Text style={{color:this.props.theme.colors.text}}>常规</Text>
          </ListItem>
          <ListItem onPress={this.switchBigSizeSelct} last style={{backgroundColor:this.props.theme.colors.itemBackground}}>
            <Body>
              <Text  style={[styles.itemText,{color:this.props.theme.colors.item}]}>大字号</Text>
            </Body>
            <CheckBox
              checked={this.state.bigSizeState}
              onPress={this.switchBigSizeSelct}
            />
          </ListItem>
          <ListItem itemDivider style={{backgroundColor:this.props.theme.colors.listBackground}}>
            <Text style={{color:this.props.theme.colors.text}}>其他</Text>
          </ListItem>
          <ListItem onPress={this.clearCache}  last style={{backgroundColor:this.props.theme.colors.itemBackground}}>
              <Text  style={[styles.itemText,{color:this.props.theme.colors.item}]}>清楚缓存</Text>
          </ListItem>
          <ListItem onPress={this.checkUpdates}  last style={{backgroundColor:this.props.theme.colors.itemBackground}}>
            <Left>
              <Text style={[styles.itemText,{color:this.props.theme.colors.item}]}>检查更新</Text>
            </Left>
            <Right>
                <Text style={styles.version}>{this.state.version}</Text>
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
  itemText:{
    fontSize:16
  },
  version:{
    fontSize:16,
    color:'#999'
  }
});
