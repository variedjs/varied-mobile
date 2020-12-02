<template>
  <div :class="b()" :style="style" v-on="$listeners">
    <slot v-if="shouldRender"></slot>
  </div>
</template>
<script>
import create from "../utils/create";
import { ChildrenMixin } from "../mixins/relation";

export default create({
  name: "swipe-item",
  mixins: [ChildrenMixin("vmSwipe")],

  data() {
    return {
      offset: 0,
      mounted: false
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.mounted = true;
    });
  },

  computed: {
    style() {
      const style = {};
      const { size, vertical } = this.parents;

      style[vertical ? "height" : "width"] = `${size}px`;

      if (this.offset) {
        style.transform = `translate${vertical ? "Y" : "X"}(${this.offset}px)`;
      }

      return style;
    },

    shouldRender() {
      const { index, parents, mounted } = this;

      if (!parents.lazyRender) {
        return true;
      }

      // wait for all item to mount, so we can get the exact count
      if (!mounted) {
        return false;
      }

      const active = parents.activeIndicator;
      const maxActive = parents.count - 1;
      const prevActive = active === 0 ? maxActive : active - 1;
      const nextActive = active === maxActive ? 0 : active + 1;

      return index === active || index === prevActive || index === nextActive;
    }
  }
});
</script>
