<template>
  <transition name="vm-fade">
    <div
      v-show="show"
      :class="[b(), className]"
      :style="style"
      @touchmove="lockScroll ? preventTouchMove : noop"
      @click="$emit('click', $event)"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import create from "../utils/create";
import { isDef, noop } from "../utils";
import { preventDefault } from "../utils/dom/event";
export default create({
  name: "overlay",

  props: {
    show: Boolean,
    zIndex: [Number, String],
    duration: [Number, String],
    className: null,
    customStyle: Object,
    lockScroll: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    noop,
    preventTouchMove(event) {
      preventDefault(event, true);
    }
  },

  computed: {
    style() {
      let style = {
        zIndex: this.zIndex,
        ...this.customStyle
      };
      if (isDef(this.duration)) {
        style.animationDuration = `${this.duration}s`;
      }
      console.log(style);
      return style;
    }
  }
});
</script>
