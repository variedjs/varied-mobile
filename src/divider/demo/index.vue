<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-divider />
    </demo-block>

    <demo-block :title="t('withText')">
      <vm-divider>
        {{ t("text") }}
      </vm-divider>
    </demo-block>

    <demo-block :title="t('contentPosition')">
      <vm-divider content-position="left">
        {{ t("text") }}
      </vm-divider>

      <vm-divider content-position="right">
        {{ t("text") }}
      </vm-divider>
    </demo-block>

    <demo-block :title="t('dashed')">
      <vm-divider dashed :hairline="false">
        {{ t("text") }}
      </vm-divider>
    </demo-block>

    <demo-block :title="t('customStyle')">
      <vm-divider
        :style="{ borderColor: '#1989fa', color: '#1989fa', padding: '0 16px' }"
      >
        {{ t("text") }}
      </vm-divider>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        text: "文本",
        dashed: "虚线",
        withText: "展示文本",
        contentPosition: "内容位置",
        customStyle: "自定义样式"
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

.demo-divider {
  background-color: @white;

  .vm-doc-demo-block-title {
    padding-top: @padding-md;
  }
}
</style>
