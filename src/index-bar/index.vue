<template>
  <div :class="b()">
    <div
      :class="b('sidebar')"
      :style="sidebarStyle"
      @click="onClick"
      @touchstart="touchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <span
        v-for="index in indexList"
        :key="index"
        :class="b('index', { active: index === activeAnchorIndex })"
        :style="index === activeAnchorIndex ? highlightStyle : null"
        :data-index="index"
      >
        {{ index }}
      </span>
    </div>
    <slot />
  </div>
</template>
<script>
import create from "../utils/create";
import { isDef } from "../utils";
import { isHidden } from "../utils/dom/style";
import { preventDefault } from "../utils/dom/event";

import Scroll from "../utils/dom/scroll";

// Mixins
import { TouchMixin } from "../mixins/touch";
import { ParentMixin } from "../mixins/relation";
import { BindEventMixin } from "../mixins/bind-event";

function genAlphabet() {
  const indexList = [];
  const charCodeOfA = "A".charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
}
export default create({
  name: "index-bar",
  mixins: [
    TouchMixin,
    ParentMixin("vmIndexBar"),
    BindEventMixin(function(bind) {
      if (!this.scroller) {
        this.scroller = Scroll.getScrollEventTarget(this.$el);
      }

      bind(this.scroller, "scroll", this.onScroll);
    })
  ],

  props: {
    zIndex: [Number, String],
    highlightColor: String,
    sticky: {
      type: Boolean,
      default: true
    },
    stickyOffsetTop: {
      type: Number,
      default: 0
    },
    indexList: {
      type: Array,
      default: genAlphabet
    }
  },

  data() {
    return {
      activeAnchorIndex: null
    };
  },

  computed: {
    sidebarStyle() {
      if (isDef(this.zIndex)) {
        return {
          zIndex: this.zIndex + 1
        };
      }
    },

    highlightStyle() {
      const { highlightColor } = this;
      if (highlightColor) {
        return {
          color: highlightColor
        };
      }
    }
  },

  watch: {
    indexList() {
      this.$nextTick(this.onScroll);
    },

    activeAnchorIndex(value) {
      if (value) {
        this.$emit("change", value);
      }
    }
  },

  methods: {
    onScroll() {
      if (isHidden(this.$el)) {
        return;
      }

      const scrollTop = Scroll.getScrollTop(this.scroller);
      const scrollerRect = this.getScrollerRect();
      const rects = this.children.map(item =>
        item.getRect(this.scroller, scrollerRect)
      );

      const active = this.getActiveAnchorIndex(scrollTop, rects);

      this.activeAnchorIndex = this.indexList[active];

      if (this.sticky) {
        this.children.forEach((item, index) => {
          if (index === active || index === active - 1) {
            const rect = item.$el.getBoundingClientRect();
            item.left = rect.left;
            item.width = rect.width;
          } else {
            item.left = null;
            item.width = null;
          }

          if (index === active) {
            item.active = true;
            item.top =
              Math.max(this.stickyOffsetTop, rects[index].top - scrollTop) +
              scrollerRect.top;
          } else if (index === active - 1) {
            const activeItemTop = rects[active].top - scrollTop;
            item.active = activeItemTop > 0;
            item.top = activeItemTop + scrollerRect.top - rects[index].height;
          } else {
            item.active = false;
          }
        });
      }
    },

    getScrollerRect() {
      if (this.scroller.getBoundingClientRect) {
        return this.scroller.getBoundingClientRect();
      }

      return {
        top: 0,
        left: 0
      };
    },

    getActiveAnchorIndex(scrollTop, rects) {
      for (let i = this.children.length - 1; i >= 0; i--) {
        const prevHeight = i > 0 ? rects[i - 1].height : 0;
        const reachTop = this.sticky ? prevHeight + this.stickyOffsetTop : 0;

        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }
      return -1;
    },

    onClick(event) {
      this.scrollToElement(event.target);
    },

    onTouchMove(event) {
      this.touchMove(event);

      if (this.direction === "vertical") {
        preventDefault(event);

        const { clientX, clientY } = event.touches[0];
        const target = document.elementFromPoint(clientX, clientY);
        if (target) {
          const { index } = target.dataset;

          /* istanbul ignore else */
          if (this.touchActiveIndex !== index) {
            this.touchActiveIndex = index;
            this.scrollToElement(target);
          }
        }
      }
    },

    scrollToElement(element) {
      const { index } = element.dataset;
      if (!index) {
        return;
      }

      const match = this.children.filter(item => String(item.index) === index);

      if (match[0]) {
        match[0].scrollIntoView();

        if (this.sticky && this.stickyOffsetTop) {
          Scroll.setRootScrollTop(
            Scroll.getRootScrollTop() - this.stickyOffsetTop
          );
        }

        this.$emit("select", match[0].index);
      }
    },

    onTouchEnd() {
      this.active = null;
    }
  }
});
</script>
