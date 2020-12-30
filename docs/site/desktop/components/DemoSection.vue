<template>
  <section
    class="vm-doc-demo-section"
    :class="`demo-${demoName}`"
    :style="style"
  >
    <slot />
  </section>
</template>

<script>
export default {
  name: "vm-doc-demo-section",

  props: {
    name: String,
    title: String,
    background: String
  },

  computed: {
    demoName() {
      return this.name || this.getParentName();
    },
    style() {
      return {
        background: this.background
      };
    }
  },

  methods: {
    getParentName() {
      const { $parent } = this;
      if ($parent && $parent.$options.name) {
        return $parent.$options.name.replace("demo-", "");
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/variable";

.vm-doc-demo-section {
  min-height: 100vh;
  padding-bottom: 20px;
  box-sizing: border-box;

  &__title {
    margin: 0;
    padding: 15px;
    font-size: 16px;
    line-height: 1.5;
    font-weight: normal;
    text-transform: capitalize;

    + .vm-doc-demo-block {
      .vm-doc-demo-block__title {
        padding-top: 0;
      }
    }
  }
}
</style>
