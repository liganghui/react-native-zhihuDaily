import React, { Component } from "react";
import { Header, Button } from "react-native-elements";

import { colors } from "../../styles";
import PropTypes from "prop-types";
import CardView from "react-native-cardview";



export default class ScreenHeader extends Component {
  static propTypes = {
    leftIcon: PropTypes.string.isRequired,
    leftOnPress: PropTypes.func.isRequired,
    centerText: PropTypes.string,
    rightComponent: PropTypes.element
  };
  render() {
    return (
      <CardView cardElevation={5} cardMaxElevation={5}>
        <Header
          leftComponent={
            <Button
              icon={{
                name: this.props.leftIcon,
                color: colors.WHITE,
                type: this.props.leftIconType
              }}
              buttonStyle={{
                backgroundColor: null,
                padding: 0,
                elevation: 0, //去除Android下的按钮阴影
                borderRadius: 5 //优化Android下的点击态为圆形
              }}
              title=" " //去除默认标题
              onPress={this.props.leftOnPress}
            />
          }
          centerComponent={{
            text: this.props.centerText,
            style: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
              marginTop: 2
            }
          }}
          // 标题对齐方式
          placement="left"
          // 容器样式
          containerStyle={{
            paddingBottom: 20,
            height: 60,
            width:"100%",
            backgroundColor: "#008bed"
          }}
          rightComponent={this.props.rightComponent}
        />
      </CardView>
    );
  }
}
