<template>
  <div :class="b()" @click="onClick('cell')">
    <div :class="b('wrapper')" :style="wrapperStyle">
      <div
        v-if="$slots['left']"
        ref="left"
        :class="b('left')"
        @click.prevent.stop="onClick('left')"
      >
        <slot name="left"></slot>
      </div>
      <slot></slot>
      <div
        v-if="$slots['right']"
        ref="right"
        :class="b('right')"
        @click.prevent.stop="onClick('right')"
      >
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import create from "../utils/create";
import { range } from "../utils/format/number";
import { preventDefault } from "../utils/dom/event";

// Mixins
import { TouchMixin } from "../mixins/touch";
import { ClickOutsideMixin } from "../mixins/click-outside";

const THRESHOLD = 0.15;

export default create({
  name: "swipe-cell",
  mixins: [
    TouchMixin,
    ClickOutsideMixin({
      event: "touchstart",
      method: "onClick"
    })
  ],

  props: {
    // @deprecated
    // should be removed in next major version, use beforeClose instead
    onClose: Function,
    disabled: Boolean,
    leftWidth: [Number, String],
    rightWidth: [Number, String],
    beforeClose: Function,
    stopPropagation: Boolean,
    name: {
      type: [Number, String],
      default: ""
    }
  },

  data() {
    return {
      offset: 0,
      dragging: false
    };
  },

  computed: {
    computedLeftWidth() {
      return +this.leftWidth || this.getWidthByRef("left");
    },

    computedRightWidth() {
      return +this.rightWidth || this.getWidthByRef("right");
    },

    wrapperStyle() {
      return {
        transform: `translate3d(${this.offset}px, 0, 0)`,
        transitionDuration: this.dragging ? "0s" : ".6s"
      };
    }
  },

  mounted() {
    this.bindTouchEvent(this.$el);
  },

  methods: {
    getWidthByRef(ref) {
      if (this.$refs[ref]) {
        const rect = this.$refs[ref].getBoundingClientRect();
        return rect.width;
      }

      return 0;
    },

    // @exposed-api
    open(position) {
      const offset =
        position === "left" ? this.computedLeftWidth : -this.computedRightWidth;

      this.opened = true;
      this.offset = offset;

      this.$emit("open", {
        position,
        name: this.name,
        // @deprecated
        // should be removed in next major version
        detail: this.name
      });
    },

    // @exposed-api
    close(position) {
      this.offset = 0;

      if (this.opened) {
        this.opened = false;
        this.$emit("close", {
          position,
          name: this.name
        });
      }
    },

    onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.startOffset = this.offset;
      this.touchStart(event);
    },

    onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (this.direction === "horizontal") {
        this.dragging = true;
        this.lockClick = true;

        const isPrevent = !this.opened || this.deltaX * this.startOffset < 0;

        if (isPrevent) {
          preventDefault(event, this.stopPropagation);
        }

        this.offset = range(
          this.deltaX + this.startOffset,
          -this.computedRightWidth,
          this.computedLeftWidth
        );
      }
    },

    onTouchEnd() {
      if (this.disabled) {
        return;
      }

      if (this.dragging) {
        this.toggle(this.offset > 0 ? "left" : "right");
        this.dragging = false;

        // compatible with desktop scenario
        setTimeout(() => {
          this.lockClick = false;
        }, 0);
      }
    },

    toggle(direction) {
      const offset = Math.abs(this.offset);
      const threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      const { computedLeftWidth, computedRightWidth } = this;

      if (
        computedRightWidth &&
        direction === "right" &&
        offset > computedRightWidth * threshold
      ) {
        this.open("right");
      } else if (
        computedLeftWidth &&
        direction === "left" &&
        offset > computedLeftWidth * threshold
      ) {
        this.open("left");
      } else {
        this.close();
      }
    },

    onClick(position = "outside") {
      this.$emit("click", position);

      if (this.opened && !this.lockClick) {
        if (this.beforeClose) {
          this.beforeClose({
            position,
            name: this.name,
            instance: this
          });
        } else if (this.onClose) {
          this.onClose(position, this, { name: this.name });
        } else {
          this.close(position);
        }
      }
    }
  }
});
</script>
