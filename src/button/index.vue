<template>
  <component
    :is="tag"
    :class="b([{ loading, block, disabled }, size, radius])"
    :disabled="disabled"
    :style="style"
    @click="onClick"
    @touchstart.stop="onTouchStart"
    @touchend.stop="onTouchEnd"
    @touchcancel.stop="onTouchEnd"
  >
    <icon v-if="iconPosition === 'left'" :name="icon" :class="b('icon')" />
    <template v-if="loading">
      <icon name="spinner" class="vm-icon-spin" />
      {{ loadingText }}
    </template>
    <slot v-else>{{ text }}</slot>
    <icon v-if="iconPosition === 'right'" :name="icon" :class="b('icon')" />
  </component>
</template>
<script>
import create from "../utils/create";
import { addUnit } from "../utils/format/unit";
import Touch from "../mixins/touch";

export default create({
  name: "button",
  mixins: [Touch],
  props: {
    tag: {
      type: String,
      default: "button"
    },
    radius: {
      type: String,
      default: "nc"
    },
    size: {
      type: String,
      default: "md"
    },
    icon: String,
    iconPosition: {
      type: String,
      default: "left"
    },
    block: Boolean,
    plain: Boolean,
    loading: Boolean,
    loadingText: String,
    text: String,
    color: String,
    background: String,
    disabled: Boolean,
    width: [String, Number],
    height: [String, Number],
    longPress: {
      type: Boolean,
      default: true
    },
    longPressTime: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      timeout: {}
    };
  },
  methods: {
    onClick(event) {
      if (!this.loading && !this.disabled) {
        this.$emit("click", event);
      }
    },

    onLongPress(event) {
      if (!this.loading && !this.disabled) {
        this.$emit("longPress", event);
      }
    },

    onTouchStart(event) {
      const { disabled, loading, longPressTime, onLongPress, longPress } = this;
      if (disabled || loading || !longPress) {
        return;
      }

      this.touchStart(event);
      this.timeout = setTimeout(() => {
        onLongPress(event);
      }, longPressTime);
    },

    onTouchEnd() {
      const { disabled, loading, timeout, longPress } = this;

      if (disabled || loading || !longPress) {
        return;
      }

      clearTimeout(timeout);
    }
  },
  computed: {
    style() {
      let { width, height, color, background } = this;
      width = addUnit(width);
      height = addUnit(height);
      let lineHeight = height;

      return {
        width,
        height,
        lineHeight,
        color,
        background
      };
    }
  }
});
</script>
