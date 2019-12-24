<template>
  <div>
    <sp-nav-bar
      v-if="title"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />
    <keep-alive>
      <router-view :weapp="weapp" />
    </keep-alive>
  </div>
</template>

<script>
function getQueryString(name) {
  const arr = location.search.substr(1).split('&');
  for (let i = 0, l = arr.length; i < l; i++) {
    const item = arr[i].split('=');
    if (item.shift() === name) {
      return decodeURIComponent(item.join('='));
    }
  }
  return '';
}

export default {
  computed: {
    title() {
      return this.$route.meta.title || '';
    },

    showNav() {
      return getQueryString('hide_nav') !== '1';
    },

    weapp() {
      return getQueryString('weapp') === '1';
    }
  },

  beforeCreate() {
    this.tips = 'Tips: 当前预览的是 Vue 版 Vant 的示例，少部分功能可能与小程序版有出入，请以文档描述和实际效果为准。';
  },

  methods: {
    onBack() {
      history.back();
    }
  }
};
</script>

<style lang="less">
@import '../../../src/style/var';

body {
  min-width: 100vw;
  color: @text-color;
  font-family: 'PingFang SC', Helvetica, 'STHeiti STXihei', 'Microsoft YaHei', Tohoma, Arial, sans-serif;
  line-height: 1;
  background-color: #f7f8fa;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.van-doc-nav-bar {
  height: 56px;
  line-height: 56px;

  .van-nav-bar__title {
    font-size: 17px;
    text-transform: capitalize;
  }

  .van-icon {
    color: @gray-6;
    font-size: 24px;
    cursor: pointer;
  }
}

.van-doc-demo-section {
  margin-top: -56px;
  padding-top: 56px;
}
</style>
