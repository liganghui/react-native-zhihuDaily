import React, { Component } from 'react'
import { View,StyleSheet,ActivityIndicator,Text } from "react-native";

export default class PullUpLoad extends Component {
  render() {
    return (
        <View style={styles.loadWrapper}>
            {this.props.loading&&!this.props.finished?
                <View  style={styles.loadWrapper}>
                    <ActivityIndicator animating={true} color='#666' size="small" />
                    <Text style={styles.remindText}>正在加载...</Text>
                </View>
            :<Text>下拉加载更多</Text>}
            {this.props.finished?<Text style={styles.remindText}>没有更多了</Text>:null}  
        </View> 
      )
  }
}

const styles = StyleSheet.create({
    loadWrapper:{
      height:40,
      flexDirection:"row",
      alignItems:'center',
      justifyContent:'center'
    },
    remindText:{
      marginLeft:10
    },
});
  