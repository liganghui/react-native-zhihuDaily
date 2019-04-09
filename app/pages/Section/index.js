import React, { Component } from "react";
import NetInfo from "@react-native-community/netinfo";

// 集成触底和上拉加载的滚动容器
import MyScrollView from "../../componetns/ScrollView";
// 日报列表组件
import StoriesList from "../../componetns/StoriesList";
import { Tools } from "../../config";

export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
    };
  };
  constructor(props) {
    super(props);
    let id = this.props.navigation.getParam("id")||null;
    let title = this.props.navigation.getParam("title")||null;
    this.state = {
      sectionId:id,
      stories: [], //栏目列表数据
    };
    this.props.navigation.setParams({title});
  }
  componentDidMount() {
    this._init();
  }
  _init() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      let type = connectionInfo.type == ("wifi" || "cellular") ? false : true;
      storage
        .load({ key: "section", id: this.state.sectionId, syncInBackground: type })
        .then(responseJson => {
          this._handleDataRender(responseJson);
        })
        .catch(error => {
          console.warn(error);
        });
    });
  }
  _handleDataRender(res){
    if(res.stories&&res.timestamp){
      let sectionData = [
        {
          key: res.timestamp,
          data: res.stories
        }
      ];
      sectionData[0].data.forEach((item,index) => {
        storage
          .load({
            key: "visited",
            id: item.id
          })
          .then(res => {
            // 标记已访问
            item.visited = true;
          })
          // 未访问
          .catch(error => {
            item.visited = false;
          });
          // load是异步方法 , 等待至最后再更新页面
          if(index===res.stories.length-1){
            this.setState({
              stories: sectionData,
            });
          }
      });
    }
  }
  bindListTap(){
    console.warn('触发点击')
  }
  pullupfresh(){
    console.warn('触发下拉刷新')
  }
  render() {
    return (
        <MyScrollView  pullupfresh={this.pullupfresh}>
        <StoriesList
          data={this.state.stories}
          onPress={this.bindListTap}
        ></StoriesList>
      </MyScrollView>
    )
  }
}
