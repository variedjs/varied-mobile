<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-empty :description="t('description')" />
    </demo-block>

    <demo-block :title="t('imageType')">
      <vm-tabs v-model="active">
        <vm-tab name="error" :title="t('error')">
          <vm-empty image="error" :description="t('description')" />
        </vm-tab>
        <vm-tab name="network" :title="t('network')">
          <vm-empty image="network" :description="t('description')" />
        </vm-tab>
        <vm-tab name="search" :title="t('search')">
          <vm-empty image="search" :description="t('description')" />
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('customImage')">
      <vm-empty
        class="custom-image"
        image="https://wuner.gitee.io/static-resources/varied-mobile/static/custom-empty-image.png"
        :description="t('description')"
      />
    </demo-block>

    <demo-block :title="t('bottomContent')">
      <vm-empty :description="t('description')">
        <vm-button round class="bg-red bottom-button">
          {{ t("button") }}
        </vm-button>
      </vm-empty>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        button: "按钮",
        error: "通用错误",
        search: "搜索提示",
        network: "网络错误",
        imageType: "图片类型",
        description: "描述文字",
        customImage: "自定义图片",
        bottomContent: "底部内容"
      },
      active: "error"
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

.demo-empty {
  background: @white;

  .custom-image {
    .vm-empty-image {
      width: 90px;
      height: 90px;
    }
  }

  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>
