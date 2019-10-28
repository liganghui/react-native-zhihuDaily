/**
 * 倒计时按钮  基于  ReactNative-CountDownButton 修改
 * 原组件github地址 : https://github.com/kkkelicheng/ReactNative-CountDownButton
 * Created by lichengke on 2017/6/12.
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const LCCountDownButtonState = {
  LCCountDownButtonActive: 0,
  LCCountDownButtonDisable: 1,
};

// {id , startTime, deathCount}
var timeRecodes = []; //根据id来记录LCCountDownButton的信息

export default class LCCountDownButton extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.shouldSetState = true;
    this.state = {
      btnTitle: this.props.beginText ? this.props.beginText : '默认',
      buttonState: LCCountDownButtonState.LCCountDownButtonActive,
    };
  }

  static defaultProps = {
    id: 'id', //按钮的身份标识,同一个页面的按钮是同一个id
    beginText: 'beginText', //初始状态按钮title
    endText: 'endText', //读秒结束后按钮的title
    count: 10, //总的计时数 单位是秒s
    pressAction: () => {}, //按下按钮的事件,但是触发倒数(startCountDown)需要你自己来调用
    changeWithCount: () => {}, //读秒变化的函数,该函数带有一个参数count,表示当前的剩余事件
    end: () => {}, //读秒完毕后的回调,读秒结束触发
    frameStyle: {}, //初始化的位置大小
    disableStyle: {}, //按钮禁用的时候样式                 (有默认,见底部styles)
    activeStyle: {}, //active情况下按钮样式              (有默认,见底部styles)
    disableTextStyle: {}, //按钮禁用的时候里面文字的样式        (有默认,见底部styles)
    activeTextStyle: {}, //active情况下按钮里面文字的样式      (有默认,见底部styles)
  };
  componentDidMount() {
    const {id, changeWithCount} = this.props;
    for (var i = 0; i < timeRecodes.length; i++) {
      let obj = timeRecodes[i];
      if (obj.id === id) {
        let liveTime = Date.now() - obj.startTime;
        if (liveTime < obj.deathCount * 1000) {
          //避免闪动
          let detalTime = Math.round(liveTime / 1000);
          let content = changeWithCount(obj.deathCount - detalTime);
          // eslint-disable-next-line react/no-did-mount-set-state
          this.setState({
            btnTitle: content,
          });
          //手动调用倒计时
          this.startCountDownWithCount(obj.startTime);
        }
      }
    }
  }

  clearTime() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    this.shouldSetState = false;
    this.clearTime();
  }

  startCountDownWithCount(startTime) {
    this.setState({
      buttonState: LCCountDownButtonState.LCCountDownButtonDisable,
    });
    const {changeWithCount, endText, count, end} = this.props;
    this.startTime = startTime;
    this.interval = setInterval(() => {
      let detalTime = Math.round((Date.now() - this.startTime) / 1000);
      let content = changeWithCount(count - detalTime);
      if (detalTime >= count) {
        content = endText;
        this.clearTime();
        end && end();
        this.setState({
          buttonState: LCCountDownButtonState.LCCountDownButtonActive,
        });
      }
      if (this.shouldSetState) {
        this.setState({
          btnTitle: content,
        });
      }
    }, 1000);
  }

  recordButtonInfo() {
    const {id, count} = this.props;
    var hasRecord = false;
    for (var i = 0; i < timeRecodes.length; i++) {
      let obj = timeRecodes[i];
      if (obj.id === id) {
        obj.startTime = Date.now();
        hasRecord = true;
        break;
      }
    }
    if (!hasRecord) {
      let buttonInfo = {
        id: id,
        deathCount: count,
        startTime: Date.now(),
      };
      timeRecodes.push(buttonInfo);
    }
  }

  //外界调用
  startCountDown() {
    this.startCountDownWithCount(Date.now());
    this.recordButtonInfo();
  }

  buttonPressed = () => {
    const {pressAction} = this.props;
    pressAction();
  };

  render() {
    let isDisable =
      this.state.buttonState ===
      LCCountDownButtonState.LCCountDownButtonDisable;
    const {
      frameStyle,
      disableStyle,
      activeStyle,
      disableTextStyle,
      activeTextStyle,
    } = this.props;
    return (
      <TouchableOpacity
        disabled={isDisable}
        onPress={this.buttonPressed}
        style={[
          styles.buttonCommonStyle,
          isDisable ? styles.disableButtonStyle : styles.activeButtonStyle,
          isDisable ? disableStyle : activeStyle,
          frameStyle,
        ]}>
        <Text
          style={[
            styles.txtCommonStyle,
            isDisable ? styles.disableTxtStyle : styles.activeTxtStyle,
            isDisable ? disableTextStyle : activeTextStyle,
          ]}>
          {this.state.btnTitle}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonCommonStyle: {
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //禁用时候的TouchableOpacity样式
  disableButtonStyle: {},
  //可以点击时候的TouchableOpacity样式
  activeButtonStyle: {},

  txtCommonStyle: {
    fontSize: 14,
  },
  //禁用时候的Text样式
  disableTxtStyle: {
    color: 'gray',
  },
  //可以点击时候的Text样式
  activeTxtStyle: {
    color: 'black',
  },
});
