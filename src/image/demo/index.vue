<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-row>
        <vm-image width="100" height="100" :src="image" />
      </vm-row>
    </demo-block>

    <demo-block :title="t('fitMode')">
      <vm-row gutter="20">
        <vm-col v-for="fit in fits" span="8" :key="fit">
          <vm-image :fit="fit" width="100%" height="27vw" :src="image" />
          <div class="text">{{ fit }}</div>
        </vm-col>
      </vm-row>
    </demo-block>

    <demo-block :title="t('round')">
      <vm-row gutter="20">
        <vm-col v-for="fit in fits" span="8" :key="fit">
          <vm-image round :fit="fit" width="100%" height="27vw" :src="image" />
          <div class="text">{{ fit }}</div>
        </vm-col>
      </vm-row>
    </demo-block>

    <demo-block :title="t('lazyLoad')">
      <vm-row>
        <vm-image width="100" height="100" lazy-load :src="image" />
      </vm-row>
    </demo-block>

    <demo-block :title="t('loading')">
      <vm-row gutter="20">
        <vm-col span="8">
          <vm-image width="100%" height="27vw" />
          <div class="text">{{ t("defaultTip") }}</div>
        </vm-col>

        <vm-col span="8">
          <vm-image width="100%" height="27vw">
            <template #loading>
              <vm-loading type="spinner" size="20" />
            </template>
          </vm-image>
          <div class="text">{{ t("customTip") }}</div>
        </vm-col>
      </vm-row>
    </demo-block>

    <demo-block :title="t('error')">
      <vm-row gutter="20">
        <vm-col span="8">
          <vm-image width="100%" height="27vw" src="x" />
          <div class="text">{{ t("defaultTip") }}</div>
        </vm-col>

        <vm-col span="8">
          <vm-image width="100%" height="27vw" src="x">
            <template #error>{{ t("loadFail") }}</template>
          </vm-image>
          <div class="text">{{ t("customTip") }}</div>
        </vm-col>
      </vm-row>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        fitMode: "填充模式",
        round: "圆形图片",
        lazyLoad: "懒加载",
        loading: "加载中提示",
        error: "加载失败提示",
        defaultTip: "默认提示",
        customTip: "自定义提示",
        loadFail: "加载失败"
      },
      image:
        "https://wuner.gitee.io/static-resources/varied-mobile/static/landscape-3.jpg",
      fits: ["contain", "cover", "fill", "none", "scale-down"]
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

.demo-image {
  overflow-x: hidden;
  background-color: @white;

  .vm-row {
    padding: 0 @padding-md;
  }

  .vm-col {
    margin-bottom: 20px;
  }

  .text {
    margin-top: 5px;
    color: @gray-7;
    font-size: 14px;
    text-align: center;
  }
}
</style>
