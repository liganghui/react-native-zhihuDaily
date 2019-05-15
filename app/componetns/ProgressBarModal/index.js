import React, { PureComponent } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  ImageBackground,
  Image
} from "react-native";
import Bar from "../Bar";
import hotUpdateBg from "../../assets/images/hot-update-bg.png";
import { Px2Dp } from "../../config";

const propTypes = {
  ...Modal.propTypes
};

const defaultProps = {
  animationType: "none",
  transparent: true,
  progressModalVisible: false,
  onRequestClose: () => {}
};

/* 更新进度条Modal */
export default class ProgressBarModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "正在下载更新文件" // 更新提示标题
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
      receivedPackageSize
    } = this.props;
    return (
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={progressModalVisible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.progressBarView}>
          <ImageBackground source={hotUpdateBg} style={styles.imageBg}>
            <Text style={styles.title}>{this.state.title}</Text>
          </ImageBackground>
          <View style={styles.subView}>
            <Bar
              style={{ width: Px2Dp(400), borderRadius: Px2Dp(30) }}
              progress={progress}
              backgroundStyle={styles.barBackgroundStyle}
            />
            <Text style={styles.textPackageSize}>
              {
                receivedPackageSize&&totalPackageSize?
                `${receivedPackageSize}/${totalPackageSize}`
                :null
              }
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
    width: Px2Dp(500),
    height: Px2Dp(150),
    justifyContent: "center",
    alignItems: "center"
  },
  progressBarView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  // 默认进度条背景底色
  barBackgroundStyle: {
    backgroundColor: "#e0e0e0"
  },
  subView: {
    width: Px2Dp(500),
    height: Px2Dp(200),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomContainer: {
    width: Px2Dp(500),
    height: Px2Dp(39),
    backgroundColor: "#FFF"
  },
  textPackageSize: {
    fontSize: 16,
    color: "#686868",
    marginTop: Px2Dp(36)
  },
  title: {
    color: "#FFF",
    fontSize: 16
  }
});
