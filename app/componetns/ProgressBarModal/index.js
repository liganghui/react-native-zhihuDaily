import React, { PureComponent } from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';
import Bar from '../Bar';
import hotUpdateBg from '../../assets/images/hot-update-bg.png';
import { Tools } from '../../config';

 
const propTypes = {
  ...Modal.propTypes,
};
 
const defaultProps = {
  animationType: 'none',
  transparent: true,
  progressModalVisible: false,
  onRequestClose: () => {},
};
 
/* 更新进度条Modal */
export default class ProgressBarModal extends PureComponent {
 
  constructor(props) {
    super(props);
    this.state = {
      title: '正在下载更新文件' // 更新提示标题
    };
  }
 
  render() {
    const {
      animationType,
      transparent,
      onRequestClose,
      progress,
      progressModalVisible,
      totalPackageSize,
      receivedPackageSize,
    } = this.props;
    return (
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={progressModalVisible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.progressBarView}>
          <ImageBackground
            source={hotUpdateBg}
            style={styles.imageBg}
          >
            <Text style={styles.title}>
              {this.state.title}
            </Text>
          </ImageBackground>
          <View style={styles.subView}>
            <Bar
              style={{ width: Tools.getRealDP(666), borderRadius: Tools.getRealDP(30)}}
              progress={progress}
              backgroundStyle={styles.barBackgroundStyle}
            />
            <Text style={styles.textPackageSize}>
              {`${receivedPackageSize}/${totalPackageSize}`}
            </Text>
          </View>
          <View style={styles.bottomContainer} />
        </View>
      </Modal>
    );
  }
}
 
ProgressBarModal.propTypes = propTypes;
ProgressBarModal.defaultProps = defaultProps;

 
const styles= StyleSheet.create({
  imageBg: {
    width: Tools.getRealDP(780),
    height: Tools.getRealDP(224),
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressBarView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  // 默认进度条背景底色
  barBackgroundStyle: {
    backgroundColor: '#e0e0e0'
  },
  subView: {
    width: Tools.getRealDP(780),
    height: Tools.getRealDP(296),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    width: Tools.getRealDP(780),
    height: Tools.getRealDP(39),
    borderBottomLeftRadius: Tools.getRealDP(26),
    borderBottomRightRadius: Tools.getRealDP(26),
    backgroundColor: '#FFF'
  },
  textPackageSize: {
    fontSize: Tools.getRealDP(40),
    color: '#686868',
    marginTop: Tools.getRealDP(36)
  },
  title: {
    color: '#FFF',
    fontSize: Tools.getRealDP(45)
  }
})