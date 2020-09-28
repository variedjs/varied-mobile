<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-switch v-model="checked" />
    </demo-block>

    <demo-block :title="t('disabled')">
      <vm-switch v-model="checked" disabled />
    </demo-block>

    <demo-block :title="t('loadingStatus')">
      <vm-switch v-model="checked" loading />
    </demo-block>

    <demo-block :title="t('customSize')">
      <vm-switch v-model="checked2" size="24px" />
    </demo-block>

    <demo-block :title="t('customColor')">
      <vm-switch
        v-model="checked3"
        active-color="#07c160"
        inactive-color="#ee0a24"
      />
    </demo-block>

    <demo-block :title="t('asyncControl')">
      <vm-switch :value="checked4" @input="onInput" />
    </demo-block>

    <demo-block :title="t('withCell')">
      <vm-cell center :title="t('title')">
        <template #right-icon>
          <vm-switch v-model="checked5" size="24" />
        </template>
      </vm-cell>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        title: "标题",
        confirm: "提醒",
        message: "是否切换开关？",
        basicUsage: "基础用法",
        disabled: "禁用状态",
        loadingStatus: "加载状态",
        withCell: "搭配单元格使用",
        customSize: "自定义大小",
        customColor: "自定义颜色",
        asyncControl: "异步控制"
      },
      checked: true,
      checked2: true,
      checked3: true,
      checked4: true,
      checked5: true,
      checked6: false
    };
  },

  methods: {
    onInput(checked) {
      this.$dialog
        .confirm({
          title: this.t("title"),
          message: this.t("message")
        })
        .then(() => {
          this.checked4 = checked;
        });
    },
    t(name) {
      return this.info[name];
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-switch {
  .vm-switch {
    margin-left: @padding-md;
  }
}
</style>
