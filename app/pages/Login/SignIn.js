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
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button
} from "native-base";
import Spinner from "react-native-spinkit";

import { Api, Tools, Axios, System } from "../../utils";
export default class index extends Component {
  static navigationOptions = ({ navigation,screenProps }) => {
    return {
      title: "登录",
      headerStyle:{
        backgroundColor:screenProps.theme
      },
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      pwdVisibility: false,
      userName: null,
      passWord: null,
      signInLoading: false
    };
  }
  bindOnChangeText = (text, name) => {
    this.setState({
      [name]: text
    });
  };
  switchPwdVisibility = () => {
    this.setState({
      pwdVisibility: !this.state.pwdVisibility
    });
  };
  /*
   * 模拟登录效果
   */
  signIn = () => {
    if (!this.state.passWord || !this.state.userName) {
      Tools.toast("请填写账户信息");
    } else {
      this.setState({
        signInLoading: true
      });

      storage
        .save({
          key: "userToken",
          data: {
            name: "测试001",
            avatar:
              "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
          },
        })
        .then(() => {
          setTimeout(() => {
            this.setState(
              {
                signInLoading: false
              },
              () => {
                  Tools.toast("登录成功");
                  this.props.navigation.navigate("Home");
              }
            );
          }, 1000);
        })
        .catch(err => {
          this.setState({
            signInLoading: false
          });
          Tools.toast("登录失败");
        });
    }
  };
  render() {
    return (
      <Container>
        <Content>
          <Form style={styles.inputContainer}>
            <Item inlineLabel style={styles.item}>
              <Label>账号</Label>
              <Input
                style={styles.input}
                placeholder="请输入手机号登录"
                placeholderTextColor={"#999"}
                clearButtonMode={"unless-editing"}
                autoComplete={"tel"}
                autoFocus={true}
                keyboardType={"numeric"}
                returnKeyType={"next"}
                onChangeText={text => {
                  this.bindOnChangeText(text, "userName");
                }}
                onSubmitEditing={() => this.secondTextInput._root.focus()}
              />
            </Item>
            <Item inlineLabel error={false} style={styles.item}>
              <Label>密码</Label>
              <Input
                style={styles.input}
                ref={input => (this.secondTextInput = input)}
                placeholder="请输入密码"
                placeholderTextColor={"#999"}
                blurOnSubmit={true}
                secureTextEntry={this.state.pwdVisibility ? false : true}
                returnKeyType={"go"}
                onChangeText={text => {
                  this.bindOnChangeText(text, "passWord");
                }}
                onSubmitEditing={this.signIn}
              />
              <TouchableOpacity onPress={this.switchPwdVisibility}>
                <Icon
                  type="MaterialIcons"
                  name="remove-red-eye"
                  style={[
                    styles.icon,
                    this.state.pwdVisibility
                      ? { color: "#333" }
                      : { color: "#999" }
                  ]}
                />
              </TouchableOpacity>
            </Item>
            <Button
              full
              style={[styles.submitBtn, this.state.userName&&this.state.passWord
                ? { backgroundColor: "#00a2ed" }
                : { backgroundColor: "#eaeaea" }]}
              onPress={!this.state.signInLoading ? this.signIn : null}
            >
              {this.state.signInLoading ? (
                <Spinner size={24} type={"FadingCircleAlt"} color={"#fff"} />
              ) : (
                <Text style={[styles.submitText, this.state.userName&&this.state.passWord
                  ? { color: "#fff" }
                  : { color: "#494949"}]}>登录 </Text>
              )}
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
  inputContainer: {
    marginTop: 40
  },
  item: {
    height: 60,
    borderColor: "#e8e8e8"
  },
  input: {
    fontSize: 14
  },
  submitBtn: {
    borderRadius: 2,
    marginHorizontal: 30,
    justifyContent: "center",
    marginTop: 30
  },
  submitText: {
    color: "#494949"
  },
  icon: {
    marginRight: 20
  }
});
