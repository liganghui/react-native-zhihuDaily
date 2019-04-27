//  侧栏抽屉

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { Icon, Button, Avatar,ListItem } from "react-native-elements";

export default class index extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userContainer}>
          <Avatar
            rounded
            size={70}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
            }}
            showEditButton
          />
          <Text style={styles.userName}>请登录</Text>
        </View>
        <View>
          <ListItem chevron title={"扫一扫"} leftIcon={<Icon  type="material" name="crop-free" size={24} />} />
          <ListItem chevron title={"扫一扫"} leftIcon={<Icon  type="material" name="crop-free" size={24} />}/>
          <ListItem chevron title={"扫一扫"} leftIcon={<Icon  type="material" name="crop-free" size={24} />}/>
          <ListItem chevron title={"扫一扫"} leftIcon={<Icon  type="material" name="crop-free" size={24} />}/>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userContainer: {
    backgroundColor: "#00a2ed",
    paddingHorizontal: 20,
    height: 120,
    flexDirection: "row",
    alignItems: "center"
  },
  userName: {
    marginLeft: 25,
    color: "#fff",
    fontSize: 16
  }
});
