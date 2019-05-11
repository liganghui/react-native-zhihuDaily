import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View
} from "react-native";
import {
  Container,
  Content,
  ListItem,
  CheckBox,
  Body,
} from "native-base";
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
      bigSizeState: null
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
      });
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
    //Todo  版本更新
    Tools.toast("开发中...敬请期待");
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
          <ListItem onPress={this.clearCache} last style={{backgroundColor:this.props.theme.colors.itemBackground}}>
            <Body>
              <Text  style={[styles.itemText,{color:this.props.theme.colors.item}]}>清楚缓存</Text>
            </Body>
          </ListItem>
          <ListItem onPress={this.checkUpdates} last style={{backgroundColor:this.props.theme.colors.itemBackground}}>
            <Body>
              <Text style={[styles.itemText,{color:this.props.theme.colors.item}]}>检查更新</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
  itemText:{
    fontSize:16
  }
});
