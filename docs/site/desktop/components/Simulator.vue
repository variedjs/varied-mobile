<template>
  <div :class="['vm-doc-simulator', { 'vm-doc-simulator-fixed': isFixed }]">
    <iframe ref="iframe" :src="src" :style="simulatorStyle" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: "vm-doc-simulator",

  props: {
    src: String
  },

  data() {
    return {
      scrollTop: window.scrollY,
      windowHeight: window.innerHeight
    };
  },

  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollTop = window.scrollY;
    });
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
    });
  },

  computed: {
    isFixed() {
      return this.scrollTop > 60;
    },

    simulatorStyle() {
      const height = Math.min(640, this.windowHeight - 90);
      return {
        height: height + "px"
      };
    }
  }
};
</script>

<style lang="less">
@import "../style/variable";

.vm-doc-simulator {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  border-radius: 6px;
  background: #fafafa;
  box-sizing: border-box;
  right: @vm-doc-padding;
  width: @vm-doc-simulator-width;
  min-width: @vm-doc-simulator-width;
  top: calc(@vm-doc-padding + @vm-doc-header-top-height);
  box-shadow: #ebedf0 0 4px 12px;

  @media (max-width: 1300px) {
    width: @vm-doc-simulator-small-width;
    min-width: @vm-doc-simulator-small-width;
  }

  @media (max-width: 1100px) {
    left: 750px;
    right: auto;
  }

  @media (min-width: @vm-doc-row-max-width) {
    right: 50%;
    margin-right: calc(-@vm-doc-row-max-width / 2 + 40px);
  }

  &-fixed {
    position: fixed;
    top: 90px;
  }

  iframe {
    width: 100%;
    display: block;
  }
}
</style>
