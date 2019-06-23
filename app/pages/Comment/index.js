import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import { Icon, Button, Avatar, ListItem } from "react-native-elements";
import { Tools, Api, Axios, System } from "../../utils";
import { observer, inject } from "mobx-react";

@inject("theme")
@observer
export default class index extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.getParam("comments")
        ? navigation.getParam("comments") + " 条点评"
        : null,
      headerStyle: {
        backgroundColor: screenProps.theme
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      id: this.props.navigation.getParam("id"),
      shortCommentsState: false,
      longCommentsListHeight: 0,
      longComments: [],
      shortComments: [],
      hardwareTextureSwitch:true
    };
  }
  componentDidMount() {
    this.initLongComments();
  }
  initLongComments() {
    this.getCommentsData("long", res => {
      if (res.data && res.data.comments.length > 0) {
        res.data.comments.type = "long";
        this.setState({
          hardwareTextureSwitch:false,
          longComments: res.data.comments
        });
      }
    });
  }
  initShortComments() {
    this.getCommentsData("short", res => {
      if (res.data && res.data.comments.length > 0) {
        res.data.comments.type = "short";
        this.setState(
          {
            shortComments: res.data.comments,
            shortCommentsState: true
          },
          () => {
            setTimeout(() => {
              this.scrollView.scrollTo({
                y: this.state.longCommentsListHeight,
                animated: true
              });
            }, 100);
          }
        );
      }
    });
  }
  getCommentsData(type, callBack) {
    let apiUrl;
    if (type == "long") {
      apiUrl = Api.longComments + this.state.id + "/long-comments";
    } else if (type == "short") {
      apiUrl = Api.shortComments + this.state.id + "/short-comments";
    } else {
      return;
    }
    setTimeout(()=>{
      this.bindModalSwitch();
    },100)
    Axios.get(apiUrl)
      .then(res => {
        this.bindModalSwitch(false);
        callBack && callBack(res);
      })
      .catch(() => {
        this.bindModalSwitch(false);
      });
  }
  toggleShortComments = () => {
    if (!this.state.shortCommentsState) {
      this.initShortComments();
    } else {
      this.setState({
        shortComments: [],
        shortCommentsState: false
      });
    }
  };
  /** 
   *  监听列表高度
   */
  listenListHeight(event) {
    var { x, y, width, height } = event.nativeEvent.layout;
    this.setState({
      longCommentsListHeight: height
    });
  }
  bindModalSwitch = (val) => {
    if(val){
      this.setState({
        isModalVisible:val
      });
    }else{
      this.setState({
        isModalVisible: !this.state.isModalVisible
      });
    }
    
  };
  bindAndroidBack = () => {
    if (this.state.isModalVisible) {
      this.setState({
        isModalVisible: false
      });
    } else {
      this.props.navigation.pop();
    }
  };
  bindMoreToggle(index, item) {
    let type;
    if (
      this.state.longComments[index] &&
      this.state.longComments[index].id == item.id
    ) {
      type = "longComments";
    } else if (
      this.state.shortComments[index] &&
      this.state.shortComments[index].id == item.id
    ) {
      type = "shortComments";
    }
    let list = [...this.state[type]];
    list[index].reply_to.status = !list[index].reply_to.status;
    this.setState({
      [type]: list
    });
  }
  keyExtractor = item => item.id.toString();
  renderCommentItem = ({ item, index, items }) => {
    return (
      <ListItem
        containerStyle={{
          alignItems: "flex-start",
          borderBottomWidth: 1,
          backgroundColor: this.props.theme.colors.containerBackground,
          borderBottomColor: this.props.theme.colors.border
        }}
        leftAvatar={{
          source: { uri: item.avatar }
        }}
        key={item.id}
        pad={5}
        rightElement={
          <View style={styles.rightContainer}>
            <View style={styles.authorContainer}>
              <Text
                style={[styles.author, { color: this.props.theme.colors.text }]}
              >
                {item.author}
              </Text>
              <Button
                title={String(item.likes)}
                buttonStyle={styles.likesButton}
                titleStyle={styles.likesText}
                type="clear"
                icon={
                  <Icon
                    type="material"
                    name="thumb-up"
                    size={14}
                    color={"#999"}
                  />
                }
              />
            </View>
            <View style={styles.contentContainer}>
              <Text
                style={[
                  styles.mainContent,
                  { color: this.props.theme.colors.content }
                ]}
              >
                {item.content}
              </Text>
              {item.reply_to && (
                <TouchableOpacity style={styles.replyContainer} activeOpacity={1} onPress={this.bindMoreToggle.bind(this, index, item)}>
                  <Text
                    ellipsizeMode={"tail"}
                    numberOfLines={item.reply_to.status ? 0 : 2}
                  >
                    <Text
                      style={[
                        styles.author,
                        { color: this.props.theme.colors.text }
                      ]}
                    >
                      //{item.reply_to.author}：
                    </Text>
                    <Text style={[styles.mainContent, styles.replyContent]}>
                      {item.reply_to.content}
                    </Text>
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.extraContainer}>
              <Text style={styles.date}>
                {Tools.formatMonthDay(item.time) +" " +Tools.formatTime(item.time)}
              </Text>
              {this.renderMoreBtn(item, index)}
            </View>
          </View>
        }
      />
    );
  };
  renderMoreBtn(item, index) {
    if (item.reply_to && String(item.reply_to.content).length > 35) {
      if (!item.reply_to.status) {
        return (
          <Button
            title={"展开"}
            buttonStyle={[
              styles.moreBtn,
              { backgroundColor: this.props.theme.colors.buttonBackground }
            ]}
            titleStyle={[styles.moreTitle, { color: this.props.theme.colors.text }]}
            onPress={this.bindMoreToggle.bind(this, index, item)}
          />
        );
      } else {
        return (
          <Button
            title={"收起"}
            buttonStyle={[
              styles.moreBtn,
              { backgroundColor: this.props.theme.colors.buttonBackground }
            ]}
            titleStyle={[styles.moreTitle, { color: this.props.theme.colors.text }]}
            onPress={this.bindMoreToggle.bind(this, index, item)}
          />
        );
      }
    } else {
      return;
    }
  }
  render() {
    return (
      <ScrollView
        ref={ref => (this.scrollView = ref)}
        style={{ backgroundColor: this.props.theme.colors.containerBackground }}
      >
        <View
          style={[
            this.state.longComments.length == 0
              ? { height: System.SCREEN_HEIGHT - 125 }
              : null
          ]}
          onLayout={this.listenListHeight.bind(this)}
        >
          <Text
            style={[
              styles.title,
              styles.longCommentsText,
              {
                borderBottomColor: this.props.theme.colors.border,
                color: this.props.theme.colors.text
              }
            ]}
          >
            {this.state.longComments.length} 条长评
          </Text>
          {this.state.longComments.length > 0 ? (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.longComments}
              renderItem={this.renderCommentItem}
            />
          ) : (
            <View style={styles.placeholderWrapper}>
              {this.props.theme.colors.themeType == "black" ? (
                <Image
                  source={require("../../assets/images/comments-placeholder-black.png")}
                  style={styles.placeholderImg}
                />
              ) : (
                <Image
                  source={require("../../assets/images/comments-placeholder-default.png")}
                  style={styles.placeholderImg}
                />
              )}

              <Text
                style={[
                  styles.placeholderText,
                  { color: this.props.theme.colors.visitedItem }
                ]}
              >
                深度长评虚位以待
              </Text>
            </View>
          )}
        </View>
        <View
          rippleDuration={600}
          rippleOpacity={0.1}
          style={
            this.state.longComments.length == 0
              ? {
                  borderTopColor: this.props.theme.colors.border,
                  borderTopWidth: 1
                }
              : null
          }
        >
          <TouchableOpacity
            style={[
              styles.shortCommentsWrapper,
              { borderColor:this.props.theme.colors.border, }
            ]}
            onPress={this.toggleShortComments}
            activeOpacity={0.4}
          >
            <Text
              style={[styles.title, { color: this.props.theme.colors.text }]}
            >
              {this.props.navigation.getParam("shortComments")} 条短评
            </Text>
            {!this.state.shortCommentsState ? (
              <Icon
                type="material-community"
                name="chevron-double-down"
                color={this.props.theme.colors.text}
              />
            ) : (
              <Icon
                type="material-community"
                name="chevron-double-up"
                color={this.props.theme.colors.text}
              />
            )}
          </TouchableOpacity>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.shortComments}
            renderItem={this.renderCommentItem}
          />
        </View>
        {/*  遮罩层 */}
        <Modal
          animationIn={"fadeIn"}
          style={styles.moda}
          isVisible={this.state.isModalVisible}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={400}
          backdropOpacity={0.5}
          onBackdropPress={this.bindModalSwitch}
          onBackButtonPress={this.bindAndroidBack}
          useNativeDriver={true}
        >
          {this.state.isModalVisible ? (
            <View
              renderToHardwareTextureAndroid={this.state.hardwareTextureSwitch}
              style={[styles.loadWrapper,{backgroundColor: this.props.theme.colors.containerBackground}]}
            >
                <ActivityIndicator animating={true} size={40} />
              <Text style={[styles.loadText,{ color: this.props.theme.colors.text}]}>努力加载中</Text>
            </View>
          ) : (
            <View />
          )}
        </Modal>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    paddingLeft: 15,
    height: 45,
    lineHeight: 45,
    fontSize: 14,
    color: "#000"
  },
  loadWrapper: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    width: 300,
    height: 80
  },
  longCommentsText: {
    borderBottomWidth: 1
  },
  shortCommentsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
    borderBottomWidth: 1
  },
  placeholderWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  placeholderText: {
    marginTop: 10
  },
  placeholderImg: {
    width: 130,
    height: 130
  },
  loadText: {
    fontSize: 16,
    marginLeft: 30
  },
  rightContainer: {
    alignContent: "flex-start",
    flex: 100
  },
  authorContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  author: {
    fontWeight: "bold",
    fontSize: 16
  },
  likesText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 3
  },
  likesButton: {
    height: 20
  },
  contentContainer: {
    marginVertical: 10
  },
  mainContent: {
    fontSize: 16,
    lineHeight: 22
  },
  replyContent: {
    color: "#767676"
  },
  moreBtn: {
    height: 24,
    borderRadius: 0
  },
  moreTitle: {
    fontSize: 14
  },
  date: {
    color: "#b6b6b6",
    fontSize: 12
  },
  extraContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
