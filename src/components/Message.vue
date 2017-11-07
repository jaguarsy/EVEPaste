<template>
  <transition name="fade">
    <div class="message" :class="typeDic[type]" v-if="content">
      {{content}}
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: 'message',
    props: {
      type: {
        type: String,
        default: null,
      },
      content: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        typeDic: {
          info: 'message-info',
          warning: 'message-warning',
          danger: 'message-danger',
        },
      };
    },
  };
</script>

<style>
  .message {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #fff;
    background: #626262;
    padding: 4px 8px;
  }

  .message.message-info {
    background: #4690b2;
  }

  .message.message-warning {
    background: #bf8242;
  }

  .message.message-danger {
    background: #bf5055;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
