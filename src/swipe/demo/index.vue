<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-swipe :autoplay="3000" indicator-color="white">
        <vm-swipe-item>1</vm-swipe-item>
        <vm-swipe-item>2</vm-swipe-item>
        <vm-swipe-item>3</vm-swipe-item>
        <vm-swipe-item>4</vm-swipe-item>
      </vm-swipe>
    </demo-block>

    <demo-block :title="t('title2')">
      <vm-swipe :autoplay="3000">
        <vm-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </vm-swipe-item>
      </vm-swipe>
    </demo-block>

    <demo-block :title="t('title3')">
      <vm-swipe indicator-color="white" @change="onChange1">
        <vm-swipe-item>1</vm-swipe-item>
        <vm-swipe-item>2</vm-swipe-item>
        <vm-swipe-item>3</vm-swipe-item>
        <vm-swipe-item>4</vm-swipe-item>
      </vm-swipe>
    </demo-block>

    <demo-block :title="t('title4')">
      <vm-swipe
        vertical
        :autoplay="3000"
        indicator-color="white"
        style="height: 200px;"
        class="demo-swipe--vertical"
      >
        <vm-swipe-item>1</vm-swipe-item>
        <vm-swipe-item>2</vm-swipe-item>
        <vm-swipe-item>3</vm-swipe-item>
        <vm-swipe-item>4</vm-swipe-item>
      </vm-swipe>
    </demo-block>

    <demo-block :title="t('title5')">
      <vm-swipe :width="300" :loop="false" indicator-color="white">
        <vm-swipe-item>1</vm-swipe-item>
        <vm-swipe-item>2</vm-swipe-item>
        <vm-swipe-item>3</vm-swipe-item>
        <vm-swipe-item>4</vm-swipe-item>
      </vm-swipe>
    </demo-block>

    <demo-block :title="t('title6')">
      <vm-swipe @change="onChange2">
        <vm-swipe-item>1</vm-swipe-item>
        <vm-swipe-item>2</vm-swipe-item>
        <vm-swipe-item>3</vm-swipe-item>
        <vm-swipe-item>4</vm-swipe-item>

        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/4</div>
        </template>
      </vm-swipe>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        title2: "图片懒加载",
        title3: "监听 change 事件",
        title4: "纵向滚动",
        title5: "自定义滑块大小",
        title6: "自定义指示器",
        message: "当前 Swipe 索引："
      },
      current: 0,
      images: [
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe.jpg",
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-1.jpg",
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-2.jpg",
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-3.jpg"
      ]
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    onChange1(index) {
      this.$toast(this.t("message") + index);
    },

    onChange2(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-swipe {
  padding-bottom: 30px;

  .vm-swipe {
    &-item {
      color: @white;
      font-size: 20px;
      line-height: 150px;
      text-align: center;

      &:nth-child(even) {
        background-color: #39a9ed;
      }

      &:nth-child(odd) {
        background-color: #66c6f2;
      }
    }

    img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 240px;
      padding: 30px 60px;
      background-color: @white;
      pointer-events: none;
    }
  }

  &--vertical {
    .vm-swipe-item {
      line-height: 200px;
    }
  }

  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    color: @white;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
