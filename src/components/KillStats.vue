<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="container" v-if="data && data.id">
    <button type="button"
            class="btn pull-right"
            v-clipboard:copy="url"
            v-clipboard:success="onClipboardCopy"
            v-clipboard:error="onClipboardError">Copy to share
    </button>

    <button type="button"
            class="btn pull-right"
            @click="openInBrowser">Open In Browser
    </button>

    <h3>{{data.info.name}}</h3>
    <br>

    <p>
      <span>{{data.soloKills || 0}}</span>
      <small>SOLO KILLS</small>
    </p>

    <p>
      <span>{{data.soloLosses || 0}}</span>
      <small>SOLO LOSSES</small>
    </p>

    <p>
      <span>{{data.dangerRatio || 0}}</span>
      <small>DANGER RATIO</small>
    </p>

    <p>
      <span>{{(data.info.secStatus || 0).toFixed(2)}}</span>
      <small>SEC STATUS</small>
    </p>
  </div>
</template>

<script type="text/babel">
  import moneyFormat from '../utils/moneyFormat';
  import numberFormat from '../utils/numberFormat';
  import msgStore from '../store/message';

  const shell = require('electron').shell;

  export default {
    name: 'killStats',
    props: {
      data: {
        type: Object,
        default: () => ({
          info: {},
        }),
      },
    },
    data() {
      return {};
    },
    computed: {
      url() {
        if (!this.data) {
          return '';
        }

        return `https://zkillboard.com/character/${this.data.id}/`;
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
      openInBrowser() {
        shell.openExternal(this.url);
      },
    },
  };
</script>
