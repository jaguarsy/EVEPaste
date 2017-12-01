<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="container" v-if="data">
    <button type="button"
            class="btn pull-right"
            v-clipboard:copy="appraisalUrl"
            v-clipboard:success="onClipboardCopy"
            v-clipboard:error="onClipboardError">Copy to share
    </button>

    <p>
      <span>{{format(data.totals.sell)}}</span>
      <small>&nbsp;estimated sell value</small>
    </p>
    <p>
      <span>{{format(data.totals.buy)}}</span>
      <small>&nbsp;estimated buy value</small>
    </p>
    <p>
      <span>{{numberFormat(data.totals.volume)}}</span>
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
      <tr v-for="item in data.items">
        <td>{{item.quantity}}</td>
        <td>{{item.name}}</td>
        <td>{{item.typeVolume}}</td>
        <td>{{numberFormat(item.prices.sell.min)}}<br>{{numberFormat(item.prices.buy.max)}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/babel">
  import moneyFormat from '../utils/moneyFormat';
  import numberFormat from '../utils/numberFormat';
  import msgStore from '../store/message';

  export default {
    name: 'appraisal',
    props: {
      data: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {};
    },
    computed: {
      appraisalUrl() {
        if (!this.data) {
          return '';
        }

        return `https://evepraisal.com/a/${this.data.id}`;
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
