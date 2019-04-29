//  侧栏抽屉

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerItems,
  SafeAreaView,
  withNavigationFocus
} from "react-navigation";
import { Icon, Button, Avatar, ListItem } from "react-native-elements";
import { Tools } from "../../config";

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:''
    };
  }
  componentDidMount() {
    storage
      .load({
        key: "userToken",
        autoSync: false
      })
      .then(res => {
        this.setState({
          userInfo: res
        });
      }).catch((res)=>{

      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      console.warn("页面获得焦点");
    }
  }
  async getUserInfo() {
    let token = await storage
      .load({
        key: "hahaha"
      })
      .then(res => {
        console.warn("11111");
        return res;
      })
      .catch(error => {
        console.warn("2222");
        return "";
      });
    return token;
  }
  loginOut=()=> {
    try {
      storage.remove({
        key: "userToken"
      });
      this.setState({
        userInfo:''
      })
      Tools.toast("已退出");
    } catch (error) {
      Tools.toast("程序异常，请重启应用。");
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userContainer}>
          <Avatar
            rounded
            size={70}
            onPress={() => { 
              this.props.navigation.navigate("Login");
            }}
            activeOpacity={0.7}
            source={this.state.userInfo.avatar?
              {
                uri:this.state.userInfo.avatar
              }:
              require("../../assets/images/default-user-avatar.jpg")
            }
            showEditButton={this.state.userInfo.avatar?true:false}
          />
          <Text style={styles.userName}  numberOfLines={4}>
            {this.state.userInfo.name ? this.state.userInfo.name : "请登录"}
          </Text>
        </View>
        <View style={styles.listContainer}>
          <View>
             <ListItem
            chevron
            title={"扫一扫"}
            titleStyle={styles.itemTitle}
            leftIcon={
              <Icon
                type="material"
                name="crop-free"
                size={24}
                color="#757575"
              />
            }
          /> 
          </View>
          {this.state.userInfo ? (
            <Button type={'clear'} title="退出登录" onPress={this.loginOut} containerStyle={styles.loginOutBtn} />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}
// export default withNavigationFocus(Drawer);
export default Drawer;

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
    flex:1,
    marginLeft: 25,
    color: "#fff",
    fontSize: 16
  },
  itemTitle: {
    color: "#212121"
  },
  listContainer:{
    flex:1,
  },
  loginOutBtn:{
  }
});
