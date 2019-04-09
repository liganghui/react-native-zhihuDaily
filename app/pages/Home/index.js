import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  AppState
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Icon, Button } from "react-native-elements";
import { Api, Tools, Axios } from "../../config";
// 日报列表组件
import StoriesList from "../../componetns/StoriesList";
// 上滑触底加载状态
import PullUpLoad from "../../componetns/PullUpLoading";
// 集成触底和上拉加载的滚动容器
import MyScrollView from "../../componetns/ScrollView";
// 轮播图组件
import HomeSwiper from "./HomeSwiper";
import AutoHeightWebView from "react-native-autoheight-webview";

export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
      headerLeft: (
        <Button
          type="clear"
          title=""
          onPress={() => {
            navigation.openDrawer();
          }}
          icon={<Icon type="material" name="menu" size={24} color="white" />}
        />
      ),
      headerRight: (
        <View style={styles.headLeftWrapper}>
          <Button
            title=""
            type="clear"
            onPress={() => {
              navigation.navigate("Test");
            }}
            icon={
              <Icon
                type="ionicon"
                name="ios-calendar"
                size={24}
                color="white"
              />
            }
          />
          <Button
            title=""
            type="clear"
            icon={
              <Icon type="material" name="more-vert" size={24} color="white" />
            }
          />
        </View>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      stories: [], //列表数据
      topStories: [], //轮播图数据
      pullUpLoading: false, //上滑加载loading显示标识符
      title: "", //header标题
      refreshing: false, //下拉刷新loading显示标识符
      listHeight: [] //记录日报列表高度变化
    };
    this.props.navigation.setParams({ title: "首页" });
  }
  componentDidMount() {
    this._init();
  }
  _init() {
    // 根据网络状态初始化数据
    // 连接网络时 获取最新数据 ，无网络时显示缓存的数据
    NetInfo.getConnectionInfo().then(connectionInfo => {
      let type = connectionInfo.type == ("wifi" || "cellular") ? false : true;
      storage
        .load({ key: "latest", syncInBackground: type })
        .then(responseJson => {
          this._handleDataRender(responseJson);
        })
        .catch(error => {
          console.warn(error);
        });
    });
  }
  /*
   * 下拉刷新
   */
  bindOnRefresh() {
    // 下拉刷新请求最新数据
    this.setState({ refreshing: true });
    Axios.get(Api.latest)
      .then(responseJson => {
        this.setState({ refreshing: false });
        this._handleDataRender(responseJson.data);
      })
      .catch(error => {
        this.setState({ refreshing: false });
      });
  }

  /*
  * 处理首屏数据渲染
  * @oaram  {responseJson} data 数据对象
  */
  _handleDataRender(responseJson) {
    if (!responseJson || !responseJson.stories) {
      Tools.toast("服务器数据格式异常");
      return false;
    }
    // 读取数据访问状态
    responseJson.stories.map(item => {
      storage
        .load({
          key: "visited",
          id: item.id
        })
        // 标记已访问
        .then(res => {
          item.visited = true;
        })
        // 未访问
        .catch(error => {
          item.visited = false;
        });
    });
    let data = [
      {
        key: responseJson.date,
        data: responseJson.stories
      }
    ];
    this.setState({
      topStories: responseJson.top_stories,
      stories: data,
      listHeight: [] //重置列表高度数组
    });
  }

  /*
   *  上滑触底数据加载
   */
  pullupfresh = () => {
    //避免重复请求
    if (this.state.pullUpLoading) {
      return false;
    }
    this.setState({
      pullUpLoading: true
    });
    // 获得日期
    let beforeDay = this.state.stories[this.state.stories.length - 1].key;
    storage
      .load({
        key: "before",
        id: beforeDay
      })
      .then(responseJson => {
        if (!responseJson || !responseJson.stories) {
          Tools.toast("数据格式异常");
          return false;
        }
        // 获取数据访问状态
        responseJson.stories.map(item => {
          storage
            .load({
              key: "visited",
              id: item.id
            })
            .then(res => {
              item.visited = true;
            })
            .catch(error => {
              item.visited = false;
            });
        });
        // 合并数据
        let newData = this.state.stories.concat({
          key: responseJson.date,
          data: responseJson.stories
        });
        // 更新数据
        this.setState({ stories: newData }, () => {
          // 短暂地显示滚动指示器。 TODO: 函数无效
          // this.scrollView.flashScrollIndicators();
          // 等待数据渲染完成,避免loading状态早于渲染结束
          setTimeout(() => {
            this.setState({
              pullUpLoading: false
            });
          }, 550);
        });
      })
      .catch(error => {
        this.setState({
          pullUpLoading: false
        });
      });
  };
  /*
   * 监听列表项点击 跳转到详情页  记录点击状态
   * @param {Object} item 列表项
   */
  bindListTap = item => {
    // 页面跳转
    this.props.navigation.navigate("Details", {
      itemId: item.id
    });
    // 存储访问状态
    storage.save({
      key: "visited",
      id: item.id,
      data: true,
      expires: null
    }).then(()=>{
      // 更新访问状态
      // PS：这里需要将旧数据解构成一个新数组 , 可以避免setState不生效问题，因为setState是浅比较 。
      let stories=[...this.state.stories];
      stories.forEach((items)=>{
        items.data.forEach((i)=>{
          if(i.id==item.id){
            i.visited=true
            return false;
          }
        })
      })
      this.setState({
        stories
      })
    });
    
  };
  /*
   * 格式化分组标题日期
   *
   *  @param {String} val 日期字符串
   *  @return {String}  格式化后的日期
   */
  _formatDate(date) {
    let currentDate = Tools.getDate();
    if (currentDate == date) {
      return "今日热闻";
    } else {
      return String(date).length == 8
        ? Tools.formatMonthDay(date) + " " + Tools.formatWeek(date)
        : null;
    }
  }
  /*
   * 滚动监听
   * 跟随滚动位置更新Header标题
   * @param {Object} event 滚动事件
   */

  bindOnScroll(event) {
    // 减去标题和轮播图高度
    let y = event.nativeEvent.contentOffset.y - 230;
    let heightArr = this.state.listHeight;
    if (y < 0) {
      this.props.navigation.setParams({ title: "首页" });
    } else {
      for (let i = 0; i < heightArr.length; i++) {
        if (heightArr[i] >= y) {
          let title = this._formatDate(this.state.stories[i].key);
          if (this.props.navigation.getParam({ title }) !== title) {
            this.props.navigation.setParams({ title });
          }
          break;
        }
      }
    }
  }
  /*
   * 监听列表高度变化
   * @param {Object} event 列表高度数值
   */
  listenListHeight(event) {
    var { x, y, width, height } = event.nativeEvent.layout;
    let heightArr = this.state.listHeight;
    heightArr.push(Number.parseInt(height));
    // 每次组件高度变化 实际上会触发两次函数 , 只取组件渲染完毕后的高度。
    if (heightArr.length > this.state.stories.length) {
      heightArr.splice(heightArr.length - 2, 1);
    }
    this.setState({
      listHeight: heightArr
    });
  }

  /*
   * 监听监听应用状态的变化
   */
  _handleAppStateChange = nextAppState => {
    // 当切换到后台时,更新状态
    if (nextAppState === "background") {
        // .....
    }
  };
  /*
   *  日报列表分组头部组件
   *  @param  {Object}   分组日报数据
   */
  renderSectioHeader = items => {
    return (
      <Text style={styles.sectionTitle}>
        {this._formatDate(items.section.key)}
      </Text>
    );
  };
  render() {
    return (
      <MyScrollView
        ref={ref => (this.scrollView = ref)}
        pullupfresh={this.pullupfresh}
        onScroll={this.bindOnScroll.bind(this)}
        refreshing={this.state.refreshing}
        onRefresh={this.bindOnRefresh.bind(this)}
      >
        <HomeSwiper data={this.state.topStories} onPress={this.bindListTap} />
        <StoriesList
          ref={listView => (this.listView = listView)}
          data={this.state.stories}
          onLayout={this.listenListHeight.bind(this)}
          onPress={this.bindListTap}
          sectionHeader={this.renderSectioHeader}
        />
        {this.state.stories.length > 0 ? (
          <PullUpLoad loading={this.state.pullUpLoading} />
        ) : null}
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
  headLeftWrapper: {
    flexDirection: "row"
  }
});
