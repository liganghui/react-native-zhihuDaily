import React, { Component } from "react";
import { View, StyleSheet, Text,TouchableOpacity  } from "react-native";
import Swiper from "react-native-swiper";
import { Image } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
/*
 *  首页轮播组件
 *
 *  @param  {Object}  data  需要渲染的列表数据对象            [必填]
 *  @param  {Function} onPress   列表项点击事件               [必填]
 */
export default class HomeSwiper extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        {this.props.data ? (
          <Swiper
            loop={false}
            key={this.props.data.length}
            toplay={true}
            autoplayTimeout={5}
            paginationStyle={{ bottom: 5 }}
            dotColor="#999"
            activeDotColor="#fff"
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.dotStyle}
          >
            {this.props.data.map(item => {
              return (
                <View style={styles.sliderWrapper} key={item.id} >
                  <Image source={{ uri: item.image }} style={styles.image}  />
                  <LinearGradient
                    colors={["rgba(0,0,0,0)", "rgba(0,0,0,.9)"]}
                    style={styles.linearGradient}
                  >
                  <TouchableOpacity   style={styles.mask} activeOpacity={1}  onPress={this.props.onPress.bind(this, item.id)}>
                    <Text style={styles.title}>{item.title}</Text>
                  </TouchableOpacity >
                  </LinearGradient>
                </View>
              );
            })}
          </Swiper>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 230
  },
  sliderWrapper: {
    position: "relative",
    flex: 1
  },
  image: {
    width: "100%",
    height: 230
  },
  linearGradient: {
    width: "100%",
    height: 230,
    zIndex: 2,
    position: "absolute",
  },
  title: {
    fontSize: 22, 
    fontWeight:'400',
    paddingBottom: 30,
    marginHorizontal: 20 ,
    color: "#fff",
  },
  // 轮播图指示器样式
  dotStyle:{
    width:6,
    height:6,
    marginBottom: 6,
  },
  mask:{
    width:'100%',
    height:'100%',
    position:'absolute',
    zIndex:100,
    justifyContent:'flex-end',
  }
});
