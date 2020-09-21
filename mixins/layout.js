import {LocalStorageUtil} from '../utils/storageUtil';
import {LocalStorageKey} from "../config";
export default {
  beforeCreate() {
    // const token = LocalStorageUtil.getItem(LocalStorageUtil.token);
    // if (!token) {
    //   return;
    // }
  },
  created: function() {
    console.log('11111', );
    
    // this.$sotre.commit('setUserToken', token);
    // getUserInfo().then(({user}) => {
    //   this.setLogined(true);
    //   this.setUserInfo(user);
    // }, () => {})
    //   .finally(() => {
    //     this.showContent = true;
    //   });
  }
};