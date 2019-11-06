/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
// 集成触底和上拉加载的滚动容器
import MyScrollView from '../../componetns/ScrollView';
// 日报列表组件
import StoriesList from '../../componetns/StoriesList';
import {Tools, Axios, Api} from '../../utils';
import DateTimePicker from 'react-native-modal-datetime-picker';
let that; //保存This引用
class Section extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: navigation.getParam('title'),
      headerStyle: {
        backgroundColor: screenProps.theme,
      },
      headerRight: (
        <View
          style={[
            styles.headerRightWrapper,
            navigation.getParam('dateSelect')
              ? {justifyContent: 'space-between'}
              : {justifyContent: 'flex-end'},
          ]}>
          {navigation.getParam('dateSelect') ? (
            <Button
              type="clear"
              onPress={() => {
                that.toggleDateTimePicker();
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
          ) : null}
          {navigation.getParam('date') || navigation.getParam('dateSelect') ? (
            <Button
              type="clear"
              onPress={() => {
                that.restList(navigation.getParam('startTime') || '2013-10-20');
              }}
              icon={
                <Icon
                  type="material"
                  name="refresh"
                  size={24}
                  color="white"
                  containerStyle={{marginRight: 20}}
                />
              }
            />
          ) : null}
        </View>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      sectionId: this.props.navigation.getParam('id'),
      date: this.props.navigation.getParam('date'),
      pullUpLoading: false,
      stories: [], //栏目列表数据
      loading: false,
      finished: false,
      minimumDate: this.props.navigation.getParam('startTime') || '2013-10-23',
      isDateTimePickerVisible: false, //控制日期选择控件显示
    };
    that = this;
    let title = this.props.navigation.getParam('title') || null;
    this.props.navigation.setParams({title});
    this.props.navigation.setParams({loading: this.state.loading});
  }
  componentDidMount() {
    // 根据参数区分加载 日报列表或栏目列表
    if (this.state.date) {
      this.initdaliyList();
    } else if (this.state.sectionId) {
      this.initSectionList();
    } else {
      Tools.toast('加载失败，参数异常');
    }
  }

  initBeforeList(id, date) {
    Axios.get(`${Api.section}${id}/before/${date}`)
      .then(responseJson => {
        this.handleDataRender(responseJson.data, res => {
          let sectionData = [
            {
              key: responseJson.data.timestamp,
              data: res,
            },
          ];
          this.setState({
            stories: sectionData,
          });
        });
      })
      .catch(_error => {});
  }

  initdaliyList() {
    storage
      .load({
        key: 'before',
        id: this.state.date,
      })
      .then(responseJson => {
        this.handleDataRender(responseJson, res => {
          let sectionData = [
            {
              key: responseJson.date,
              data: res,
            },
          ];
          this.setState({
            stories: sectionData,
          });
        });
      })
      .catch(_error => {});
  }
  initSectionList() {
    Tools.getNetworkState().then(newWorkInfo => {
      let syncInBackgroundState = !newWorkInfo.online;
      storage
        .load({
          key: 'section',
          id: this.state.sectionId,
          syncInBackground: syncInBackgroundState,
        })
        .then(responseJson => {
          this.handleDataRender(responseJson, res => {
            let sectionData = [
              {
                key: responseJson.timestamp,
                data: res,
              },
            ];
            this.setState({
              stories: sectionData,
            });
          });
        })
        .catch(_error => {});
    });
  }

  handleDataRender(responseJson, callback) {
    if (responseJson.stories) {
      this.updateVistedState(responseJson.stories, res => {
        callback(res);
      });
    } else {
      Tools.toast('加载失败，数据异常');
    }
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
          key: 'visited',
          id: item.id,
        })
        .then(_res => {
          // 标记已访问
          item.visited = true;
          if (index === listData.length - 1) {
            callback(listData);
          }
        })
        // 未访问
        .catch(_error => {
          item.visited = false;
          if (index === listData.length - 1) {
            callback(listData);
          }
        });
    });
  }
  /*
   * 监听列表项点击 跳转到详情页  记录点击状态
   * @param {Object} item 列表项
   */
  bindListTap = item => {
    // 页面跳转
    let idArray = []; //日报ID数组
    let selectdIndex; //点击项的数组下标
    this.state.stories.forEach(items => {
      items.data.forEach(el => {
        idArray.push({
          id: el.id,
          selected: el.id === item.id ? true : false,
        });
      });
    });
    idArray.forEach((el, index) => {
      if (el.id === item.id) {
        selectdIndex = index;
      }
    });
    this.props.navigation.navigate('Details', {
      idArray,
      selectdIndex,
    });
    // 存储访问状态
    storage
      .save({
        key: 'visited',
        id: item.id,
        data: true,
        expires: null,
      })
      .then(() => {
        // 更新访问状态
        // PS：这里需要将旧数据解构成一个新数组 , 可以避免setState不生效问题，因为setState是浅比较 。
        let stories = [...this.state.stories];
        stories.forEach(items => {
          items.data.forEach(i => {
            if (i.id === item.id) {
              i.visited = true;
              return false;
            }
          });
        });
        this.setState({
          stories,
        });
      });
  };
  pullupfresh = () => {
    try {
      //避免重复请求
      if (this.state.pullUpLoading) {
        return false;
      }
      this.setState({
        pullUpLoading: true,
      });
      let date = this.state.stories[this.state.stories.length - 1].key;
      console.warn(date);
      let apiUrl;
      if (this.state.date && !this.props.navigation.getParam('dateSelect')) {
        apiUrl = `${Api.before}${date}`;
      } else {
        apiUrl = `${Api.section}${this.state.sectionId}/before/${date}`;
      }
      Axios.get(apiUrl)
        .then(responseJson => {
          this.handleDataRender(responseJson.data, res => {
            let list = [...this.state.stories];
            list.push({
              key: responseJson.data.timestamp
                ? responseJson.data.timestamp
                : responseJson.data.date,
              data: res,
            });
            this.setState({
              pullUpLoading: false,
              stories: list,
            });
          });
        })
        .catch(_err => {
          this.setState({
            pullUpLoading: false,
          });
        });
    } catch {
      Tools.toast('系统异常 , 获取失败');
      this.setState({
        pullUpLoading: false,
      });
    }
  };
  /**
   *  日期选择器点击行为
   */
  handleDatePicked = date => {
    let dateStr = Date.parse(date).toString();
    dateStr = dateStr.substr(0, 10);
    this.initBeforeList(this.state.sectionId, dateStr);
    this.setState({
      isDateTimePickerVisible: false,
    });
  };
  /**
   *  控制日期选择器显示
   */
  toggleDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: !this.state.isDateTimePickerVisible,
    });
  };
  /**
   *  重新随机日期  , 刷新列表
   */
  restList = (startDate = '2013-10-23') => {
    // 生成随机日期 作者:// https://cloud.tencent.com/developer/news/391925
    let m = new Date(startDate);
    m = m.getTime();
    let n;
    this.props.navigation.getParam('endTime')
      ? (n = new Date(this.props.navigation.getParam('endTime')))
      : (n = new Date());
    n = n.getTime();
    let s = n - m;
    s = Math.floor(Math.random() * s);
    s = m + s;
    s = new Date(s);
    let dateStr = Tools.formatDay(s)
      .split('-')
      .join('');
    this.setState({
      date: dateStr,
      stories: [],
      pullUpLoading: false,
    });
    if (this.props.navigation.getParam('dateSelect')) {
      let dateNum = Date.parse(s).toString();
      dateNum = dateNum.substr(0, 10);
      this.initBeforeList(this.state.sectionId, dateNum);
    } else {
      this.initdaliyList();
    }
  };
  renderSectioHeader = items => {
    let dateStr;
    if (this.props.navigation.getParam('dateSelect')) {
      let date = Tools.formatDay(Tools.getDate(items.section.key));
      dateStr =
        date.split('-')[0] +
        '年' +
        date.split('-')[1] +
        '月' +
        date.split('-')[2] +
        '日';
    } else {
      dateStr =
        String(items.section.key).substring(0, 4) +
        '年' +
        String(items.section.key).substring(4, 6) +
        '月' +
        String(items.section.key).substring(6, 8) +
        '日';
    }
    return <Text style={styles.sectionTitle}>{dateStr}</Text>;
  };
  render() {
    return (
      <MyScrollView pullupfresh={this.pullupfresh}>
        <StoriesList
          data={this.state.stories}
          onPress={this.bindListTap}
          sectionHeader={this.state.date ? this.renderSectioHeader : null}
        />
        {/* 日期选择器 */}
        <DateTimePicker
          // 最大日期
          maximumDate={
            this.props.navigation.getParam('endTime')
              ? new Date(this.props.navigation.getParam('endTime'))
              : //判断当前时间 是否大于早上7点 , 日报每天早上7点更新
              //如果时间早于7点 ,则最大可选择日起为昨天.
              Number(Tools.formatTime().split(':')[0]) >= 7
              ? new Date()
              : new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          }
          // 最小日期
          minimumDate={
            new Date(
              this.state.minimumDate.split('-')[0],
              this.state.minimumDate.split('-')[1],
              this.state.minimumDate.split('-')[2],
            )
          }
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
    color: '#999',
  },
  headerRightWrapper: {
    width: 120,
    flexDirection: 'row',
  },
});
export default Section;
