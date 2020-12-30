<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <vm-cell is-link :title="t('basicUsage')" @click="show.basic = true" />
      <vm-cell is-link :title="t('showCancel')" @click="show.cancel = true" />
      <vm-cell
        is-link
        :title="t('showDescription')"
        @click="show.description = true"
      />
    </demo-block>

    <demo-block card :title="t('optionStatus')">
      <vm-cell is-link :title="t('optionStatus')" @click="show.status = true" />
    </demo-block>

    <demo-block card :title="t('customPanel')">
      <vm-cell is-link :title="t('customPanel')" @click="show.title = true" />
    </demo-block>

    <vm-action-sheet
      v-model="show.basic"
      :actions="simpleActions"
      @select="onSelect"
    />

    <vm-action-sheet
      v-model="show.cancel"
      :actions="simpleActions"
      close-on-click-action
      :cancel-text="t('cancel')"
      @cancel="onCancel"
    />

    <vm-action-sheet
      v-model="show.description"
      :actions="actionsWithDescription"
      close-on-click-action
      :cancel-text="t('cancel')"
      :description="t('description')"
    />

    <vm-action-sheet
      v-model="show.status"
      close-on-click-action
      :actions="statusActions"
      :cancel-text="t('cancel')"
    />

    <vm-action-sheet v-model="show.title" :title="t('title')">
      <div class="demo-action-sheet-content">{{ t("content") }}</div>
    </vm-action-sheet>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        option1: "选项一",
        option2: "选项二",
        option3: "选项三",
        subname: "描述信息",
        showCancel: "展示取消按钮",
        buttonText: "弹出菜单",
        cancel: "取消",
        title: "标题",
        content: "内容",
        customPanel: "自定义面板",
        description: "这是一段描述信息",
        optionStatus: "选项状态",
        coloredOption: "着色选项",
        disabledOption: "禁用选项",
        showDescription: "展示描述信息"
      },
      show: {
        basic: false,
        cancel: false,
        title: false,
        status: false,
        description: false
      }
    };
  },

  computed: {
    simpleActions() {
      return [
        { name: this.t("option1") },
        { name: this.t("option2") },
        { name: this.t("option3") }
      ];
    },

    actionsWithDescription() {
      return [
        { name: this.t("option1") },
        { name: this.t("option2") },
        { name: this.t("option3"), subname: this.t("subname") }
      ];
    },

    statusActions() {
      return [
        { name: this.t("coloredOption"), color: "#ee0a24" },
        { name: this.t("disabledOption"), disabled: true },
        { loading: true }
      ];
    }
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    onSelect(item) {
      this.show.basic = false;
      this.$toast(item.name);
    },

    onCancel() {
      this.$toast(this.t("cancel"));
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-action-sheet {
  &-content {
    padding: @padding-md @padding-md @padding-md * 10;
  }
}
</style>
