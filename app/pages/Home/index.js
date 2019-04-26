import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  AppState,
  Platform,
  TouchableNativeFeedback
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Icon, Button } from "react-native-elements";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";
import DateTimePicker from "react-native-modal-datetime-picker"; 
import { Api, Tools, Axios } from "../../config";
// 日报列表组件
import StoriesList from "../../componetns/StoriesList";
// 上滑触底加载状态
import PullUpLoad from "../../componetns/PullUpLoading";
// 集成触底和上拉加载的滚动容器
import MyScrollView from "../../componetns/ScrollView";
// 轮播图组件
import HomeSwiper from "./HomeSwiper";

let that;//保存This引用
export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
      headerLeft: (
        <Button
          type="clear"
          onPress={() => {
            navigation.openDrawer();
          }}
          icon={<Icon type="material" name="menu" size={24} color="white" />}
        />
      ),
      headerRight: (
        <View style={styles.headerRightWrapper}>
          <Button
            type="clear"
            onPress={() => {
              navigation.navigate("Test");
            }}
            icon={
              <Icon
                type="material"
                name="help-outline"
                size={24}
                color="white"
              />
            }
          />
          <Button
            type="clear"
            onPress={() => {
              that.toggleDateTimePicker()
            }}
            icon={
              <Icon
                type="antdesign"
                name="calendar"
                size={24}
                color="white"
              />
            }
          />
          <Button
            type="clear"
            onPress={() => {
              that.tooglePopupMenu();
            }}
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
      listHeight: [], //记录日报列表高度变化
      opened:false, //控制Header弹出菜单显示
      isDateTimePickerVisible: false //控制日期选择控件
    };
    this.props.navigation.setParams({ title: "首页" });
    that = this;
  }
  componentDidMount() {
    this.init();
    // 监听应用状态(后台运行/前台运行)
    AppState.addEventListener("change", this.handleAppStateChange);
    // 用于记录日报详情页 访问状态
    global.storage.save({
      key: "first",
      data: true
    });
    // 传递到navigation (navigation中无法使用this调用)
    this.props.navigation.setParams({ tooglePopupMenu: this.tooglePopupMenu });
  }
  init() {
    // 根据网络状态初始化数据
    // 连接网络时 获取最新数据 ，无网络时显示缓存的数据
    Tools.getNetworkState().then(newWorkInfo => {
      let syncInBackgroundState=!newWorkInfo.online;
      storage
        .load({ key: "latest",syncInBackground: syncInBackgroundState })
        .then(responseJson => {
          this.handleDataRender(responseJson);
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
        this.handleDataRender(responseJson.data);
      })
      .catch(error => {
        this.setState({ refreshing: false });
      });
  }

  /*
   * 处理首屏数据渲染
   * @oaram  {responseJson} data 数据对象
   */
  handleDataRender(responseJson) {
    if (!responseJson || !responseJson.stories) {
      Tools.toast("服务器数据格式异常");
      return false;
    }
    // 读取数据访问状态
    this.updateVistedState(responseJson.stories, res => {
      let data = [
        {
          key: responseJson.date,
          data: res
        }
      ];
      this.setState({
        topStories: responseJson.top_stories,
        stories: data,
        listHeight: [] //重置列表高度数组
      });
    });
  }

  /*
   * 更新列表项访问状态
   * @param {Object} lsitData 列表数据对象
   * @param {Function} callback 回调函数
   */
  updateVistedState(listData, callback) {
    listData.map((item, index) => {
      storage
        .load({
          key: "visited",
          id: item.id
        })
        .then(res => {
          // 标记已访问
          item.visited = true;
          if (index === listData.length - 1) {
            callback(listData);
          }
        })
        // 未访问
        .catch(error => {
          item.visited = false;
          if (index === listData.length - 1) {
            callback(listData);
          }
        });
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
        this.updateVistedState(responseJson.stories, res => {
          // 合并数据
          let newData = this.state.stories.concat({
            key: responseJson.date,
            data: res
          });
          // 更新数据
          this.setState({ stories: newData }, () => {
            // 等待数据渲染完成,避免loading状态早于渲染结束
            setTimeout(() => {
              this.setState({
                pullUpLoading: false
              });
            }, 550);
          });
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
      id: item.id
    });
    // 存储访问状态
    storage
      .save({
        key: "visited",
        id: item.id,
        data: true,
        expires: null
      })
      .then(() => {
        // 更新访问状态
        // PS：这里需要将旧数据解构成一个新数组 , 可以避免setState不生效问题，因为setState是浅比较 。
        let stories = [...this.state.stories];
        stories.forEach(items => {
          items.data.forEach(i => {
            if (i.id == item.id) {
              i.visited = true;
              return false;
            }
          });
        });
        this.setState({
          stories
        });
      });
  };

  /*
   * 格式化分组标题日期
   *
   *  @param {String} val 日期字符串
   *  @return {String}  格式化后的日期
   */
  formatDate(date) {
    let currentDate = Tools.formatDay().split('-').join('');
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
          let title = this.formatDate(this.state.stories[i].key);
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
  handleAppStateChange = nextAppState => {
    // 当切换到后台时,更新状态
    if (nextAppState === "background") {
      global.storage.save({
        key: "first",
        data: true
      });
    } else if (nextAppState === "active") {
      // 当应用从后台切换到 并且仅有一页数据时 会刷新页面.
      if (this.state.stories.length <= 1) {
        this.init();
      }
    }
  };
  /*
   * 控制弹出菜单切换显示
   */
  tooglePopupMenu() {
    that.setState({
      opened: !that.state.opened
    });
  }
  toggleDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
  };
  handleDatePicked = date => {
    let dateStr=Tools.formatDay(date).split('-').join('');
    this.props.navigation.navigate("Section", {
      date: dateStr,
    });
    that.toggleDateTimePicker();
  };
  /*
   *  日报列表分组头部组件
   *  @param  {Object}   分组日报数据
   */
  renderSectioHeader = items => {
    return (
      <Text style={styles.sectionTitle}>
        {this.formatDate(items.section.key)}
      </Text>
    );
  };
  /*
   * 渲染右上角自定义菜单
   */
  renderCustomMenu = props => {
    const { style, children, layouts, ...other } = props;
    const position = { top: 0, right: 0 };
    return (
      <View {...other} style={[style, position]}>
        {children}
      </View>
    );
  };

  render() {
    return (
      <MyScrollView
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

        {/* Header弹出选择菜单 */}
        <Menu
          opened={this.state.opened}
          style={styles.popupWrapper}
          onBackdropPress={this.tooglePopupMenu.bind(this)}
        >
          <MenuTrigger />
          <MenuOptions
            customStyles={{
              optionsContainer: styles.popupOptionsContainer,
              optionText: styles.popupOptionText
            }}
          >
            <MenuOption onSelect={() => alert(`点击夜间模式`)} text="夜间模式" />
            <MenuOption onSelect={() => alert(`点击设置选项`)} text="设置选项" />
          </MenuOptions>
        </Menu>
        {/* 日期选择器 */}
        <DateTimePicker
          // 最大日期
          maximumDate={Number(Tools.formatTime().split(':')[0])>=7?new Date():new Date(new Date().getTime() - 24*60*60*1000)}
          // 最小日期
          minimumDate={new Date(2013,10,20)}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.toggleDateTimePicker}
        />
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
  headerRightWrapper: {
    justifyContent: "space-between",
    // width: 90,
    width: 130,
    flexDirection: "row"
  },
  popupWrapper: {
    position: "absolute",
    right: 5,
    top: -50
  },
  popupOptionsContainer: {
    width: 180,
    paddingLeft: 5
  },
  popupOptionText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 30
  }
});
