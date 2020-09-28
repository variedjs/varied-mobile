<template>
  <div :style="rootStyle">
    <div :class="b({ fixed })" :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { isDef, isServer } from "../utils";
import { unitToPx } from "../utils/format/unit";
import { isHidden } from "../utils/dom/style";
import scrollUtils from "../utils/dom/scroll";
import { BindEventMixin } from "../mixins/bind-event";
import create from "../utils/create";

export default create({
  name: "sticky",
  mixins: [
    BindEventMixin(function(bind, isBind) {
      if (!this.scroller) {
        this.scroller = scrollUtils.getScrollEventTarget(this.$el);
      }

      if (this.observer) {
        const method = isBind ? "observe" : "unobserve";
        this.observer[method](this.$el);
      }

      bind(this.scroller, "scroll", this.onScroll, true);
      this.onScroll();
    })
  ],
  props: {
    zIndex: [Number, String],
    container: null,
    offsetTop: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return { fixed: false, height: 0, transform: 0 };
  },
  created() {
    if (!isServer && window.IntersectionObserver) {
      this.observer = new IntersectionObserver(
        entries => {
          // 可见性更改时触发滚动
          if (entries[0].intersectionRatio > 0) {
            this.onScroll();
          }
        },
        { root: document.body }
      );
    }
  },
  methods: {
    onScroll() {
      if (isHidden(this.$el)) {
        return;
      }

      this.height = this.$el.offsetHeight;

      const { container, offsetTopPx } = this;
      const scrollTop = scrollUtils.getScrollTop(window);
      const topToPageTop = scrollUtils.getElementTop(this.$el);

      const emitScrollEvent = () => {
        this.$emit("scroll", {
          scrollTop,
          isFixed: this.fixed
        });
      };

      // The sticky component should be kept inside the container element
      if (container) {
        const bottomToPageTop = topToPageTop + container.offsetHeight;

        if (scrollTop + offsetTopPx + this.height > bottomToPageTop) {
          const distanceToBottom = this.height + scrollTop - bottomToPageTop;

          if (distanceToBottom < this.height) {
            this.fixed = true;
            this.transform = -(distanceToBottom + offsetTopPx);
          } else {
            this.fixed = false;
          }

          emitScrollEvent();
          return;
        }
      }

      if (scrollTop + offsetTopPx > topToPageTop) {
        this.fixed = true;
        this.transform = 0;
      } else {
        this.fixed = false;
      }

      emitScrollEvent();
    }
  },
  computed: {
    offsetTopPx() {
      return unitToPx(this.offsetTop);
    },

    style() {
      if (!this.fixed) {
        return;
      }

      const style = {};

      if (isDef(this.zIndex)) {
        style.zIndex = this.zIndex;
      }

      if (this.offsetTopPx && this.fixed) {
        style.top = `${this.offsetTopPx}px`;
      }

      if (this.transform) {
        style.transform = `translate3d(0, ${this.transform}px, 0)`;
      }

      return style;
    },
    rootStyle() {
      const { fixed, height } = this;
      return {
        height: fixed ? `${height}px` : null
      };
    }
  }
});
</script>

<style scoped></style>
