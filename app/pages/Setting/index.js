import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Body,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button
} from "native-base";
import { Api, Tools, Axios, System } from "../../config";
export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "设置"
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
      <Container>
        <Content>
          <ListItem itemDivider>
            <Text>常规</Text>
          </ListItem>
          <ListItem onPress={this.switchBigSizeSelct}>
            <Body>
              <Text>大字号</Text>
            </Body>
            <CheckBox
              checked={this.state.bigSizeState}
              onPress={this.switchBigSizeSelct}
            />
          </ListItem>
          <ListItem itemDivider>
            <Text>其他</Text>
          </ListItem>
          <ListItem onPress={this.clearCache}>
            <Body>
              <Text>清楚缓存</Text>
            </Body>
          </ListItem>
          <ListItem onPress={this.checkUpdates}>
            <Body>
              <Text>检查更新</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({});
