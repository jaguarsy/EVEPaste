import Vue from 'vue';
import ShortKey from 'vue-shortkey';
import App from './App';

import './assets/app.less';

Vue.use(ShortKey);

const startApp = () => {
  // eslint-disable-nextline
  new Vue({
    el: '#app',
    render: h => h(App),
  });
};

startApp();
