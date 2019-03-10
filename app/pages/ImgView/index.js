import React, { Component } from "react";
import { View, Text } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "transparent"
      }
    };
  };
  constructor(props) {
    super(props);
  }
  render() {
    const images = [
      {
        url: this.props.navigation.getParam("url")
      }
    ];
    return (
      <View style={{flex: 1}}
      >
        <ImageViewer imageUrls={images} renderIndicator={() => {}} />
      </View>
    );
  }
}
