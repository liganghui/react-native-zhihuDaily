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
  Button,
  H1,
  H2,
  H3
} from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
import LCCountDownButton from "../../componetns/CountDownButton";
import { Api, Tools, Axios, System } from "../../utils";
let countDown;
export default class index extends Component {
  static navigationOptions = ({ navigation,screenProps }) => {
    return {
      title: "注册",
      headerStyle:{
        backgroundColor:screenProps.theme
      },
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      passWord: null,
      repeatPassWord: null,
      pwdVisibility: false,
      phoneNum: this.props.navigation.getParam("phoneNum")
    };
  }
  componentDidMount() {
    //触发倒计时
    if (!countDown) {
      this.countDownButtonPressed();
    }
  }
  componentWillUnmount(){
    this.clearTime()
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
  countDownButtonPressed = () => {
    this.countDownButton.startCountDown();
  };
  switchStyle = (attribute, val1, val2) => {
    if (this.state.code && this.state.passWord && this.state.repeatPassWord) {
      return {
        [attribute]: val1
      };
    } else {
      return {
        [attribute]: val2
      };
    }
  };
  signOut = () => {
    if (!this.state.code || !this.state.passWord || !this.state.repeatPassWord) {
      Tools.toast("请完善注册信息");
      return
    }
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({ routeName: "SignIn" })
      ]
    });
    this.clearTime();
    // this.props.navigation.dispatch(resetAction);
    Tools.toast("注册成功，请登录");
  };
  clearTime=()=>{
    this.countDownButton.clearTime();
    countDown=null;
  }
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>验证码已发送至手机号：</Text>
            <H2>{this.state.phoneNum}</H2>
          </View>
          <Item style={styles.item}>
            <Label style={styles.label}>验证码</Label>
            <Input
              style={styles.input}
              placeholder="请输入验证码"
              placeholderTextColor={"#999"}
              clearButtonMode={"unless-editing"}
              autoComplete={"tel"}
              autoFocus={true}
              keyboardType={"numeric"}
              returnKeyType={"next"}
              onChangeText={text => {
                this.bindOnChangeText(text, "code");
              }}
              onSubmitEditing={() => this.pwdInput._root.focus()}
            />
            <LCCountDownButton
              beginText="获取验证码"
              endText="重新获取"
              count={60}
              pressAction={this.countDownButtonPressed}
              changeWithCount={count => {
                countDown = count;
                return count + "秒";
              }}
              id="register"
              ref={ref => {
                this.countDownButton = ref;
              }}
            />
          </Item>
          <Item inlineLabel error={false} style={styles.item}>
            <Label style={styles.label}>密码</Label>
            <Input
              style={styles.input}
              ref={input => (this.pwdInput = input)}
              placeholder="请输入密码"
              placeholderTextColor={"#999"}
              blurOnSubmit={true}
              secureTextEntry={this.state.pwdVisibility ? false : true}
              returnKeyType={"next"}
              onChangeText={text => {
                this.bindOnChangeText(text, "passWord");
              }}
              onSubmitEditing={() => this.repeatPwdInput._root.focus()}
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
          <Item inlineLabel error={false} style={styles.item}>
            <Label style={styles.label}>确认密码</Label>
            <Input
              style={styles.input}
              ref={input => (this.repeatPwdInput = input)}
              placeholder="请再次输入密码"
              placeholderTextColor={"#999"}
              blurOnSubmit={true}
              secureTextEntry={this.state.pwdVisibility ? false : true}
              returnKeyType={"go"}
              onChangeText={text => {
                this.bindOnChangeText(text, "repeatPassWord");
              }}
              onSubmitEditing={this.signOut}
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
            style={[
              styles.submitBtn,
              this.switchStyle("backgroundColor", "#00a2ed", "#eaeaea")
            ]}
            onPress={this.signOut}
          >
            <Text
              style={[
                styles.submitText,
                this.switchStyle("color", "#fff", "#494949")
              ]}
            >
              完成
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
  item: {
    marginTop: 20,
    paddingRight: 20,
    height: 50,
    borderColor: "#e8e8e8"
  },
  header:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  headerTitle:{
    marginVertical:15,
  },
  label: {
    marginLeft: 20
  },
  input: {
    fontSize: 14
  },
  submitText: {
    color: "#494949"
  },
  submitBtn: {
    borderRadius: 2,
    marginHorizontal: 40,
    justifyContent: "center",
    marginTop: 30
  }
});
