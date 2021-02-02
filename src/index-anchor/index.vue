<template>
  <div :style="{ height: sticky ? `${rect.height}px` : null }">
    <div
      :style="anchorStyle"
      :class="[b({ sticky }), { ['vm-hairline-bottom']: sticky }]"
    >
      <slot>
        {{ index }}
      </slot>
    </div>
  </div>
</template>
<script>
import create from "../utils/create";
import { ChildrenMixin } from "../mixins/relation";
import Scroll from "../utils/dom/scroll";

export default create({
  name: "index-anchor",
  mixins: [ChildrenMixin("vmIndexBar", { indexKey: "childrenIndex" })],

  props: {
    index: [Number, String]
  },

  data() {
    return {
      top: 0,
      left: null,
      rect: { top: 0, height: 0 },
      width: null,
      active: false
    };
  },

  computed: {
    sticky() {
      return this.active && this.parents.sticky;
    },

    anchorStyle() {
      if (this.sticky) {
        return {
          zIndex: `${this.parents.zIndex}`,
          left: this.left ? `${this.left}px` : null,
          width: this.width ? `${this.width}px` : null,
          transform: `translate3d(0, ${this.top}px, 0)`,
          color: this.parents.highlightColor
        };
      }
    }
  },

  mounted() {
    const rect = this.$el.getBoundingClientRect();
    this.rect.height = rect.height;
  },

  methods: {
    scrollIntoView() {
      this.$el.scrollIntoView();
    },

    getRect(scroller, scrollerRect) {
      const el = this.$el;
      const elRect = el.getBoundingClientRect();
      this.rect.height = elRect.height;

      if (scroller === window || scroller === document.body) {
        this.rect.top = elRect.top + Scroll.getRootScrollTop();
      } else {
        this.rect.top =
          elRect.top + Scroll.getScrollTop(scroller) - scrollerRect.top;
      }

      return this.rect;
    }
  }
});
</script>
