import React, { Component } from "react";
import { View, Text } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import Toast from 'react-native-root-toast';
import { Header, Icon, Button } from "react-native-elements";
export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "transparent"
      },
      headerRight: (
        <Button
          title=""
          type="clear"
          onPress={params.handleMore}
          icon={
            <Icon type="material" name="more-vert" size={24} color="white" />
          }
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ handleMore: this.bindMoreBtn});
  }
  bindMoreBtn(){
    let toast = Toast.show('This is a message', {
      position: Toast.positions.BOTTOM,
      shadow: false,
      backgroundColor:"#c9c9c9",
      textColor:"#00000"
    });
  }
  render() {
    const images = [
      {
        url: this.props.navigation.getParam("url")
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <ImageViewer imageUrls={images} renderIndicator={() => {}} />
      </View>
    );
  }
}
