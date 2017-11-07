<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
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
        <input type="text"
               class="form-control"
               tabindex="-1"
               placeholder="Input anything here and press Enter.">
      </div>

      <div class="container" v-if="appraisal">
        <button type="button"
                class="btn pull-right"
                v-clipboard:copy="appraisalUrl"
                v-clipboard:success="onClipboardCopy"
                v-clipboard:error="onClipboardError">Copy to share
        </button>

        <p>
          <span>{{format(appraisal.totals.sell)}}</span>
          <small>&nbsp;estimated sell value</small>
        </p>
        <p>
          <span>{{format(appraisal.totals.buy)}}</span>
          <small>&nbsp;estimated buy value</small>
        </p>
        <p>
          <span>{{numberFormat(appraisal.totals.volume)}}</span>
          <small>&nbsp;total volume</small>
        </p>

        <table class="table">
          <thead>
          <tr>
            <th>Qty</th>
            <th>Item</th>
            <th>Volume</th>
            <th>sell/buy</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in appraisal.items">
            <td>{{item.quantity}}</td>
            <td>{{item.name}}</td>
            <td>{{item.typeVolume}}</td>
            <td>{{numberFormat(item.prices.sell.min)}}<br>{{numberFormat(item.prices.buy.max)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <message :type="msgStore.type" :content="msgStore.content"></message>
  </div>
</template>

<script type="text/babel">
  import clipWatcher from './utils/clipWatcher';
  import moneyFormat from './utils/moneyFormat';
  import numberFormat from './utils/numberFormat';
  import praisalApi from './services/eve-praisal';
  import Message from './components/Message';
  import msgStore from './store/message';

  export default {
    name: 'app',
    components: {
      Message,
    },
    data() {
      return {
        appraisal: null,
        isLoading: false,
        msgStore,
      };
    },
    mounted() {
      clipWatcher({
        onTextChange: (text) => {
          this.isLoading = true;

          praisalApi(text)
            .then((result) => {
              this.appraisal = result.appraisal;
              this.isLoading = false;
            })
            .catch((err) => {
              this.appraisal = null;
              this.isLoading = false;
              console.warn(err);
              msgStore.danger('价格获取失败，请重试');
            });
        },
      });
    },
    computed: {
      appraisalUrl() {
        if (!this.appraisal) {
          return '';
        }

        return `https://evepraisal.com/a/${this.appraisal.id}`;
      },
    },
    methods: {
      format(val) {
        return moneyFormat(val);
      },
      numberFormat(val) {
        return numberFormat(val);
      },
      onClipboardCopy() {
        msgStore.info('复制成功');
      },
      onClipboardError() {
        msgStore.warning('复制失败，请重试');
      },
    },
  };
</script>
