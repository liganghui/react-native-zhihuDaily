import { action, observable } from "mobx";
class TextStore {
  @observable name ;
  constructor() {
    this.name = "李狗蛋";
  }
  @action
  setName(name) {
    this.name = name;
  }
}

const test = new TextStore() 
export { test };
