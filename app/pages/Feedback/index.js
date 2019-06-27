import React, { Component } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import {
  Container,
  Content,
  Input,
  Form,
  Label,
  Button,
  Item,
  Textarea
} from "native-base";
import { observer, inject } from "mobx-react";
import { Api, Tools, Axios, System } from "../../utils";


@inject("theme")
@observer
export default class index extends Component {
    static navigationOptions = ({ navigation,screenProps }) => {
        return {
          title: '填写反馈',
          headerStyle:{
            backgroundColor:screenProps.theme
          },
    
        };
      };
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      content: null
    };
  }
  push() {
      if(!this.state.content){
        Tools.toast("请填写反馈内容");
      }else{

      }
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Textarea
              rowSpan={6}
              bordered
              onChangeText={(text) => this.setState({content:text})}
              placeholder="如果您想对应用提出意见或建议，请在这里填写，您的意见是我们前进的动力！"
              placeholderTextColor="#999"
            />
            <Item inlineLabel>
              <Label  style={styles.input}>您的邮箱</Label>
              <Input placeholder="建议您留下邮箱地址，便于我们回复您" style={styles.input}     onChangeText={(text) => this.setState({email:text})}   placeholderTextColor="#999"/>
            </Item>
          </Form>
          <Button
            full
            style={[styles.submitBtn, { backgroundColor: "#00a2ed" }]}
            onPress={this.push.bind(this)}
           >
            <Text style={[styles.submitText, { color: "#fff" }]}>提交反馈</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
    submitBtn: {
      borderRadius: 2,
      marginHorizontal: 30,
      justifyContent: "center",
      marginTop: 30
    },
    input: {
        fontSize: 14
      },
    submitText: {
      color: "#494949"
    }
  });
  