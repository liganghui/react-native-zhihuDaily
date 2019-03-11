import React, { Component } from "react";
import {
  ScrollView,
  RefreshControl
} from "react-native";
import PropTypes from "prop-types";

// 下拉加载控件颜色
const COLOR=["#008bed"];
// 距离底部多少高度触发加载
const HEIGHT=100;


export default class index extends Component {
  static propTypes = {
    pullupfresh: PropTypes.func.isRequired,
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool
  };
  constructor(props) {
    super(props);
  }
  // 监听滚动结束事件
  _handleViewScroll = e => {
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
        onMomentumScrollEnd={this._handleViewScroll}
        refreshControl={
          this.props.onRefresh && this.props.refreshing !== null ? (
            <RefreshControl
              colors={COLOR}
              refreshing={this.props.refreshing}
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
