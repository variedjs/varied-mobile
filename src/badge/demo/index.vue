<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-badge content="5">
        <div class="child" />
      </vm-badge>
      <vm-badge content="10">
        <div class="child" />
      </vm-badge>
      <vm-badge content="Hot">
        <div class="child" />
      </vm-badge>
      <vm-badge dot>
        <div class="child" />
      </vm-badge>
    </demo-block>

    <demo-block :title="t('max')">
      <vm-badge content="20" max="9">
        <div class="child" />
      </vm-badge>
      <vm-badge content="50" max="20">
        <div class="child" />
      </vm-badge>
      <vm-badge content="200" max="99">
        <div class="child" />
      </vm-badge>
    </demo-block>

    <demo-block :title="t('customColor')">
      <vm-badge content="5" color="#1989fa">
        <div class="child" />
      </vm-badge>
      <vm-badge content="10" color="#1989fa">
        <div class="child" />
      </vm-badge>
      <vm-badge dot color="#1989fa">
        <div class="child" />
      </vm-badge>
    </demo-block>

    <demo-block :title="t('customContent')">
      <vm-badge>
        <div class="child" />
        <template #content>
          <vm-icon name="check" class="badge-icon" />
        </template>
      </vm-badge>
      <vm-badge>
        <div class="child" />
        <template #content>
          <vm-icon name="close" class="badge-icon" />
        </template>
      </vm-badge>
      <vm-badge>
        <div class="child" />
        <template #content>
          <vm-icon name="arrow-down" class="badge-icon" />
        </template>
      </vm-badge>
    </demo-block>

    <demo-block :title="t('standalone')">
      <vm-badge content="20" style="margin-left: 16px;" />
      <vm-badge content="200" max="99" style="margin-left: 12px;" />
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基本使用",
        max: "最大值",
        standalone: "独立展示",
        customColor: "自定义颜色",
        customContent: "自定义徽标内容"
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

.demo-badge {
  background-color: @white;

  .vm-badge-wrapper {
    margin-left: @padding-md;
  }

  .child {
    width: 40px;
    height: 40px;
    background: @gray-2;
    border-radius: 4px;
  }

  .badge-icon {
    display: block;
    font-size: 10px;
    line-height: 16px;
  }
}
</style>
