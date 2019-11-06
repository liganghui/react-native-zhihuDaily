/**
 * Created by Rabbit on 2018/4/12.
 * https://github.com/CodeRabbitYu/ShiTu/blob/master/app/utils/System.js
 */
import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const System = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  iOS: Platform.OS === 'ios',
  Android: Platform.OS === 'android',
};
export {System};
