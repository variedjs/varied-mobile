<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <vm-cell is-link :title="t('basicUsage')" @click="showNotify" />
    </demo-block>

    <demo-block card :title="t('notifyType')">
      <vm-cell is-link :title="t('primary')" @click="showType('primary')" />
      <vm-cell is-link :title="t('success')" @click="showType('success')" />
      <vm-cell is-link :title="t('danger')" @click="showType('danger')" />
      <vm-cell is-link :title="t('warning')" @click="showType('warning')" />
    </demo-block>

    <demo-block card :title="t('customNotify')">
      <vm-cell is-link :title="t('customColor')" @click="showCustomColor" />
      <vm-cell
        is-link
        :title="t('customDuration')"
        @click="showCustomDuration"
      />
    </demo-block>

    <demo-block card :title="t('componentCall')">
      <vm-cell is-link :title="t('componentCall')" @click="showComponentCall" />

      <vm-notify v-model="show" type="success">
        <vm-icon name="bell" style="margin-right: 4px;" />
        <span>{{ t("content") }}</span>
      </vm-notify>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      info: {
        basicUsage: "基本使用",
        primary: "主要通知",
        success: "成功通知",
        danger: "危险通知",
        warning: "警告通知",
        content: "通知内容",
        notifyType: "通知类型",
        customColor: "自定义颜色",
        customNotify: "自定义配置",
        componentCall: "组件调用",
        customDuration: "自定义时长"
      }
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    showNotify() {
      this.$notify(this.t("content"));
    },

    showCustomColor() {
      this.$notify({
        message: this.t("customColor"),
        color: "#ad0000",
        background: "#ffe1e1",
        onClick: () => {
          console.log(1);
        },
        onClose: () => {
          console.log(2);
        }
      });
    },

    showCustomDuration() {
      this.$notify({
        message: this.t("customDuration"),
        duration: 1000
      });
    },

    showType(type) {
      this.$notify({
        message: this.t("content"),
        type
      });
    },

    showComponentCall() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 2000);
    }
  }
};
</script>
