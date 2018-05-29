import Vue from 'vue';
import ShortKey from 'vue-shortkey';
import VueClipboard from 'vue-clipboard2';
import App from './App';

import './assets/app.less';

Vue.use(ShortKey);
Vue.use(VueClipboard);

const startApp = () => {
  // eslint-disable-next-line
  new Vue({
    el: '#app',
    render: h => h(App),
  });
};

startApp();
