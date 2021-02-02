<template>
  <div :class="b()">
    <slot />
  </div>
</template>
<script>
import create from "../utils/create";
import { ParentMixin } from "../mixins/relation";

export default create({
  name: "sidebar",
  mixins: [ParentMixin("vmSidebar")],

  model: {
    prop: "activeKey"
  },

  props: {
    activeKey: {
      type: [Number, String],
      default: 0
    }
  },

  data() {
    return {
      index: +this.activeKey
    };
  },

  watch: {
    activeKey() {
      this.setIndex(+this.activeKey);
    }
  },

  methods: {
    setIndex(index) {
      if (index !== this.index) {
        this.index = index;
        this.$emit("change", index);
      }
    }
  }
});
</script>
