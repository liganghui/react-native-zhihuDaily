import React, { Component } from "react";
import { View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Icon, Text, Button } from "react-native-elements";
import { Tools } from "../../utils";
import { observer, inject } from "mobx-react";
import { Container, Header, Title, Content } from "native-base";
@inject("theme") //引入主题Store (Mobx)
@observer //装饰器语法 , 将其转换成可观察的 (Mobx)
export default class index extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: "关于我们",
      headerStyle: {
        backgroundColor: screenProps.theme
      }
    };
  };
  constructor(props) {
    super(props);
  }

  handleLinkOpen() {
    Linking.openURL(
      "https://github.com/liganghui/react-native-zhihuDaily/tree/simple"
    ).catch((err) => console.error("An error occurred", err));
  }

  render() {
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          <Text style={{ marginVertical: 10, fontSize: 18 }}>请注意：</Text>
          <Text style={{ lineHeight: 22 }}>
            本应用为开源应用 ,
            在未经知乎日报官方授权下使用日报的数据API接口，仅限学习开发之用，请勿用于任何商业用途。
          </Text>
          <View style={{ flexDirection: "row" , height:50,alignItems: 'center',}}>
            <Text style={{ marginVertical: 15 }}>Github开源地址：</Text>
            <TouchableOpacity onPress={this.handleLinkOpen} style={{ marginLeft:5 }}>
              <Icon type='font-awesome' name='github' size={32} color='#000' />
            </TouchableOpacity>
          </View>
          <Text>意见反馈邮箱：lsalol@foxmail.com</Text>

          <Text style={{ marginTop:20, fontSize: 16 }}>更新日志</Text>
          <Text style={{ marginLeft: 5,marginVertical:5,}}>----2019/06/16 v1.0.3---</Text>
          <Text style={{ marginLeft: 20}}>· 解决评论页闪退问题</Text>
        </Content>
      </Container>
    );
  }
}
