<template>
  <div
    class="vm-doc-container vm-doc-row"
    :class="{ 'vm-doc-container--with-simulator': hasSimulator }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "vm-doc-container",

  props: {
    hasSimulator: Boolean
  }
};
</script>

<style lang="less">
@import "../style/variable";

.vm-doc-container {
  overflow: hidden;
  box-sizing: border-box;
  padding-left: @vm-doc-nav-width;

  &--with-simulator {
    padding-right: calc(@vm-doc-simulator-width + @vm-doc-padding);

    @media (max-width: 1300px) {
      padding-right: calc(@vm-doc-simulator-small-width + @vm-doc-padding);
    }
  }
}
</style>
