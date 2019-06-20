import React, { Component } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import {Axios ,Tools} from "../../utils";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";

const { width, height, scale } = Dimensions.get("window");

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyright: ""
    };
  }
  componentDidMount() {
    Tools.getNetworkState().then(newWorkInfo => {
      if (newWorkInfo.online) {
      this.getImageInfo()
      }else{
        this.props.navigation.navigate("Main");
      }
    })
  }
  getImageInfo(){
    Axios.get(
      "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN"
    )
      .then(responseJson => {
        this.setState(
          {
            copyright: responseJson.data.images[0].copyright
          },
          () => {
            setTimeout(() => {
              this.props.navigation.navigate("Main");
            }, 2000);
          }
        );
      })
      .catch(error => {
        setTimeout(() => {
          this.props.navigation.navigate("Main");
        }, 1500);
    });
  }
  render() {
    return (
      <Animatable.View   ref={ref => (this.container = ref)}  style={{ flex: 1, backgroundColor: "#333" }} >
        <ImageBackground
          source={{
            uri: `https://cn.bing.com/ImageResolution.aspx?w=${width *
              scale}&h=${height * scale}&mkt=zh-CN`
          }}
          style={{ width, height }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,.5)"]}
            style={styles.linearGradient}
          >
           {this.state.copyright?
            <Animatable.Text animation="fadeInUp" style={styles.title}>{this.state.copyright}</Animatable.Text>
            :null}
          </LinearGradient>
        </ImageBackground>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
    height: "100%"
  },
  title: {
    fontSize: 15,
    opacity: 0.8,
    fontWeight: "400",
    paddingBottom: 30,
    marginHorizontal: 20,
    position: "absolute",
    bottom: 30,
    right: 10,
    color: "#fff"
  }
});
