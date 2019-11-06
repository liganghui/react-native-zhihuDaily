/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Linking, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {observer, inject} from 'mobx-react';
import {Container, Content} from 'native-base';
@inject('theme') //引入主题Store (Mobx)
@observer //装饰器语法 , 将其转换成可观察的 (Mobx)
class About extends Component {
  static navigationOptions = ({screenProps}) => {
    return {
      title: '关于我们',
      headerStyle: {
        backgroundColor: screenProps.theme,
      },
    };
  };
  constructor(props) {
    super(props);
  }

  handleLinkOpen() {
    Linking.openURL(
      'https://github.com/liganghui/react-native-zhihuDaily/',
    ).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <Content style={{padding: 10}}>
            <Text style={{marginVertical: 10, fontSize: 18}}>请注意：</Text>
            <Text style={{lineHeight: 22}}>
              本应用为开源应用 ,
              在未经知乎日报官方授权下使用日报的数据API接口，仅限学习开发之用，请勿用于任何商业用途。
            </Text>
            <View
              style={{flexDirection: 'row', height: 50, alignItems: 'center'}}>
              <Text style={{marginVertical: 15}}>Github开源项目地址：</Text>
              <TouchableOpacity
                onPress={this.handleLinkOpen}
                style={{marginLeft: 5}}>
                <Icon
                  type="font-awesome"
                  name="github"
                  size={32}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}
export default About;
