/* eslint-disable no-undef */
/*
 *  日报详情页  组件嵌套结构 由外向内 :  Carousel-->ParallaxScrollView-->AutoHeightWebView
 *  Carousel ：滑动翻页组件
 *  ParallaxScrollView ：视差滚动动画组件
 *  AutoHeightWebView ：Webview 组件 , 用于渲染HTML和解决ScrollView下webview高度塌陷问题.
 *
 *
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import AutoHeightWebView from 'react-native-autoheight-webview';
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Container} from 'native-base';
import Share from 'react-native-share';
import * as Animatable from 'react-native-animatable';
import {observer, inject} from 'mobx-react';
import {Tools, System} from '../../utils';
import Carousel from 'react-native-snap-carousel';
const IMG_MAX_HEIGHT = 200; //图像最大高度
const HEAD_HEIGHT = 50; //导航栏(Header)高度
const HEADER_MIN_HEIGHT = 0; //导航栏最小高度
let tempHeight = HEAD_HEIGHT; // 记录当前导航栏高度
let offsetY = 0; // 记录Y轴坐标
var that; //保存this引用
@inject('theme')
@observer
class Details extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const {params} = navigation.state;
    return {
      headerTransparent: true,
      gesturesEnabled: false,
      headerStyle: {
        height: params.height ? params.height : HEAD_HEIGHT,
        backgroundColor: screenProps.theme,
        opacity: params.opacity,
        overflow: 'hidden',
      },
      headerRight: (
        <View style={styles.headerRightWrapper}>
          {/* 分享 */}
          <Button
            type="clear"
            onPress={() => {
              that.openShare();
            }}
            icon={<Icon type="material" name="share" size={24} color="white" />}
          />
          {/* 收藏 */}
          <Button
            type="clear"
            onPress={() => {
              that.bindHeaderBtnTap('collect');
            }}
            icon={
              <Animatable.View ref={ref => (that.state.collectView = ref)}>
                <Icon
                  type="material"
                  name="star"
                  size={24}
                  color={params.collect ? '#ffff00' : '#fff'}
                />
              </Animatable.View>
            }
          />
          {/* 评论 */}
          <Button
            title={
              params.extra
                ? String(
                    params.extra.comments > 999
                      ? '999+'
                      : params.extra.comments,
                  )
                : ' ... '
            }
            titleStyle={styles.headerRightButton}
            type="clear"
            onPress={() => {
              if (params.extra) {
                navigation.navigate('Comment', {
                  id: navigation.getParam('idArray')[that.state.activeIndex].id,
                  comments: params.extra.comments,
                  longComments: params.extra.long_comments,
                  shortComments: params.extra.short_comments,
                });
              }
            }}
            icon={
              <Icon type="material" name="comment" size={24} color="white" />
            }
          />
          {/* 点赞 */}
          <Button
            title={
              // 判断是否大于1000 ,大于 1000 用 K 为单位
              params.extra
                ? String(
                    params.extra.popularity > 1000
                      ? Number(params.extra.popularity / 1000).toFixed(1) + 'K'
                      : params.extra.popularity,
                  )
                : ' ... '
            }
            titleStyle={styles.headerRightButton}
            type="clear"
            onPress={() => {
              that.bindHeaderBtnTap('like');
            }}
            icon={
              <Animatable.View ref={ref => (that.state.popularityView = ref)}>
                <Icon
                  type="material"
                  name="thumb-up"
                  size={24}
                  color={params.like ? '#fea500' : '#fff'}
                />
              </Animatable.View>
            }
          />
        </View>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0); // 记录Y轴滚动坐标 用户计算滚动方向
    this.state = {
      daily: {
        section: null, //栏目分类信息
      },
      idArray: this.props.navigation.getParam('idArray'),
      body: null, //供webview渲染的HTML格式内容
      extra: {}, //日报额外信息
      webviewWidth: null, // 动态调整webview为设备的宽度
      webviewInit: null, // 记录webviewI初始化状态
      like: false, //点赞按钮
      collect: false, //收藏按钮
      bigSize: false, //webview大字号
      opacity: new Animated.Value(0),
      hardwareTextureSwitch: true, //GPU加速开关
      headerHeight: new Animated.Value(HEAD_HEIGHT),
      webViewHeight: System.SCREEN_HEIGHT - 250,
      silderFristItem: this.props.navigation.getParam('selectdIndex'),
      activeIndex: this.props.navigation.getParam('selectdIndex'),
    };
    let opacity = this.scrollY.interpolate({
      inputRange: [0, IMG_MAX_HEIGHT, 210, 211], //当滚动超出图片高度时 确保导航条为不透明
      outputRange: [1, 0, 0, 1], //导航栏透明度 0 透明 1 不透明
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
    this.props.navigation.setParams({height: this.state.headerHeight});
    this.props.navigation.setParams({opacity: opacity});
    that = this;
  }
  componentDidMount() {
    try {
      this.init(this.state.idArray[this.state.silderFristItem].id);
    } catch {
      Tools.toast('日报参数异常');
    }
  }
  /*
   *  日报内容初始化
   *
   *    详情页 首次打开时 WebView初始化会占用大量性能 ,
   *    导致页面push动画丢帧 , 通过判断状态延缓WebView加载.
   */
  init(id) {
    //避免用户急速滑动切换
    if (this.state.webviewInit !== null && !this.state.webviewInit) {
      return false;
    } else {
      this.setState({
        webviewInit: false,
      });
    }
    // 获取日报主体数据
    this.getDailyData(id);
    // 检查网络状态 只有在联网时加载评论
    Tools.getNetworkState().then(newWorkInfo => {
      if (newWorkInfo.online) {
        this.getExtraData(id);
      }
    });
    // 监测是否开启了大字体
    storage
      .load({
        key: 'bigSize',
      })
      .then(res => {
        if (res) {
          this.setState({
            bigSize: true,
          });
        }
      })
      .catch(() => []);
  }
  /*
   * 日报数据初始化
   *    详情页 首次打开时 WebView初始化会占用大量性能 ,
   */
  getDailyData(id) {
    storage
      .load({
        key: 'details',
        id,
      })
      .then(response => {
        console.log(response);
        if (!response || !response.body) {
          Tools.toast('服务器数据异常');
          return false;
        }
        // 格式化HTML
        let formatHtml = htmlString => {
          let renderHtml = `<!DOCTYPE html><html><head><meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
          <link rel="stylesheet" href="${response.css[0]}" /></head>
              <style>${
                this.state.bigSize
                  ? '*{font-size:125%} .img-place-holder{display:none}'
                  : '.img-place-holder{ display:none'
              }</style>
              <body class=${
                this.props.theme.colors.themeType === 'black' ? 'night' : ''
              }>${htmlString}</body></html>`;
          return renderHtml;
        };
        this.setState({
          daily: response,
          body: formatHtml(response.body),
          hardwareTextureSwitch: false,
        });
      })
      .catch(() => {
        this.setState({
          webviewInit: true,
        });
      });
  }
  // 日报额外信息  (评论数,点赞数等)
  getExtraData(id) {
    storage
      .load({
        key: 'extra',
        id: id,
      })
      .then(res => {
        if (res) {
          this.props.navigation.setParams({extra: res});
          this.setState({
            extra: res,
          });
        }
      })
      .catch(() => {});
  }

  /*
   * 接受并处理Webview发送的信息
   * @param {Object} event 消息事件对象
   */
  bindMessage(event) {
    let data = event.nativeEvent.data;
    if (String(data).indexOf('img:') !== -1) {
      let imgUrl = data.split('img:')[1].replace('"', '');
      this.props.navigation.navigate('ImgView', {
        url: imgUrl,
      });
    } else if (String(data).indexOf('init:') !== -1) {
      this.setState({webviewInit: true});
    } else if (String(data).indexOf('a:') !== -1) {
      let src = data.split('a:')[1].replace('"', '');
      Linking.openURL(src).catch(() => {
        Tools.toast('无法打开浏览器了..');
      });
    }
  }
  /**
   *  系统分享弹窗
   */
  openShare() {
    let shareOptions = {
      title: '知乎日报',
      message: '知乎日报 · ' + that.state.daily.title,
      url: that.state.daily.share_url,
      subject: 'Share Link',
    };
    Share.open(shareOptions);
  }

  /**
   *  监听页面滚动 记录滚动方向 , 控制Header显示.
   *  @param {Object} event 滚动事件对象
   */
  bindOnScroll = event => {
    let y = event.nativeEvent.contentOffset.y;
    let direction = y > offsetY ? 'down' : 'up';
    offsetY = y;
    if (y <= IMG_MAX_HEIGHT) {
      this.state.headerHeight.setValue(HEAD_HEIGHT);
    } else {
      if (direction === 'down') {
        if (tempHeight <= HEAD_HEIGHT) {
          this.state.headerHeight.setValue(HEADER_MIN_HEIGHT);
          tempHeight = HEADER_MIN_HEIGHT;
        }
      } else if (direction === 'up') {
        if (tempHeight === HEADER_MIN_HEIGHT) {
          this.state.headerHeight.setValue(HEAD_HEIGHT);
          tempHeight = HEAD_HEIGHT;
        }
      }
    }
  };
  /**
   * 跳转到栏目列表
   */
  bindSectionTap = () => {
    this.props.navigation.push('Section', {
      id: this.state.daily.section.id,
      title: this.state.daily.section.name,
    });
  };
  /**
   * 处理收藏与点赞点击事件(静态模拟无实际功能)
   * @param {String} type 区分收藏和点赞
   */
  bindHeaderBtnTap(type) {
    let extra = that.state.extra;
    if (!extra.popularity) {
      return;
    } else if (type === 'like') {
      if (!that.state.like) {
        that.state.popularityView.tada(800);
        Tools.toast('+1');
        extra.popularity += 1;
      } else {
        extra.popularity -= 1;
      }
      that.setState(
        {
          like: !that.state.like,
          extra,
        },
        () => {
          this.props.navigation.setParams({like: that.state.like});
          this.props.navigation.setParams({
            popularity: String(extra.popularity),
          });
        },
      );
    } else if (type === 'collect') {
      that.state.collectView.bounceIn(800);
      that.setState(
        {
          collect: !that.state.collect,
        },
        () => {
          this.props.navigation.setParams({collect: that.state.collect});
        },
      );
    }
  }

  renderSilder = data => {
    return (
      <Container>
        {data.item.selected ? (
          <ParallaxScrollView
            // 无数据时 禁止滚动
            ref={el => {
              this.parallaxScrollView = el;
            }}
            scrollEnabled={this.state.body ? true : false}
            contentBackgroundColor={this.props.theme.colors.containerBackground}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
              {
                listener: this.bindOnScroll,
              },
            )}
            parallaxHeaderHeight={250}
            renderBackground={this.renderSectioHeader}>
            <AutoHeightWebView
              source={{html: this.state.body}}
              // 禁止视频自动播放
              mediaPlaybackRequiresUserAction={true}
              onMessage={this.bindMessage.bind(this)}
              // 为webview图片绑定点击事件 , 触发查看大图
              customScript={`
              window.onload=function(){
              window.ReactNativeWebView.postMessage(JSON.stringify("init:true"));
              var imgs = document.getElementsByTagName("img");
              if(imgs){
                for(var i=0;i<imgs.length;i++){
                  imgs[i].addEventListener('click',function(e){
                    window.ReactNativeWebView.postMessage(JSON.stringify("img:"+this.src));
                  })
                }
              }
              var a = document.getElementsByTagName('a');
              if(a){
                for(var i = 0; i < a.length; i++){
                a[i].onclick = function (event) {
                  window.ReactNativeWebView.postMessage(JSON.stringify("a:"+this.href));
                  event.preventDefault();
                }
              }
            }
          }
         `}
            />

            {/* 栏目信息  */}
            {this.state.daily.section && this.state.webviewInit ? (
              <TouchableOpacity
                style={[
                  styles.sectionWrapper,
                  {backgroundColor: this.props.theme.colors.buttonBackground},
                ]}
                onPress={this.bindSectionTap}>
                <Image
                  style={styles.thumbnailImg}
                  source={{uri: this.state.daily.section.thumbnail}}
                />
                <Text
                  style={[
                    styles.thumbnailName,
                    {color: this.props.theme.colors.text},
                  ]}>
                  本文来自：{this.state.daily.section.name} · 合集
                </Text>
                <Icon
                  iconStyle={styles.iconRightArrow}
                  name="angle-right"
                  type="font-awesome"
                  color="#333"
                  size={22}
                />
              </TouchableOpacity>
            ) : null}
          </ParallaxScrollView>
        ) : null}
      </Container>
    );
  };

  // 渲染背景图
  renderSectioHeader = () => {
    const imgTop = this.scrollY.interpolate({
      inputRange: [0, 400],
      outputRange: [HEAD_HEIGHT, -HEAD_HEIGHT],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
    return (
      <Animated.View key="background" style={{translateY: imgTop}}>
        <Image
          style={[
            styles.backgroundImage,
            {backgroundColor: this.props.theme.colors.containerBackground},
          ]}
          source={{uri: this.state.daily.image}}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
          style={styles.linearGradient}>
          <Text style={[styles.title]}>{this.state.daily.title}</Text>
          <Text style={[styles.source]}>{this.state.daily.image_source}</Text>
        </LinearGradient>
      </Animated.View>
    );
  };
  render() {
    return (
      <Container
        style={{backgroundColor: this.props.theme.colors.containerBackground}}
        renderToHardwareTextureAndroid={this.state.hardwareTextureSwitch}
        onLayout={event => {
          this.setState({webviewWidth: event.nativeEvent.layout.width});
        }}>
        <Carousel
          ref={el => {
            this.carousel = el;
          }}
          swipeThreshold={60} //触发翻页的X轴滑动距离
          inactiveSlideScale={1}
          contentContainerCustomStyle={{
            minWidth: System.SCREEN_WIDTH * this.state.idArray.length,
          }}
          firstItem={this.state.silderFristItem} //要第一个显示的索引
          initialScrollIndex={this.state.silderFristItem}
          getItemLayout={(data, itmeIndex) => ({
            length: System.SCREEN_WIDTH,
            offset: System.SCREEN_WIDTH * itmeIndex, // X轴偏移值 , 确保显示正确的item项
            itmeIndex,
          })}
          data={this.state.idArray}
          renderItem={this.renderSilder}
          sliderWidth={System.SCREEN_WIDTH}
          itemWidth={System.SCREEN_WIDTH}
          scrollEnabled={
            // 避免用户急速滑动切换
            this.state.webviewInit !== null && !this.state.webviewInit
              ? false
              : true
          }
          inactiveSlideOpacity={1} //切换过渡效果的透明值
          onBeforeSnapToItem={previousIndex => {
            // 更新当前active项 . 记录日报的访问记录 .
            let swipeDirection =
              previousIndex > this.carousel.currentIndex ? 'right' : 'left';
            let i;
            let ary = this.state.idArray;
            this.state.idArray.forEach((item, idIndex) => {
              if (item.selected) {
                i = idIndex;
              }
            });
            // 判断用户滑动方向
            if (swipeDirection === 'left') {
              ary[i - 1].selected = true;
              storage.save({
                key: 'visited',
                id: ary[i - 1].id,
                data: true,
                expires: null,
              });
            } else if (swipeDirection === 'right') {
              ary[i + 1].selected = true;
              storage.save({
                key: 'visited',
                id: ary[i + 1].id,
                data: true,
                expires: null,
              });
            }
            // 更新选中状态
            ary[i].selected = false;
            // 重置动画参数
            tempHeight = HEAD_HEIGHT;
            offsetY = 0;
            this.scrollY.setValue(0);
            this.state.opacity.setValue(1);
            this.state.headerHeight.setValue(HEAD_HEIGHT);
            // 更新选中状态和重置数据
            this.setState(
              {
                activeIndex: previousIndex,
                daily: {
                  body: null,
                  section: null,
                },
                body: null,
                extra: {},
                like: false,
                collect: false,
                idArray: ary,
              },
              () => {
                // 根据滑动方向 获取数据
                swipeDirection === 'left'
                  ? this.init(this.state.idArray[i - 1].id)
                  : this.init(this.state.idArray[i + 1].id);
                if (previousIndex === 0) {
                  Tools.toast('当前为第一项');
                } else if (previousIndex === this.state.idArray.length - 1) {
                  Tools.toast('当前为最后一项');
                }
              },
            );
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  headerRightWrapper: {
    overflow: 'hidden',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: 230,
  },
  headerRightButton: {
    fontSize: 14,
    marginLeft: 2,
    color: '#fff',
  },
  linearGradient: {
    width: '100%',
    height: IMG_MAX_HEIGHT,
    position: 'absolute',
    zIndex: 2,
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
    height: IMG_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    position: 'absolute',
    paddingHorizontal: 15,
    bottom: 30,
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  source: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  sectionWrapper: {
    marginHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailImg: {
    height: 50,
    width: 50,
  },
  thumbnailName: {
    flex: 1,
    marginLeft: 10,
  },
  iconRightArrow: {
    right: 10,
    position: 'absolute',
  },
});

export default Details;
