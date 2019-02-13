//  日报详情页

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  WebView,
  ScrollView,
  Animated
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { Tile } from "react-native-elements";
export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTransparent:true,
      headerStyle: {
        opacity:params.headerOpacity,
        // display:params.headerDisplay,
        backgroundColor:'#008bed'
      }
    };
  };
  constructor(props) {
    super(props);
    const id = this.props.navigation.getParam("itemId");
    this.state = {
      itemId: id,
      stories: {
        images:[]
      },
      headerDisplay:'flex',
      headerOpacity:1,
      offset: {}
    };
    this.props.navigation.setParams({
      headerOpacity:1,
      headerDisplay:'flex',
    })
  }
  componentDidMount() {
    fetch(API.details + this.state.itemId)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          stories: responseJson,
        });
      })
      .catch(error => {
       
      });
  }
  onMessage = (event) => {
    //webview中的html页面传过来的的数据在event.nativeEvent.data上
    let direction=event.nativeEvent.data;
    if(direction=='up'){
      this.props.navigation.setParams({
        headerOpacity:1
      })
    }else if(direction=='down'){
      this.props.navigation.setParams({
        headerOpacity:0
      })
   }
  }

  render() {
    const injectedJavaScript = `
  (function () {
    // 函数节流
    function throttle(fn,context,delay,mustApplyTime){
      clearTimeout(fn.timer);
      fn._cur=Date.now();  //记录当前时间

      if(!fn._start){      //若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
          fn._start=fn._cur;
      }
      if(fn._cur-fn._start>mustApplyTime){ 
      //当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
          fn(context);
          fn._start=fn._cur;
      }else{
          fn.timer=setTimeout(function(){
              fn(context);
          },delay);
      }
    }
    /*  
     * 功能描述：
     * 	  当滚动条处于banner高度区间时，使标题栏渐隐与渐显。
     * 
     */
    var dom = document.getElementsByClassName('detail-wrapper')[0];
    var y;
    document.onscroll = function() {
      var scrollTop = document.body.scrollTop;
      if(scrollTop <= 250) { //banner+bar高度
        var  top = parseInt(50 - scrollTop / 2) + 'px';
        dom.style.top = top;
      }
      var scrollDirection=y>scrollTop?'up':'down';
      y=scrollTop;
      if(!!window.postMessage) {
        throttle(window.postMessage,scrollDirection,350,1000 )
      }
    }
}());
`;

let bootstrap= `
<!DOCTYPE html>
      <html>
        <head>
          <link href="${this.state.stories.css}" rel="stylesheet" />
          <style>
          .detail-wrapper {
            width: 100%;
            height: 200px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            position: fixed;
            top: 55px;
            left: 0;
            z-index: 1;
          }
          .detail-wrapper:after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 55px;
            bottom: 0;
            background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8));
            z-index: 5;
          }
          .title {
            margin: 0 18px 18px !important;
            position: absolute;
            left: 0;
            z-index: 10;
            bottom: 10px;
            color: #fff;
            line-height: 1.3;
            font-size: 22px;
            text-shadow: rgba(0, 0, 0, 0.6) 0 0 2px;
          }
          
          .image_source {
            z-index: 10;
            position: absolute;
            right: 15px;
            bottom: 8px;
            font-size: 10px;
            color: #eeeeee;
          }
          .main-wrap{
            position:absolute;
            z-index: 100;
          }
          .img-place-holder{
            display:'none';
            height:250px !important;
            background:transparent !important;
          }
          .content-inner,
			.headline-background {
				background: #fff;
			}
			
          .content-wrap {
            background: none;
          }
          </style>
          <script>
          window.onload=function(){
          var dom = document.getElementsByClassName('detail-wrapper')[0];
          document.addEventListener('message', function(e) {
            dom.style.top = e.data;
         })
        }
          </script>
        <body>
          <div class="detail-wrapper" style="background-image:url('${this.state.stories.image}')">
				    <!--日报标题-->
				    <p class="title">${this.state.stories.title?this.state.stories.title:''}</p>
				    <!--图片来源-->
				    <span class="image_source">${this.state.stories.image_source?this.state.stories.image_source:''}</span>
			    </div>
          ${this.state.stories.body?this.state.stories.body:''}
        </body>
</html>`;

    return (
      <WebView
      style={styles.wrapper}
         source={{ html:bootstrap, baseUrl: "" }}
         injectedJavaScript={injectedJavaScript}
         onMessage={this.onMessage}
       />      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3"
  },
  wrapper: {
    height:'100%'
  },
  title: {
    backgroundColor: "rgba(0,0,0,0.2)",
    textAlign: "left", //文本左对齐
    fontSize: 24, //调整字号
    fontWeight: "400", //去除默认加粗
    textAlignVertical: "bottom", // 底部对齐
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    height: "100%",
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20
  }
});
