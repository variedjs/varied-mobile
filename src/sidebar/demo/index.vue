<template>
  <demo-section>
    <vm-grid :column-num="2" :border="false">
      <vm-grid-item>
        <h3 class="demo-sidebar-title">{{ t("basicUsage") }}</h3>
        <vm-sidebar v-model="activeKey1">
          <vm-sidebar-item :title="t('title')" />
          <vm-sidebar-item :title="t('title')" />
          <vm-sidebar-item :title="t('title')" />
        </vm-sidebar>
      </vm-grid-item>

      <vm-grid-item>
        <h3 class="demo-sidebar-title">{{ t("showBadge") }}</h3>
        <vm-sidebar v-model="activeKey2">
          <vm-sidebar-item :title="t('title')" dot />
          <vm-sidebar-item :title="t('title')" badge="5" />
          <vm-sidebar-item :title="t('title')" badge="99+" />
        </vm-sidebar>
      </vm-grid-item>

      <vm-grid-item>
        <h3 class="demo-sidebar-title">{{ t("disabled") }}</h3>
        <vm-sidebar v-model="activeKey3">
          <vm-sidebar-item :title="t('title')" />
          <vm-sidebar-item :title="t('title')" disabled />
          <vm-sidebar-item :title="t('title')" />
        </vm-sidebar>
      </vm-grid-item>

      <vm-grid-item>
        <h3 class="demo-sidebar-title">{{ t("changeEvent") }}</h3>
        <vm-sidebar v-model="activeKey4" @change="onChange">
          <vm-sidebar-item :title="t('title') + 1" />
          <vm-sidebar-item :title="t('title') + 2" />
          <vm-sidebar-item :title="t('title') + 3" />
        </vm-sidebar>
      </vm-grid-item>
    </vm-grid>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        title: "标签名",
        showBadge: "徽标提示",
        disabled: "禁用选项",
        changeEvent: "监听切换事件",
        selectTip: "你切换到了"
      },
      activeKey1: 0,
      activeKey2: 0,
      activeKey3: 0,
      activeKey4: 0
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    onChange(index) {
      this.$notify({
        type: "primary",
        message: `${this.t("selectTip")} ${this.t("title")}${index + 1}`
      });
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-sidebar {
  background-color: @white;

  .vm-sidebar {
    margin-left: @padding-md;
  }

  &-title {
    margin-bottom: 16px;
    color: @gray-6;
    font-weight: normal;
    font-size: 14px;
  }
}
</style>
