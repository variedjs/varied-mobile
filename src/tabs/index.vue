<template>
  <div :class="b([type])">
    <vm-sticky
      v-if="sticky"
      :container="$el"
      :offsetTop="offsetTop"
      @scroll="onStickyScroll"
    >
      <div
        ref="wrap"
        :class="[
          b('wrap', { scrollable }),
          { 'vm-hairline-top-bottom': type === 'line' && border }
        ]"
      >
        <div
          ref="nav"
          role="tablist"
          :class="b('nav', [type, { complete: scrollable }])"
          :style="navStyle"
        >
          <slot name="nav-left" />
          <template v-for="(item, index) in children">
            <vm-title
              :key="index"
              ref="titles"
              refInFor
              :type="type"
              :dot="item.dot"
              :info="item.badge || item.info"
              :title="item.title"
              :color="color"
              :style="item.titleStyle"
              :isActive="index === currentIndex"
              :disabled="item.disabled"
              :scrollable="scrollable"
              :activeColor="titleActiveColor"
              :inactiveColor="titleInactiveColor"
              :swipeThreshold="swipeThreshold"
              @click="onClick(item, index)"
            >
              <slot name="title" :title="item.title" slot="default" />
            </vm-title>
          </template>
          <div v-if="type === 'line'" :class="b('-line')" :style="lineStyle" />
          <slot name="nav-right" />
        </div>
      </div>
    </vm-sticky>
    <div
      v-else
      ref="wrap"
      :class="[
        b('wrap', { scrollable }),
        { 'vm-hairline-top-bottom': type === 'line' && border }
      ]"
    >
      <div
        ref="nav"
        role="tablist"
        :class="b('nav', [type, { complete: scrollable }])"
        :style="navStyle"
      >
        <slot name="nav-left" />
        <vm-title
          v-for="(item, index) in children"
          :key="index"
          ref="titles"
          refInFor
          :type="type"
          :dot="item.dot"
          :info="item.badge || item.info"
          :title="item.title"
          :color="color"
          :style="item.titleStyle"
          :isActive="index === currentIndex"
          :disabled="item.disabled"
          :scrollable="scrollable"
          :activeColor="titleActiveColor"
          :inactiveColor="titleInactiveColor"
          :swipeThreshold="swipeThreshold"
          @click="onClick(item, index)"
        >
          <slot name="title" :title="item.title" slot="default" />
        </vm-title>
        <div v-if="type === 'line'" :class="b('-line')" :style="lineStyle" />
        <slot name="nav-right" />
      </div>
    </div>
    <vm-content
      :count="children.length"
      :animated="animated"
      :duration="duration"
      :swipeable="swipeable"
      :currentIndex="currentIndex"
      @change="setCurrentIndex"
    >
      <slot />
    </vm-content>
  </div>
</template>

<script>
import Sticky from "../sticky";
import Content from "./content";
import Title from "./title";
import create from "../utils/create";
import { unitToPx, addUnit } from "../utils/format/unit";
import scrollUtils from "../utils/dom/scroll";
import { scrollTopTo, scrollLeftTo } from "./utils";
import { route } from "../utils/router";
import { callInterceptor } from "../utils/interceptor";
import { isDef } from "../utils";
import { isHidden } from "../utils/dom/style";
import { BindEventMixin } from "../mixins/bind-event";
import { ParentMixin } from "../mixins/relation";
import { on, off } from "../utils/dom/event";

