<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-notice-bar :text="t('text')" scrollable left-icon="volume-up" />
    </demo-block>

    <demo-block :title="t('scrollable')">
      <vm-notice-bar scrollable :text="t('shortText')" />
      <vm-notice-bar :scrollable="false" :text="t('text')" />
    </demo-block>

    <demo-block :title="t('wrapable')">
      <vm-notice-bar wrapable :scrollable="false" :text="t('text')" />
    </demo-block>

    <demo-block :title="t('mode')">
      <vm-notice-bar mode="closeable" :text="t('shortText')" />
      <vm-notice-bar mode="link" :text="t('shortText')" />
    </demo-block>

    <demo-block :title="t('customStyle')">
      <vm-notice-bar
        :text="t('shortText')"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info"
      />
    </demo-block>

    <demo-block :title="t('verticalScroll')">
      <vm-notice-bar left-icon="volume-up" :scrollable="false">
        <vm-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <vm-swipe-item>{{ t("content") }} 1</vm-swipe-item>
          <vm-swipe-item>{{ t("content") }} 2</vm-swipe-item>
          <vm-swipe-item>{{ t("content") }} 3</vm-swipe-item>
        </vm-swipe>
      </vm-notice-bar>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        text: "在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。",
        mode: "通知栏模式",
        content: "内容",
        wrapable: "多行展示",
        shortText: "技术是开发它的人的共同灵魂。",
        scrollable: "滚动播放",
        customStyle: "自定义样式",
        verticalScroll: "垂直滚动"
      }
    };
  },
  methods: {
    t(name) {
      return this.info[name];
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-notice-bar {
  background: @white;

  .vm-notice-bar:not(:first-of-type) {
    margin-top: 4px;
  }

  .vm-doc-demo-block-title {
    padding-top: 24px;
  }

  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
}
</style>
