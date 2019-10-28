import {action, observable} from 'mobx';
import DefaultTheme from '../theme/defaultTheme';
import BlackTheme from '../theme/blackTheme';
class ThemeStore {
  constructor() {
    this.colors = DefaultTheme;
  }
  @observable colors;
  @action
  switchTheme(type) {
    if (this.colors.themeType === 'default') {
      this.colors = BlackTheme;
    } else if (this.colors.themeType === 'black') {
      this.colors = DefaultTheme;
    }
  }
}
const theme = new ThemeStore();
export {theme};
