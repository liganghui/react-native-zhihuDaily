import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Input,
  Form,
  Label,
  Item,
  Textarea,
} from 'native-base';
import {observer, inject} from 'mobx-react';
import {Button} from 'react-native-elements';
import {Tools, Axios} from '../../utils';

@inject('theme')
@observer
class index extends Component {
  static navigationOptions = ({screenProps}) => {
    return {
      title: '填写反馈',
      headerStyle: {
        backgroundColor: screenProps.theme,
      },
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      content: null,
      loading: false,
    };
  }
  push() {
    if (!this.state.content) {
      Tools.toast('请填写反馈内容');
    } else {
      this.setState({
        loading: true,
      });
      Axios.post('http://106.52.75.247:3000/feedback', {
        email: this.state.email,
        content: this.state.content,
      })
        .then(res => {
          this.setState({
            loading: false,
          });
          if (res && res.data.msg) {
            Tools.toast(res.data.msg);
            if (!res.data.errorcode) {
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 600);
            }
          } else {
            Tools.toast('服务器异常,请稍后重试');
          }
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    }
  }
  render() {
    return (
      <Container
        style={{backgroundColor: this.props.theme.colors.containerBackground}}>
        <Content>
          <Form>
            <Textarea
              rowSpan={6}
              bordered
              onChangeText={text => this.setState({content: text})}
              placeholder="如果您想对应用提出意见或建议，请在这里填写，您的意见是我们前进的动力！"
              placeholderTextColor="#999"
            />
            <Item inlineLabel>
              <Label style={styles.input}>您的邮箱</Label>
              <Input
                placeholder="建议您留下邮箱地址，便于我们回复您"
                type="email"
                style={styles.input}
                onChangeText={text => this.setState({email: text})}
                placeholderTextColor="#999"
              />
            </Item>
          </Form>
          <Button
            title="提交反馈"
            containerStyle={styles.submitBtn}
            buttonStyle={{
              backgroundColor: this.props.theme.colors.submitButtonBackground,
            }}
            onPress={this.push.bind(this)}
            loading={this.state.loading}
          />
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
  submitBtn: {
    borderRadius: 2,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: 30,
  },
  input: {
    fontSize: 14,
  },
  submitText: {
    color: '#494949',
  },
});
export default index;
