<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <vm-cell is-link :title="t('alert1')" @click="onClickAlert" />
      <vm-cell is-link :title="t('alert2')" @click="onClickAlert2" />
      <vm-cell is-link :title="t('confirm')" @click="onClickConfirm" />
    </demo-block>

    <demo-block card :title="t('asyncClose')">
      <vm-cell is-link :title="t('asyncClose')" @click="onClickAsyncClose" />
    </demo-block>

    <demo-block card :title="t('componentCall')">
      <vm-cell is-link :title="t('componentCall')" @click="show = true" />
      <vm-dialog
        v-model="show"
        :title="t('title')"
        show-cancel-button
        :lazy-render="false"
      >
        <img :src="image" />
      </vm-dialog>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        title: "标题",
        alert1: "提示弹窗",
        alert2: "提示弹窗（无标题）",
        confirm: "确认弹窗",
        asyncClose: "异步关闭",
        componentCall: "组件调用",
        content: "代码是写出来给人看的，附带能在机器上运行"
      },
      show: false,
      currentRate: 0,
      image:
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe.jpg"
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    onClickAlert() {
      this.$dialog.alert({
        title: this.t("title"),
        message: this.t("content")
      });
    },

    onClickAlert2() {
      this.$dialog.alert({
        message: this.t("content")
      });
    },

    onClickConfirm() {
      this.$dialog.confirm({
        title: this.t("title"),
        message: this.t("content")
      });
    },

    onClickAsyncClose() {
      function beforeClose(action, done) {
        if (action === "confirm") {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }

      this.$dialog.confirm({
        title: this.t("title"),
        message: this.t("content"),
        beforeClose
      });
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-dialog {
  img {
    box-sizing: border-box;
    width: 100%;
    padding: 25px 20px 0;
  }
}
</style>
