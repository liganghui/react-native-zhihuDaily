/*
 *  集成上拉刷新和下拉触底的ScrollView组件
 *
 *  @param  {function}   pullupfresh  上拉触底回调函数            [必填]
 *  @param  {function}   onRefresh    下拉刷新回调函数            [可选]
 *  @param  {bool}       refresh      下拉刷新loading标识符开关   [可选]
 */
import React, { Component } from "react";
import {
  ScrollView,
  RefreshControl
} from "react-native";
import PropTypes from "prop-types";

// 下拉加载控件颜色
const COLOR=["#008bed"];
// 距离底部多少高度触发加载
const HEIGHT=60 ;


export default class index extends Component {
  static propTypes = {
    pullupfresh: PropTypes.func.isRequired,
    onRefresh: PropTypes.func,
    refresh: PropTypes.bool
  };
  constructor(props) {
    super(props);
  }
  // 监听滚动结束事件
  handleViewScroll = e => {
    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight - HEIGHT) {
      this.props.pullupfresh();
    }
  };

  render() {
    return (
      <ScrollView
      {...this.props}
        onMomentumScrollEnd={this.handleViewScroll}
        refreshControl={
          this.props.onRefresh && this.props.refresh !== null ? (
            <RefreshControl
              colors={COLOR}
              refreshing={this.props.refresh}
              onRefresh={this.props.onRefresh}
            />
          ) : null
        }
      >
        {this.props.children}
      </ScrollView>
    );
  }
}
