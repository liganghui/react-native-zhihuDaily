import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";
import { System } from "../../utils";


/*
 *  首页轮播组件
 *
 *  @param  {Object}  data  需要渲染的列表数据对象            [必填]
 *  @param  {Function} onPress   列表项点击事件               [必填]
 */
export default class HomeSwiper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeSlide:0
    };
  }
  renderItem({ item, index }) {
    return (
      <ImageBackground  source={{ uri: item.image }}  style={styles.sliderWrapper} key={item.id}>
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,.9)"]}
          style={styles.linearGradient}
        >
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={this.props.onPress.bind( this,item,index,this.props.data)}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    );
  }
  // 轮播图指示器
  get pagination() {
    return (
      <Pagination
        dotsLength={this.props.data.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{ backgroundColor:'transparent',position:'absolute',bottom:-18,left:0,right:0}}
        dotContainerStyle={{
          width:15,
          marginHorizontal:0,
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, 0.8)"
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.85}
      />
    );
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <Carousel
          autoplay={true} //自动播放
          autoplayDelay={3500} //间隔延迟
          loop={true}  // 循环
          data={this.props.data}
          renderItem={this.renderItem.bind(this)}
          sliderWidth={System.SCREEN_WIDTH}
          itemWidth={System.SCREEN_WIDTH}
          onSnapToItem={index => this.setState({ activeSlide: index })} //更新指示器标识
          inactiveSlideOpacity={1}
          inactiveSlideScale={1} //去除边距
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 230
  },
  sliderWrapper: {
    flex: 1
  },
  linearGradient: {
    width: "100%",
    height: 230,
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    paddingBottom: 30,
    marginHorizontal: 20,
    color: "#fff"
  },
  mask: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  }
});
