<template>
  <div
    role="tab"
    :aria-selected="isActive"
    :class="[
      b({
        active: isActive,
        disabled: disabled
      })
    ]"
    :style="style"
    @click="onClick"
  >
    <span v-if="dot || (isDef(info) && info !== '')" :class="b('text-wrapper')">
      <span :class="b('text', { ellipsis: !scrollable })">
        <slot :title="title">
          {{ title }}
        </slot>
      </span>
      <Info :dot="dot" :info="info" />
    </span>
    <span v-else :class="b('text', { ellipsis: !scrollable })">
      <slot :title="title">
        {{ title }}
      </slot>
    </span>
  </div>
</template>

<script>
import { isDef } from "../utils";
import Info from "../info";
import create from "../utils/create";

export default create({
  components: { Info },
  name: "tab",
  props: {
    dot: Boolean,
    type: String,
    info: [Number, String],
    color: String,
    title: String,
    isActive: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String,
    swipeThreshold: [Number, String]
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    isDef
  },
  computed: {
    style() {
      const style = {};
      const { color, isActive } = this;
      const isCard = this.type === "card";

      // card theme color
      if (color && isCard) {
        style.borderColor = color;

        if (!this.disabled) {
          if (isActive) {
            style.backgroundColor = color;
          } else {
            style.color = color;
          }
        }
      }

      const titleColor = isActive ? this.activeColor : this.inactiveColor;
      if (titleColor) {
        style.color = titleColor;
      }

      return style;
    }
  }
});
</script>
