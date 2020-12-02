<template>
  <div :class="b([type, { vertical }])" :style="style">
    <span :class="b('container', type)" :style="cStyle">
      <i v-for="(item, index) in type === 'spinner' ? 12 : 0" :key="index" />
      <svg
        v-if="type === 'circular'"
        :class="b('circle')"
        viewBox="25 25 50 50"
      >
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
    <span
      v-if="$slots['default']"
      :class="b('text')"
      :style="{
        fontSize: addUnit(textSize)
      }"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script>
import create from "../utils/create-basic";
import { addUnit } from "../utils/format/unit";

export default create({
  name: "loading",

  props: {
    size: [String, Number],
    type: {
      type: String,
      default: "circular"
    },
    color: {
      type: String,
      default: "#c9c9c9"
    },
    textSize: [Number, String],
    vertical: Boolean,
    background: String,
    backgroundSize: {
      type: String,
      default: "10px"
    }
  },

  methods: {
    addUnit
  },

  computed: {
    style() {
      return {
        color: this.color,
        background: this.background,
        padding: this.background ? this.backgroundSize : "",
        borderRadius: this.background ? "4px" : ""
      };
    },
    cStyle() {
      return { width: addUnit(this.size), height: addUnit(this.size) };
    }
  }
});
</script>
