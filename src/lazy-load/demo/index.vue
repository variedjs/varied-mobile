<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <img v-for="img in imageList" :key="img" v-lazy="img" />
    </demo-block>

    <demo-block :title="t('title2')">
      <div
        v-for="img in backgroundImageList"
        :key="img"
        v-lazy:background-image="img"
      />
    </demo-block>

    <demo-block :title="t('title3')">
      <lazy-component>
        <img v-for="img in componentImageList" :key="img" v-lazy="img" />
      </lazy-component>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        title2: "背景图懒加载",
        title3: "懒加载模块"
      },
      imageList: [
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe.jpg",
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-1.jpg",
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-2.jpg",
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-3.jpg"
      ],
      backgroundImageList: [
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-4.jpg",
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-5.jpg"
      ],
      componentImageList: [
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-6.jpg",
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-7.jpg"
      ]
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

.demo-lazy-load {
  padding-right: @padding-md;
  padding-left: @padding-md;

  img,
  div[lazy] {
    box-sizing: border-box;
    width: 100%;
    height: 250px;
    margin-bottom: @padding-md;
    padding: @padding-md;
    background-color: white;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 12px;
  }

  .van-doc-demo-block__title,
  .van-doc-demo-section__title {
    padding-left: 0;
  }
}
</style>
