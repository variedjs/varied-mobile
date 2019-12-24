<template>
  <transition name="van-fade">
    <div
      v-show="visible"
      class="vm-overlay"
      :class="className"
      :style="style"
      @touchmove.prevent.stop
      @click="$emit('click', $event)"
    />
  </transition>
</template>

<script>
  export default {
    name: 'overlay',

    props: {
      zIndex: Number,
      visible: Boolean,
      className: String,
      customStyle: Object
    },

    computed: {
      style() {
        return {
          zIndex: this.zIndex,
          ...this.customStyle
        };
      }
    }
  };
</script>
