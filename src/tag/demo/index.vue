<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <vm-cell :title="`primary ${t('type')}`">
        <vm-tag type="primary">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="`success ${t('type')}`">
        <vm-tag type="success">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="`danger ${t('type')}`">
        <vm-tag type="danger">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="`warning ${t('type')}`">
        <vm-tag type="warning">{{ t("tag") }}</vm-tag>
      </vm-cell>
    </demo-block>

    <demo-block card :title="t('tagStyle')">
      <vm-cell :title="t('plain')">
        <vm-tag plain type="primary">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="t('round')">
        <vm-tag round type="primary">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="t('mark')">
        <vm-tag mark type="primary">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="t('closeable')">
        <vm-tag
          v-if="show"
          size="medium"
          closeable
          type="primary"
          @close="close"
        >
          {{ t("tag") }}
        </vm-tag>
      </vm-cell>
    </demo-block>

    <demo-block card :title="t('customSize')">
      <vm-cell :title="t('smallSize')">
        <vm-tag type="primary">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="t('mediumSize')">
        <vm-tag type="primary" size="medium">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="t('largeSize')">
        <vm-tag type="primary" size="large">{{ t("tag") }}</vm-tag>
      </vm-cell>
    </demo-block>

    <demo-block card :title="t('customColor')">
      <vm-cell :title="t('customBgColor')">
        <vm-tag color="#7232dd">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="t('customTextColor')">
        <vm-tag color="#ffe1e1" text-color="#ad0000">{{ t("tag") }}</vm-tag>
      </vm-cell>
      <vm-cell :title="t('customPlainColor')">
        <vm-tag color="#7232dd" plain>{{ t("tag") }}</vm-tag>
      </vm-cell>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        tag: "标签",
        basicUsage: "基础用法",
        type: "类型",
        mark: "标记样式",
        plain: "空心样式",
        round: "圆角样式",
        tagStyle: "样式风格",
        closeable: "可关闭标签",
        smallSize: "小号标签",
        largeSize: "大号标签",
        mediumSize: "中号标签",
        customSize: "标签大小",
        customColor: "自定义颜色",
        customBgColor: "背景颜色",
        customTextColor: "文字颜色",
        customPlainColor: "空心颜色"
      },
      show: true
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    close() {
      this.show = false;
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-tag {
  .vm-tag + .vm-tag {
    margin-left: @padding-xs;
  }
}
</style>
