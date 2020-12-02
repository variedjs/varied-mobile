<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <vm-cell is-link @click="showImagePreview">
        {{ t("showImages") }}
      </vm-cell>
    </demo-block>

    <demo-block card :title="t('customConfig')">
      <vm-cell is-link @click="showImagePreview({ startPosition: 1 })">
        {{ t("startPosition") }}
      </vm-cell>
      <vm-cell is-link @click="showImagePreview({ closeable: true })">
        {{ t("showClose") }}
      </vm-cell>
      <vm-cell is-link @click="showImagePreview({ onClose })">
        {{ t("closeEvent") }}
      </vm-cell>
    </demo-block>

    <demo-block card :title="t('asyncClose')">
      <vm-cell is-link @click="showImagePreview({ asyncClose: true })">
        {{ t("asyncClose") }}
      </vm-cell>
    </demo-block>

    <demo-block card :title="t('componentCall')">
      <vm-cell is-link @click="componentCall">
        {{ t("componentCall") }}
      </vm-cell>
      <vm-image-preview v-model="show" :images="images" @change="onChange">
        <template #index>{{ getIndexText(index) }}</template>
      </vm-image-preview>
    </demo-block>
  </demo-section>
</template>

<script>
import ImagePreview from "..";

const images = [
  "https://wuner.gitee.io/static-resources/varied-mobile/static/universe.jpg",
  "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-1.jpg",
  "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-2.jpg",
  "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-3.jpg"
];

export default {
  data() {
    return {
      info: {
        closed: "关闭",
        showClose: "展示关闭按钮",
        showImages: "预览图片",
        asyncClose: "异步关闭",
        closeEvent: "监听关闭事件",
        customConfig: "传入配置项",
        startPosition: "指定初始位置",
        componentCall: "组件调用"
      },
      show: false,
      images,
      index: 0
    };
  },
  methods: {
    getIndexText(index) {
      return `第${index + 1}页`;
    },
    t(name) {
      return this.info[name];
    },
    onClose() {
      this.$toast(this.t("closed"));
    },
    componentCall() {
      this.show = true;
    },
    onChange(index) {
      this.index = index;
    },
    showImagePreview(options = {}) {
      const instance = ImagePreview({
        images,
        ...options
      });

      if (options.asyncClose) {
        setTimeout(() => {
          instance.close();
        }, 2000);
      }
    }
  }
};
</script>
