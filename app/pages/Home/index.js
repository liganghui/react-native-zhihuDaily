import React, { Component } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl
} from "react-native";
import { Header, Icon, Button } from "react-native-elements";
// 数据接口
import API from "../../config/api";
// 函数工具库 
import TOOLS from "../../config/tools";
// 日报列表组件
import StoriesList from "../../componetns/StoriesList";
// 上滑触底加载状态
import PullUpLoad from "../../componetns/PullUpLoading";
// 集成触底和上拉加载的滚动容器 
import MyScrollView from "../../componetns/ScrollView";
// 轮播图组件
import HomeSwiper from "./HomeSwiper";

export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '首页'),
      headerLeft:(
        <Button
          type="clear"
          title=""
          onPress={()=>{navigation.openDrawer()}}
          icon={
          <Icon
            type="material"
            name="menu"
            size={24}
            color="white"
          />
        }
      />
      ),
      headerRight:(
        <View style={styles.headLeftWrapper}>
         <Button title=""type="clear" icon={
          <Icon
            type="ionicon"
            name="ios-calendar"
            size={24}
            color="white"
          />
        }
      />
        <Button title="" type="clear" icon={
            <Icon
              type="material"
              name="more-vert"
              size={24}
              color="white"
            />
          }
        />
     </View>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      topStories: [],
      pullUpLoading: false,
      title: "",
      refreshing: false
    };
  }
  componentDidMount() {
      this._init()
  }
  _init() {
    fetch(API.latest)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          topStories: responseJson.top_stories,
          stories: [
            {
              key: responseJson.date,
              data: responseJson.stories
            }
          ]
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  /* 
   *  上滑触底数据加载
   */
  pullupfresh=()=>{
    //避免重复请求
    if (this.state.pullUpLoading) {
      return false;
    }
    this.setState({
      pullUpLoading:true
    });
    // 获得请求日期
    let beforeDay = this.state.stories[this.state.stories.length - 1].key;
    fetch(API.before + beforeDay)
      .then(response => response.json())
      .then(responseJson => {
        // 合并数据
        let newData = this.state.stories.concat({
          key: responseJson.date,
          data: responseJson.stories
        });
        // 更新数据
        this.setState({
          stories: newData,
        });
        // 等待数据渲染完成,避免loading状态早于渲染结束
        setTimeout(()=>{
          this.setState({
            pullUpLoading: false,
          });
        },350)
      })
      .catch(error => {
        this.setState({
          pullUpLoading:false
        });
        console.warn(error);
      });
  }


  /*
    监听列表点击
    @param {Number} ID 日报ID
  */
  handleListTap=(id)=> {
    this.props.navigation.navigate("Details", {
      itemId: id
    });
  }

  /*
     下拉刷新
  */ 
  onRefresh = () => {
    // TODO : 日报下拉刷新
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 500);
  };

 
  /*
  * 格式化分组标题日期
  *
  *  @param {String} val 日期字符串
  *  @return {String}  格式化后的日期
  */
  _formatDate (date){
      let currentDate=TOOLS.getDate();
      if(currentDate===date){
        return "今日热闻";
      }else{
        return  TOOLS.formatMonthDay(date)+" "+TOOLS.formatWeek(date);
      }
    }
  // 日报列表分组头部组件
  // @param  {Object}   分组日报数据
  renderSectioHeader=(items)=>{
    return <Text style={styles.sectionTitle}>{this._formatDate(items.section.key)}</Text>
  }
  
  render() {
    return (
      <MyScrollView pullupfresh={this.pullupfresh} refreshing={this.state.refreshing} onRefresh={this.onRefresh}>
        <HomeSwiper data={this.state.topStories} />
        <StoriesList data={this.state.stories}   bindOnPress={this.handleListTap}  sectionHeader={this.renderSectioHeader} />
        {
          this.state.stories.length>0?
          <PullUpLoad loading={this.state.pullUpLoading} />
          :
          null
        }
      </MyScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 15,
    color: "#999"
  },
  headLeftWrapper:{
    flexDirection:'row',
  }
});
