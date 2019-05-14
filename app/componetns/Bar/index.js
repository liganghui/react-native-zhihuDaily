/*
 * 进度条组件  
 * 作者:https://blog.csdn.net/u010379595/article/details/83512719
 */

import React, { PureComponent } from 'react';
import {
  View,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { Tools } from '../../config';
 
const propTypes = {
  progress: PropTypes.number.isRequired,
  backgroundStyle: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
};
 
/* 进度条组件 */
class Bar extends PureComponent {
 
  constructor(props) {
    super(props);
    this.progress = new Animated.Value(0);
    this.update = this.update.bind(this);
  }
 
  componentWillReceiveProps(nextProps) {
    if (this.props.progress >= 0 && this.props.progress !== nextProps.progress) {
      this.update(nextProps.progress);
    }
  }
  update(progress) {
    Animated.spring(this.progress, {
      toValue: progress
    }).start();
  }
 
  render() {
    return (
      <View style={[this.props.backgroundStyle, this.props.style]}>
        <Animated.View style={{
          backgroundColor: '#eb3136',
          height: Tools.getRealDP(28),
          borderRadius: Tools.getRealDP(30),
          width: this.progress.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1 * this.props.style.width],
          }) }}
        />
      </View>
    );
  }
}
Bar.propTypes = propTypes;
export default Bar;
