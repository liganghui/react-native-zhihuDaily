import { action, observable } from "mobx";
import DefaultTheme from "../theme/defaultTheme";
import BlackTheme from "../theme/blackTheme";
class ThemeStore {
  constructor() {
    this.colors = DefaultTheme;
  }
  @observable colors;
  @action
  setTheme(type) {
    if(type=='default'){
      this.colors = DefaultTheme;
    }else if(type=='black'){
      this.colors = BlackTheme;
    }
  }
}
const theme = new ThemeStore() 
export { theme };
