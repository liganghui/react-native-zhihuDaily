import React, { Component } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Text } from "react-native";
import Swiper from "react-native-swiper";
import { Tile, Image } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

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
                <View style={styles.sliderWrapper} key={item.id}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <LinearGradient
                    colors={["rgba(0,0,0,0)", "rgba(0,0,0,.9)"]}
                    style={styles.linearGradient}
                  >
                    <Text style={styles.title}>{item.title}</Text>
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
    justifyContent:'flex-end',
  },
  title: {
    fontSize: 22, 
    fontWeight:'400',
    paddingBottom: 30,
    marginHorizontal: 20 ,
    color: "#fff"
  },
  // 轮播图指示器样式
  dotStyle:{
    width:6,
    height:6,
    marginBottom: 6,
  },
  
});
