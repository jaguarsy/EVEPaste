<template>
  <div style="height: 100vh;-webkit-app-region: drag;">
    <div class="loading-container" v-if="isLoading">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </div>

    <div :class="{'is-blur': isLoading}">
      <div class="search-bar">
        <form @submit.prevent="search()">
          <input type="text"
                 class="form-control"
                 tabindex="-1"
                 v-model="searchWord"
                 placeholder="Input anything here and press Enter.">
        </form>
      </div>

      <appraisal :data="appraisal"></appraisal>
      <kill-stats :data="killStats"></kill-stats>
    </div>

    <message :type="msgStore.type" :content="msgStore.content"></message>
  </div>
</template>

<script type="text/babel">
  import clipWatcher from './utils/clipWatcher';
  import praisalApi from './services/eve-praisal';
  import kbApi from './services/eve-kb';
  import Message from './components/Message';
  import Appraisal from './components/Appraisal';
  import KillStats from './components/KillStats';
  import msgStore from './store/message';

  export default {
    name: 'app',
    components: {
      Message,
      Appraisal,
      KillStats,
    },
    data() {
      return {
        appraisal: null,
        killStats: null,
        isLoading: false,
        searchWord: null,
        msgStore,
      };
    },
    mounted() {
      clipWatcher({
        onTextChange: (text) => {
          this.search(text);
        },
      });
    },
    methods: {
      search(text) {
        this.isLoading = true;
        const keyword = text || this.searchWord;

        praisalApi(keyword)
          .then((result) => {
            this.appraisal = result.appraisal;
            this.isLoading = false;
            msgStore.info('价格获取成功');
          })
          .catch((err) => {
            this.appraisal = null;
            console.warn(err);

            return kbApi(keyword);
          })
          .then((result) => {
            this.killStats = result;
            msgStore.info('KB数据获取成功');

            this.isLoading = false;
          })
          .catch((err) => {
            console.warn(err);

            this.isLoading = false;
          });
      },
    },
  };
</script>
