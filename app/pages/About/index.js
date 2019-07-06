import React, { Component } from "react";
import { View, StyleSheet, Linking, TouchableOpacity ,ScrollView} from "react-native";
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
        <ScrollView>
        <Content style={{ padding: 10 }}>
          <Text style={{ marginVertical: 10, fontSize: 18 }}>请注意：</Text>
          <Text style={{ lineHeight: 22 }}>
            本应用为开源应用 ,
            在未经知乎日报官方授权下使用日报的数据API接口，仅限学习开发之用，请勿用于任何商业用途。
          </Text>
          <View style={{ flexDirection: "row" , height:50,alignItems: 'center',}}>
            <Text style={{ marginVertical: 15 }}>Github开源项目地址：</Text>
            <TouchableOpacity onPress={this.handleLinkOpen} style={{ marginLeft:5 }}>
              <Icon type='font-awesome' name='github' size={32} color='#000' />
            </TouchableOpacity>
          </View>

          <Text style={{ marginTop:20, fontSize: 16 }}>更新日志</Text>
          <Text style={{ marginLeft: 5,marginVertical:5,}}>----2019/07/10</Text>
          <Text style={{ marginLeft: 20}}>· 动态应用启动屏图片（图片来源：必应搜索）</Text>
          <Text style={{ marginLeft: 20}}>· 增加清楚缓存</Text>
          <Text style={{ marginLeft: 20}}>· 增加意见反馈</Text>
          <Text style={{ marginLeft: 20}}>· 增加详情页左右滑动切换</Text>
          <Text style={{ marginLeft: 20}}>· 部分日报栏目支持日期选择</Text>
          <Text style={{ marginLeft: 20}}>· 除详情页外其他页面开启右滑返回</Text>
          <Text style={{ marginLeft: 20}}>· 其他细节优化</Text>
          <Text style={{ marginLeft: 30}}>--- 已知BUG</Text>
          <Text style={{ marginLeft: 40}}>* 部分机型下 : 启动屏图片加载异常,日报详情页样式加载异常，应用无法正常使用</Text>
          <Text style={{ marginLeft: 40}}>· 应用打开闪退（偶发）</Text>
          <Text style={{ marginLeft: 40}}>· 当天启动屏图片加载异常，显示黑块（偶发）</Text>

          
          <Text style={{ marginLeft: 5,marginVertical:5,}}>----2019/06/17</Text>
          <Text style={{ marginLeft: 20}}>· 增加侧边栏 栏目入口</Text>
          <Text style={{ marginLeft: 20}}>· 随机日报 增加刷新按钮</Text>
          <Text style={{ marginLeft: 5,marginVertical:5,}}>----2019/06/16</Text>
          <Text style={{ marginLeft: 20}}>· 解决评论页闪退问题</Text>
        </Content>
        </ScrollView>
      </Container>
    );
  }
}
