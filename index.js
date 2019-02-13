import {AppRegistry} from 'react-native';
import Root from './app/root.js';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => Root);
