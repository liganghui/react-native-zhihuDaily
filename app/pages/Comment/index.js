import React, { Component } from "react";
import { View, Text, StyleSheet, Image,ScrollView } from "react-native";
import Modal from "react-native-modal";
import Spinner from "react-native-spinkit";
import CardView from "react-native-cardview";
import { Icon ,Button} from "react-native-elements";
import { Tools, Api, Axios, System } from "../../config";

export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("comments")
        ? navigation.getParam("comments") + " 条点评"
        : null
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      id: this.props.navigation.getParam("id"),
      longComments: [],
      shortComments: []
    };
  }
  componentDidMount() {
    this._initLongComments();
  }
  _initLongComments() {
    this.bindModalSwitch();
    Axios.get(Api.longComments + this.state.id + "/long-comments")
      .then(res => {
        if (res.data && res.data.comments.length > 0) {
          this.setState(
            {
              longComments: res.data.comments
            },
            () => {
              this.bindModalSwitch();
            }
          );
        } else {
          this.bindModalSwitch();
        }
      })
      .catch(error => {
        this.bindModalSwitch();
      });
  }
  _initShortComments() {
    Axios.get(Api.shortComments + this.state.id + "/short-comments")
      .then(res => {
        console.warn(res);
      })
      .catch(error => {});
  }

  bindModalSwitch = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
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
  render() {
    return (
      <ScrollView >
        <View style={{height:System.SCREEN_HEIGHT-125}}>
          <Text style={styles.title}>
            {this.state.longComments.length} 条长评
          </Text>
          {this.state.longComments.length > 0 ? (
            this.state.longComments.map((item, index) => {
                <Text>{item.content}</Text>
            })
          ) : (
            <View style={styles.placeholderWrapper}>
              <Image
                source={require("../../assets/images/commentsPlaceholder.png")}
                style={styles.placeholderImg}
              />
              <Text style={styles.placeholderText}>深度长评虚位以待</Text>
            </View>
          )}
        </View>
        <View style={styles.shortCommentsWrapper}>
          <Text style={styles.title}>{ this.props.navigation.getParam("shortComments")} 条短评</Text>
          <Icon type='material-community' name='chevron-double-down' color='rgba(0,0,0,.2)' />
          {/* <Icon type='material-community' name='chevron-double-up' color='#00aced' /> */}
        </View>
        {/*  遮罩层 */}
        <Modal
          style={styles.modal}
          animationIn={"fadeIn"}
          hideModalContentWhileAnimating={true}
          isVisible={this.state.isModalVisible}
          backdropOpacity={0.5}
          onBackdropPress={this.bindModalSwitch}
          onBackButtonPress={this.bindAndroidBack}
          useNativeDriver={true}
        >
          {this.state.isModalVisible ? (
            <CardView
              cardElevation={5}
              cornerRadius={2}
              style={styles.loadWrapper}
            >
              <Spinner
                isVisible={this.state.isModalVisible}
                size={45}
                type={"Circle"}
                color={"#00a2ed"}
              />
              <Text style={styles.loadText}>努力加载中</Text>
            </CardView>
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
    color: "#000",
    borderBottomColor: "#eee",
    borderBottomWidth: 1
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
  longCommentsWrapper:{
  
  },
  shortCommentsWrapper:{
    borderTopColor:"#eee",
    borderTopWidth: 1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingRight: 15,
  },
  placeholderWrapper: {
    justifyContent:'center',
    alignItems: 'center',
    flex:1
  },
  placeholderText: {
    color:'rgba(0,0,0,0.2)',
    marginTop: 10,
  },
  placeholderImg: {
    width:130,
    height:130
  },
  loadText: {
    fontSize: 16,
    marginLeft: 30
  }
});
