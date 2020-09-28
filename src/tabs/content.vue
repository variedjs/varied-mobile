<template>
  <div :class="b('content', { animated: this.animated })" v-on="listeners">
    <div v-if="animated" :class="b('track')" :style="style">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script>
import create from "../utils/create";

const MIN_SWIPE_DISTANCE = 50;
import TouchMixin from "../mixins/touch";

export default create({
  mixins: [TouchMixin],
  name: "content",
  props: {
    count: Number,
    duration: [Number, String],
    animated: Boolean,
    swipeable: Boolean,
    currentIndex: Number
  },
  methods: {
    // 监听滑动触摸结束
    onTouchEnd() {
      const { direction, deltaX, currentIndex } = this;

      /* istanbul ignore else */
      if (direction === "horizontal" && this.offsetX >= MIN_SWIPE_DISTANCE) {
        /* istanbul ignore else */
        if (deltaX > 0 && currentIndex !== 0) {
          this.$emit("change", currentIndex - 1);
        } else if (deltaX < 0 && currentIndex !== this.count - 1) {
          this.$emit("change", currentIndex + 1);
        }
      }
    }
  },
  computed: {
    style() {
      if (this.animated) {
        return {
          transform: `translate3d(${-1 * this.currentIndex * 100}%, 0, 0)`,
          transitionDuration: `${this.duration}s`
        };
      }
    },

    listeners() {
      if (this.swipeable) {
        return {
          touchstart: this.touchStart,
          touchmove: this.touchMove,
          touchend: this.onTouchEnd,
          touchcancel: this.onTouchEnd
        };
      }
    }
  }
});
</script>
