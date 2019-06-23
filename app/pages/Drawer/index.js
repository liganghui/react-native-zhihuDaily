//  侧栏抽屉

import React, { Component } from "react";
import { View, Text, StyleSheet, DeviceEventEmitter,ScrollView } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Avatar, ListItem ,Icon} from "react-native-elements";
import { Tools } from "../../utils";
import { observer, inject } from "mobx-react";

@inject("theme")
@observer
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: ""
    };
  }

  /**
   * 跳转到栏目列表
   */
  bindSectionTap=(title,id)=>{
    this.props.navigation.navigate("Section", {
      id:id,
      title:title
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.userContainer,
            { backgroundColor: this.props.theme.colors.navBackground }
          ]}
        >
        
         
          <Text style={{color:'#fff',fontSize:16}}>日报专栏</Text>
        </View> 
        <ScrollView>
          <View style={{backgroundColor:'#f1f1f1',flexDirection:'row',alignItems:'center',paddingLeft:15,paddingVertical:10}}>
            <Text style={{color:this.props.theme.colors.text,fontSize:12}}>热门栏目</Text>
          </View>
          <View >
            <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} rightElement={<Icon type="font-awesome" name="angle-right" size={22} color="#666" />}  title={"瞎扯"} onPress={this.bindSectionTap.bind(this,'瞎扯',2)} />
            <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}  title={"小事"}  onPress={this.bindSectionTap.bind(this,'小事',35)}/>
            <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"深夜惊奇"}  onPress={this.bindSectionTap.bind(this,'深夜惊奇',1)}/>
            <ListItem bottomDivider chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"大误"}  onPress={this.bindSectionTap.bind(this,'大误',29)}/>
          </View>
          <View style={{backgroundColor:'#f1f1f1',flexDirection:'row',alignItems:'center',paddingLeft:15,paddingVertical:10}}>
            <Text style={{color:this.props.theme.colors.text,fontSize:12}}>历史栏目</Text>
          </View>
          <View >
             <ListItem topDivider chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"放映机"} onPress={this.bindSectionTap.bind(this,'放映机',28)} />
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"《职人介绍所》"}  onPress={this.bindSectionTap.bind(this,'《职人介绍所》',33)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"读读日报 24 小时热门"}  onPress={this.bindSectionTap.bind(this,'读读日报 24 小时热门',34)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"选个好专业"} onPress={this.bindSectionTap.bind(this,'选个好专业',36)} />
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"上个好大学"}  onPress={this.bindSectionTap.bind(this,'上个好大学',37)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"报个好志愿"}  onPress={this.bindSectionTap.bind(this,'报个好志愿',108)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"知乎好问题"}  onPress={this.bindSectionTap.bind(this,'知乎好问题',38)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"发现中国"}  onPress={this.bindSectionTap.bind(this,'发现中国',43)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"辉煌中国"}  onPress={this.bindSectionTap.bind(this,'辉煌中国',81)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"即使独自生活"}  onPress={this.bindSectionTap.bind(this,'即使独自生活',46)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"NBA 赛场内外"}  onPress={this.bindSectionTap.bind(this,'NBA 赛场内外',57)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"自由职业之路"}  onPress={this.bindSectionTap.bind(this,'自由职业之路',50)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"分享经济浪潮"}  onPress={this.bindSectionTap.bind(this,'分享经济浪潮',48)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"商业银行职业进阶之路"}  onPress={this.bindSectionTap.bind(this,'商业银行职业进阶之路',56)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"运动在冬季"}  onPress={this.bindSectionTap.bind(this,'运动在冬季',52)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"出国去过冬"}  onPress={this.bindSectionTap.bind(this,'出国去过冬',53)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"我爱看美剧"} onPress={this.bindSectionTap.bind(this,'我爱看美剧',58)} />
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"职业倦怠与跳槽须知"} onPress={this.bindSectionTap.bind(this,'职业倦怠与跳槽须知',59)} />
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"睡个好觉吧"} onPress={this.bindSectionTap.bind(this,'睡个好觉吧',60)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"拍一部电影"}  onPress={this.bindSectionTap.bind(this,'拍一部电影',61)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"人工智能 · 自动驾驶"}  onPress={this.bindSectionTap.bind(this,'人工智能 · 自动驾驶',62)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"夜宵不断档"} onPress={this.bindSectionTap.bind(this,'夜宵不断档',111)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"游戏不断电"}  onPress={this.bindSectionTap.bind(this,'游戏不断电',112)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"2018 世界杯"}  onPress={this.bindSectionTap.bind(this,'2018 世界杯',107)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"那年我高考"}  onPress={this.bindSectionTap.bind(this,'那年我高考',106)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"工作在国外"}  onPress={this.bindSectionTap.bind(this,'工作在国外',105)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"城市青年生活故事"}  onPress={this.bindSectionTap.bind(this,'城市青年生活故事',103)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"汶川地震十周年纪念"}  onPress={this.bindSectionTap.bind(this,'汶川地震十周年纪念',104)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"315 消费者权益日"}  onPress={this.bindSectionTap.bind(this,'315 消费者权益日',101)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"城市青年避坑手册"}  onPress={this.bindSectionTap.bind(this,'城市青年避坑手册',100)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"奥斯卡"}  onPress={this.bindSectionTap.bind(this,'奥斯卡',99)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"2017 年度盘点"}  onPress={this.bindSectionTap.bind(this,'2017 年度盘点',92)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"自己做的，了不起"}  onPress={this.bindSectionTap.bind(this,'自己做的，了不起',88)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"2017 诺奖巡礼"}  onPress={this.bindSectionTap.bind(this,'2017 诺奖巡礼',87)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"人生的名义"}  onPress={this.bindSectionTap.bind(this,'人生的名义',86)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"就练 15 分钟"}  onPress={this.bindSectionTap.bind(this,'就练 15 分钟',85)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"宅在家里玩游戏"}  onPress={this.bindSectionTap.bind(this,'宅在家里玩游戏',84)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"放假好好吃"}  onPress={this.bindSectionTap.bind(this,'放假好好吃',83)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"每周一吸"}  onPress={this.bindSectionTap.bind(this,'每周一吸',78)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"节日特辑"}  onPress={this.bindSectionTap.bind(this,'节日特辑',79)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"日常经济学 · 我为什么这么穷"}  onPress={this.bindSectionTap.bind(this,'日常经济学 · 我为什么这么穷',77)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"日常经济学 · 博弈人生"}  onPress={this.bindSectionTap.bind(this,'日常经济学 · 博弈人生',70)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"职场头两年"}  onPress={this.bindSectionTap.bind(this,'职场头两年',76)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"基础护肤"}  onPress={this.bindSectionTap.bind(this,'基础护肤',63)}/>
             <ListItem chevron containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} title={"2016 年度盘点"}  onPress={this.bindSectionTap.bind(this,'2016 年度盘点',55)}/>
          </View>
        </ScrollView>
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
    paddingHorizontal: 10,
    color:'#fff',
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  userName: {
    flex: 1,
    marginLeft: 25,
    color: "#fff",
    fontSize: 16
  },
  listContainer: {
    flex: 1
  },
});