export default create({
  components: {
    "vm-sticky": Sticky,
    "vm-content": Content,
    "vm-title": Title
  },
  name: "tabs",
  mixins: [
    ParentMixin("vmTabs"),
    BindEventMixin(function(bind) {
      if (!this.scroller) {
        this.scroller = scrollUtils.getScrollEventTarget(this.$el);
      }

      bind(window, "resize", this.resize, true);

      if (this.scrollspy) {
        bind(this.scroller, "scroll", this.onScroll, true);
      }
    })
  ],
  model: {
    prop: "active"
  },
  props: {
    color: String,
    border: Boolean,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    scrollspy: Boolean,
    background: String,
    lineWidth: [Number, String],
    lineHeight: [Number, String],
    beforeChange: Function,
    titleActiveColor: String,
    titleInactiveColor: String,
    type: {
      type: String,
      default: "line"
    },
    active: {
      type: [Number, String],
      default: 0
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.3
    },
    offsetTop: {
      type: [Number, String],
      default: 0
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    swipeThreshold: {
      type: [Number, String],
      default: 5
    }
  },

  data() {
    return {
      position: "",
      currentIndex: null,
      lineStyle: {
        backgroundColor: this.color
      }
    };
  },

  watch: {
    color: "setLine",

    active(name) {
      if (name !== this.currentName) {
        this.setCurrentIndexByName(name);
      }
    },

    children() {
      this.setCurrentIndexByName(this.currentName || this.active);
      this.setLine();

      this.$nextTick(() => {
        this.scrollIntoView(true);
      });
    },

    currentIndex() {
      this.scrollIntoView();
      this.setLine();

      // scroll to correct position
      if (this.stickyFixed && !this.scrollspy) {
        scrollUtils.setRootScrollTop(
          Math.ceil(scrollUtils.getElementTop(this.$el) - this.offsetTopPx)
        );
      }
    },

    scrollspy(val) {
      if (val) {
        on(this.scroller, "scroll", this.onScroll, true);
      } else {
        off(this.scroller, "scroll", this.onScroll);
      }
    }
  },
  methods: {
    // @exposed-api
    resize() {
      this.setLine();
    },

    init() {
      this.$nextTick(() => {
        this.inited = true;
        this.tabHeight = scrollUtils.getVisibleHeight(this.$refs.wrap);
        this.scrollIntoView(true);
      });
    },

    // update nav bar style
    setLine() {
      const shouldAnimate = this.inited;

      this.$nextTick(() => {
        const { titles } = this.$refs;

        if (
          !titles ||
          !titles[this.currentIndex] ||
          this.type !== "line" ||
          isHidden(this.$el)
        ) {
          return;
        }

        const title = titles[this.currentIndex].$el;
        const { lineWidth, lineHeight } = this;
        const left = title.offsetLeft + title.offsetWidth / 2;

        const lineStyle = {
          width: addUnit(lineWidth),
          backgroundColor: this.color,
          transform: `translateX(${left}px) translateX(-50%)`
        };

        if (shouldAnimate) {
          lineStyle.transitionDuration = `${this.duration}s`;
        }

        if (isDef(lineHeight)) {
          const height = addUnit(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }

        this.lineStyle = lineStyle;
      });
    },

    // correct the index of active tab
    setCurrentIndexByName(name) {
      const matched = this.children.filter(tab => tab.computedName === name);
      const defaultIndex = (this.children[0] || {}).index || 0;
      this.setCurrentIndex(matched.length ? matched[0].index : defaultIndex);
    },

    setCurrentIndex(currentIndex) {
      currentIndex = this.findAvailableTab(currentIndex);

      if (isDef(currentIndex) && currentIndex !== this.currentIndex) {
        const shouldEmitChange = this.currentIndex !== null;
        this.currentIndex = currentIndex;
        this.$emit("input", this.currentName);

        if (shouldEmitChange) {
          this.$emit(
            "change",
            this.currentName,
            this.children[currentIndex].title
          );
        }
      }
    },

    findAvailableTab(index) {
      const diff = index < this.currentIndex ? -1 : 1;

      while (index >= 0 && index < this.children.length) {
        if (!this.children[index].disabled) {
          return index;
        }

        index += diff;
      }
    },

    // emit event when clicked
    onClick(item, index) {
      const { title, disabled, computedName } = this.children[index];
      if (disabled) {
        this.$emit("disabled", computedName, title);
      } else {
        callInterceptor({
          interceptor: this.beforeChange,
          args: [computedName],
          done: () => {
            this.setCurrentIndex(index);
            this.scrollToCurrentContent();
          }
        });

        this.$emit("click", computedName, title);
        route(item.$router, item);
      }
    },

    // scroll active tab into view
    scrollIntoView(immediate) {
      const { titles } = this.$refs;

      if (!this.scrollable || !titles || !titles[this.currentIndex]) {
        return;
      }

      const { nav } = this.$refs;
      const title = titles[this.currentIndex].$el;
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;

      scrollLeftTo(nav, to, immediate ? 0 : +this.duration);
    },

    onStickyScroll(params) {
      this.stickyFixed = params.isFixed;
      this.$emit("scroll", params);
    },

    // @exposed-api
    scrollTo(name) {
      this.$nextTick(() => {
        this.setCurrentIndexByName(name);
        this.scrollToCurrentContent(true);
      });
    },

    scrollToCurrentContent(immediate = false) {
      if (this.scrollspy) {
        const target = this.children[this.currentIndex];
        const el = target?.$el;

        if (el) {
          const to =
            scrollUtils.getElementTop(el, this.scroller) - this.scrollOffset;

          this.lockScroll = true;
          scrollTopTo(this.scroller, to, immediate ? 0 : +this.duration, () => {
            this.lockScroll = false;
          });
        }
      }
    },

    onScroll() {
      if (this.scrollspy && !this.lockScroll) {
        const index = this.getCurrentIndexOnScroll();
        this.setCurrentIndex(index);
      }
    },

    getCurrentIndexOnScroll() {
      const { children } = this;

      for (let index = 0; index < children.length; index++) {
        const top = scrollUtils.getVisibleTop(children[index].$el);

        if (top > this.scrollOffset) {
          return index === 0 ? 0 : index - 1;
        }
      }

      return children.length - 1;
    }
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
    this.setLine();
  },
  computed: {
    // 导航是否可滚动
    scrollable() {
      return this.children.length > this.swipeThreshold || !this.ellipsis;
    },

    navStyle() {
      return {
        borderColor: this.color,
        background: this.background
      };
    },

    currentName() {
      const activeTab = this.children[this.currentIndex];

      if (activeTab) {
        return activeTab.computedName;
      }
    },

    offsetTopPx() {
      return unitToPx(this.offsetTop);
    },

    scrollOffset() {
      if (this.sticky) {
        return this.offsetTopPx + this.tabHeight;
      }
      return 0;
    }
  }
});
</script>
