<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-progress :percentage="50" />
    </demo-block>

    <demo-block :title="t('strokeWidth')">
      <vm-progress :percentage="50" stroke-width="8" />
    </demo-block>

    <demo-block :title="t('title2')">
      <vm-progress inactive :percentage="50" />
    </demo-block>

    <demo-block :title="t('title3')">
      <vm-progress color="#f2826a" :percentage="25" :pivot-text="t('orange')" />
      <vm-progress color="#ee0a24" :percentage="50" :pivot-text="t('red')" />
      <vm-progress
        :percentage="75"
        :pivot-text="t('purple')"
        pivot-color="#7232dd"
        color="linear-gradient(to right, #be99ff, #7232dd)"
      />
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        title2: "置灰",
        title3: "样式定制",
        strokeWidth: "线条粗细"
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

.demo-progress {
  background: @white;

  .vm-progress {
    margin: 20px;

    &:first-of-type {
      margin-top: 5px;
    }
  }
}
</style>
