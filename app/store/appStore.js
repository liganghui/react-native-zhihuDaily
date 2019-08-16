import {observable } from "mobx";
class AppStore {
  constructor() {
    this.isDrawerOpen = false; 
  }
  @observable isDrawerOpen;
}
const app = new AppStore() 
export { app };
