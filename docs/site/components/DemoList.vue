<template>
  <div class="side-nav">
    <h1 class="vant-title">
      <img src="http://huangwanneng.cn/static/favicon.png">
      <span>Varied</span>
    </h1>
    <h2 class="vant-desc">轻量、可靠的移动端Vue组件库</h2>
    <template v-for="item in navList">
      <mobile-nav
        v-for="(group, index) in item.groups"
        :group="group"
        base=""
        :key="index"
      />
    </template>
  </div>
</template>

<script>
import docConfig from '../doc.config';
import MobileNav from './MobileNav';

export default {
  components: {
    MobileNav
  },

  data() {
    return {
      docConfig
    };
  },

  computed: {
    navList() {
      return (this.docConfig.nav || []).filter(item => item.showInMobile);
    },
  },

  methods: {
  }
};
</script>

<style lang="less">
@import '../../../src/style/theme';

.side-nav {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 46px 20px 20px;
  background: @white;

  .vant-title,
  .vant-desc {
    padding-left: @padding-md;
    font-weight: normal;
    user-select: none;
  }

  .vant-title {
    margin: 0 0 @padding-md;

    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    img {
      width: 36px;
    }

    span {
      margin-left: @padding-md;
      font-weight: 500;
      font-size: 36px;
    }
  }

  .vant-desc {
    margin: 0 0 40px;
    color: #7d7e80;
    font-size: 14px;
  }
}

.mobile-switch-lang {
  position: absolute;
  top: 20px;
  right: 20px;
  overflow: hidden;
  color: @blue;
  font-size: 12px;
  cursor: pointer;

  span {
    display: inline-block;
    width: 48px;
    color: @text-color;
    line-height: 22px;
    text-align: center;
    background-color: #fff;
    border: 1px solid @border-color;

    &:first-child {
      border-right: none;
      border-radius: 3px 0 0 3px;
    }

    &:last-child {
      border-left: none;
      border-radius: 0 3px 3px 0;
    }

    &.active {
      color: @white;
      background-color: @blue;
      border-color: @blue;
    }
  }
}
</style>
