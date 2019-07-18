//  侧栏抽屉

import React, { Component } from "react";
import { View, Text, StyleSheet, DeviceEventEmitter,ScrollView } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Avatar, ListItem ,Icon} from "react-native-elements";
import { Tools } from "../../utils";
import { observer, inject } from "mobx-react";



/* 
 *  为了给部分栏目启用日期选择功能 , 这里需要为栏目追加日期范围信息
 * 
*/
const SectionInfo=[
  {
    id:2,
    title:'瞎扯',
    startTime:'',
    endTime:'',
    dateSelect:true
  },
  {
    id:35,
    title:'小事',
    startTime:'2016-06-22',
    endTime:'',
    dateSelect:true
  },
  {
    id:1,
    title:'深夜惊奇',
    startTime:'',
    endTime:'2016-06-01',
    dateSelect:true
  },
  {
    id:29,
    title:'大误',
    startTime:'2016-02-01',
    endTime:'',
    dateSelect:true
  }
]






@inject("theme")
@observer
export default class index extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * 跳转到栏目列表
   */
  bindSectionTap=(title,id)=>{
    
    SectionInfo.forEach((item,index) => {
      if(item.id==id){
        this.props.navigation.navigate("Section", {
            ...item
        });
        return false
      }
      if(index==SectionInfo.length-1){
        this.props.navigation.navigate("Section", {
          id:id,
          title:title
      });
      }
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
          <View style={{backgroundColor:this.props.theme.colors.listBackground,flexDirection:'row',alignItems:'center',paddingLeft:15,paddingVertical:10}}>
            <Text style={{color:this.props.theme.colors.text,fontSize:12}}>热门栏目</Text>
          </View>
          <View >
            <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}} rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}  title={"瞎扯"} onPress={this.bindSectionTap.bind(this,'瞎扯',2)} />
            <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />} title={"小事"}  onPress={this.bindSectionTap.bind(this,'小事',35)}/>
            <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"深夜惊奇"}  onPress={this.bindSectionTap.bind(this,'深夜惊奇',1)}/>
            <ListItem   containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"大误"}  onPress={this.bindSectionTap.bind(this,'大误',29)}/>
          </View>



          {/* 
          
            由于日报栏目众多 , 包含一些广告和内容过少的栏目 ,  此处手动给栏目排序. 
            TODO: 优化此部分实现 , 通过id筛除不需要的栏目 。
          */}

          <View style={{backgroundColor:this.props.theme.colors.listBackground,flexDirection:'row',alignItems:'center',paddingLeft:15,paddingVertical:10}}>
            <Text style={{color:this.props.theme.colors.text,fontSize:12}}>历史栏目</Text>
          </View>
          <View >
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"放映机"} onPress={this.bindSectionTap.bind(this,'放映机',28)} />
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"《职人介绍所》"}  onPress={this.bindSectionTap.bind(this,'《职人介绍所》',33)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"选个好专业"} onPress={this.bindSectionTap.bind(this,'选个好专业',36)} />
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"上个好大学"}  onPress={this.bindSectionTap.bind(this,'上个好大学',37)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"报个好志愿"}  onPress={this.bindSectionTap.bind(this,'报个好志愿',108)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"知乎好问题"}  onPress={this.bindSectionTap.bind(this,'知乎好问题',38)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"发现中国"}  onPress={this.bindSectionTap.bind(this,'发现中国',43)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"辉煌中国"}  onPress={this.bindSectionTap.bind(this,'辉煌中国',81)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"即使独自生活"}  onPress={this.bindSectionTap.bind(this,'即使独自生活',46)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"NBA 赛场内外"}  onPress={this.bindSectionTap.bind(this,'NBA 赛场内外',57)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"自由职业之路"}  onPress={this.bindSectionTap.bind(this,'自由职业之路',50)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"分享经济浪潮"}  onPress={this.bindSectionTap.bind(this,'分享经济浪潮',48)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"商业银行职业进阶之路"}  onPress={this.bindSectionTap.bind(this,'商业银行职业进阶之路',56)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"运动在冬季"}  onPress={this.bindSectionTap.bind(this,'运动在冬季',52)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"出国去过冬"}  onPress={this.bindSectionTap.bind(this,'出国去过冬',53)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"我爱看美剧"} onPress={this.bindSectionTap.bind(this,'我爱看美剧',58)} />
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"职业倦怠与跳槽须知"} onPress={this.bindSectionTap.bind(this,'职业倦怠与跳槽须知',59)} />
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"睡个好觉吧"} onPress={this.bindSectionTap.bind(this,'睡个好觉吧',60)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"拍一部电影"}  onPress={this.bindSectionTap.bind(this,'拍一部电影',61)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"人工智能 · 自动驾驶"}  onPress={this.bindSectionTap.bind(this,'人工智能 · 自动驾驶',62)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"夜宵不断档"} onPress={this.bindSectionTap.bind(this,'夜宵不断档',111)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"游戏不断电"}  onPress={this.bindSectionTap.bind(this,'游戏不断电',112)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"2018 世界杯"}  onPress={this.bindSectionTap.bind(this,'2018 世界杯',107)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"那年我高考"}  onPress={this.bindSectionTap.bind(this,'那年我高考',106)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"工作在国外"}  onPress={this.bindSectionTap.bind(this,'工作在国外',105)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"城市青年生活故事"}  onPress={this.bindSectionTap.bind(this,'城市青年生活故事',103)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"汶川地震十周年纪念"}  onPress={this.bindSectionTap.bind(this,'汶川地震十周年纪念',104)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"315 消费者权益日"}  onPress={this.bindSectionTap.bind(this,'315 消费者权益日',101)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"城市青年避坑手册"}  onPress={this.bindSectionTap.bind(this,'城市青年避坑手册',100)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"奥斯卡"}  onPress={this.bindSectionTap.bind(this,'奥斯卡',99)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"2017 年度盘点"}  onPress={this.bindSectionTap.bind(this,'2017 年度盘点',92)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"自己做的，了不起"}  onPress={this.bindSectionTap.bind(this,'自己做的，了不起',88)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"2017 诺奖巡礼"}  onPress={this.bindSectionTap.bind(this,'2017 诺奖巡礼',87)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"人生的名义"}  onPress={this.bindSectionTap.bind(this,'人生的名义',86)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"就练 15 分钟"}  onPress={this.bindSectionTap.bind(this,'就练 15 分钟',85)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"宅在家里玩游戏"}  onPress={this.bindSectionTap.bind(this,'宅在家里玩游戏',84)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"放假好好吃"}  onPress={this.bindSectionTap.bind(this,'放假好好吃',83)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"每周一吸"}  onPress={this.bindSectionTap.bind(this,'每周一吸',78)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"节日特辑"}  onPress={this.bindSectionTap.bind(this,'节日特辑',79)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"日常经济学 · 我为什么这么穷"}  onPress={this.bindSectionTap.bind(this,'日常经济学 · 我为什么这么穷',77)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"日常经济学 · 博弈人生"}  onPress={this.bindSectionTap.bind(this,'日常经济学 · 博弈人生',70)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"职场头两年"}  onPress={this.bindSectionTap.bind(this,'职场头两年',76)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"基础护肤"}  onPress={this.bindSectionTap.bind(this,'基础护肤',63)}/>
             <ListItem  containerStyle={{ backgroundColor: this.props.theme.colors.containerBackground,paddingLeft:20}} titleStyle={{color:this.props.theme.colors.text}}   rightElement={<Icon type="font-awesome" name="angle-right" size={22} color={"#d8d6d6"} />}title={"2016 年度盘点"}  onPress={this.bindSectionTap.bind(this,'2016 年度盘点',55)}/>
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
