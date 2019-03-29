/*
 *  日报列表组件
 *
 *  @param  {Object}  data  需要渲染的列表数据对象            [必填]
 *  @param  {Function} onPress   列表项点击事件               [必填]
 *  @param  {Object}  sectionHeader  分组列表头部组件         [可选]
 */

import React, { Component } from "react";
import { Text, StyleSheet, SectionList, View } from "react-native";
import CardView from "react-native-cardview";
import { ListItem, Image, Icon } from "react-native-elements";
import Ripple from "react-native-material-ripple";

export default class index extends Component {
  //指定id作为列表每一项的key。
  keyExtractor = (item, index) => item.id.toString();
  renderHeader = info => {
    return <Text style={styles.headerTitle}>{info.section.key}</Text>;
  };
  //列表项渲染方法
  renderItem = ({ item }) => {
    return (
      <CardView
        cardElevation={1}
        cornerRadius={5}
        key={item.id}
        style={styles.cardWrapper}
      >
        <Ripple rippleDuration={500} rippleOpacity={0.15} onPress={this.props.onPress.bind(this, item.id)}>
          <ListItem
            title={item.title}
            titleStyle={styles.itemTitle}
            stickySectionHeadersEnabled={true}
            titleContainerStyle={styles.titleContainer}
            rightElement={
              item.images[0] ? (
                <View style={{ position: "relative" }}>
                  {/* 判断是否增加多图标识 */}
                  {item.multipic ? (
                    <View style={styles.multipicWrapper}>
                      <Icon
                        name="filter-none"
                        type="material"
                        color="#fff"
                        size={14}
                      />
                      <Text style={styles.multipicText}>多图</Text>
                    </View>
                  ) : null}
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{ width: 75, height: 70 }}
                  />
                </View>
              ) : null
            }
          />
        </Ripple>
      </CardView>
    );
  };
  render() {
    return (
      <SectionList
        {...this.props}
        keyExtractor={this.keyExtractor}
        sections={this.props.data}
        renderSectionHeader={
          this.props.sectionHeader ? this.props.sectionHeader : null
        }
        renderItem={this.renderItem}
        style={styles.wrapper}
      />
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#f6f6f6"
  },
  cardWrapper: {
    marginVertical: 5, //垂直边距
    marginHorizontal: 10 //水平边距
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
    color: "#000"
  },
  multipicWrapper: {
    bottom: 0,
    right: 0,
    padding: 3,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  multipicText: {
    color: "#fff",
    fontSize: 10,
    marginLeft: 2
  }
});
