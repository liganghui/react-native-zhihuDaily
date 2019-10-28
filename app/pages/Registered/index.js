/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Container, Content, Item, Input, Label, Button} from 'native-base';
import {Tools} from '../../utils';
export default class index extends Component {
  static navigationOptions = ({screenProps}) => {
    return {
      title: '注册',
      headerStyle: {
        backgroundColor: screenProps.theme,
      },
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: null,
    };
  }
  gotoJoin = () => {
    if (!this.state.phoneNum) {
      Tools.toast('请填写手机号');
    } else {
      this.props.navigation.navigate('Join', {
        phoneNum: this.state.phoneNum,
      });
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Item inlineLabel laster style={styles.item}>
            <Label style={styles.label}>手机号</Label>
            <Input
              style={styles.input}
              placeholder="填写手机号"
              placeholderTextColor={'#999'}
              clearButtonMode={'unless-editing'}
              autoComplete={'tel'}
              autoFocus={true}
              keyboardType={'numeric'}
              returnKeyType={'go'}
              onChangeText={text => {
                this.setState({
                  phoneNum: text,
                });
              }}
              onSubmitEditing={this.gotoJoin}
            />
          </Item>
          <Button
            full
            style={[
              styles.submitBtn,
              this.state.phoneNum
                ? {backgroundColor: '#00a2ed'}
                : {backgroundColor: '#eaeaea'},
            ]}
            onPress={this.gotoJoin}>
            <Text
              style={[
                styles.submitText,
                this.state.phoneNum ? {color: '#fff'} : {color: '#494949'},
              ]}>
              获取验证码
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
    height: 60,
    borderColor: '#e8e8e8',
  },
  label: {
    marginLeft: 20,
  },
  input: {
    fontSize: 14,
  },
  submitText: {
    color: '#494949',
  },
  submitBtn: {
    borderRadius: 2,
    marginHorizontal: 40,
    justifyContent: 'center',
    marginTop: 30,
  },
});
