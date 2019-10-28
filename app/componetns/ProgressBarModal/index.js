import React, {PureComponent} from 'react';
import {View, Modal, Text, StyleSheet, ImageBackground} from 'react-native';
import Bar from '../Bar';
import hotUpdateBg from '../../assets/images/hot-update-bg.png';

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
      title: '正在下载更新文件', // 更新提示标题
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
        onRequestClose={onRequestClose}>
        <View style={styles.progressBarView}>
          <ImageBackground source={hotUpdateBg} style={styles.imageBg}>
            <Text style={styles.title}>{this.state.title}</Text>
          </ImageBackground>
          <View style={styles.subView}>
            <Bar
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 400, borderRadius: 30}}
              progress={progress}
              backgroundStyle={styles.barBackgroundStyle}
            />
            <Text style={styles.textPackageSize}>
              {receivedPackageSize && totalPackageSize
                ? `${receivedPackageSize}/${totalPackageSize}`
                : null}
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

const styles = StyleSheet.create({
  imageBg: {
    width: 500,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  // 默认进度条背景底色
  barBackgroundStyle: {
    backgroundColor: '#e0e0e0',
  },
  subView: {
    width: 500,
    height: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: 500,
    height: 40,
    backgroundColor: '#FFF',
  },
  textPackageSize: {
    fontSize: 16,
    color: '#686868',
    marginTop: 36,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
  },
});
