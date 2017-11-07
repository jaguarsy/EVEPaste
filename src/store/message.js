const message = {
  content: null,
  type: null,

  alert(content) {
    message.type = null;
    message.content = content;

    setTimeout(() => {
      message.content = null;
      message.type = null;
    }, 3000);
  },
  info(content) {
    message.content = content;
    message.type = 'info';

    setTimeout(() => {
      message.content = null;
      message.type = null;
    }, 3000);
  },
  warning(content) {
    message.content = content;
    message.type = 'warning';

    setTimeout(() => {
      message.content = null;
      message.type = null;
    }, 3000);
  },
  danger(content) {
    message.content = content;
    message.type = 'danger';

    setTimeout(() => {
      message.content = null;
      message.type = null;
    }, 3000);
  },
};

export default message;
