<template>
  <div
    role="alert"
    v-show="show"
    :class="b({ wrapable })"
    :style="barStyle"
    @click="onClick($event)"
  >
    <slot name="left-icon">
      <Icon v-if="leftIcon" :class="b('left-icon')" :name="leftIcon" />
    </slot>
    <div ref="wrap" :class="b('wrap')" role="marquee">
      <div
        ref="content"
        :class="[
          b('content'),
          { 'van-ellipsis': scrollable === false && !wrapable }
        ]"
        :style="contentStyle"
        v-on:transitionend="onTransitionEnd"
      >
        <slot>{{ text }}</slot>
      </div>
    </div>
    <slot name="right-icon">
      <Icon
        v-if="iconName"
        :class="b('right-icon')"
        :name="iconName"
        @click="onClickIcon"
      />
    </slot>
  </div>
</template>
<script>
import create from "../utils/create";

import { isDef } from "../utils";
import { doubleRaf, raf } from "../utils/dom/raf";
import { BindEventMixin } from "../mixins/bind-event";
import Icon from "../icon";

export default create({
  components: { Icon },
  name: "notice-bar",
  mixins: [
    BindEventMixin(function(bind) {
      // fix cache issues with forwards and back history in safari
      // see: https://guwii.com/cache-issues-with-forwards-and-back-history-in-safari/
      bind(window, "pageshow", this.start);
    })
  ],

  props: {
    text: String,
    mode: String,
    color: String,
    leftIcon: String,
    wrapable: Boolean,
    background: String,
    scrollable: {
      type: Boolean,
      default: null
    },
    delay: {
      type: [Number, String],
      default: 1
    },
    speed: {
      type: [Number, String],
      default: 50
    }
  },

  data() {
    return {
      show: true,
      offset: 0,
      duration: 0,
      wrapWidth: 0,
      contentWidth: 0
    };
  },

  watch: {
    scrollable: "start",
    text: {
      handler: "start",
      immediate: true
    }
  },

  activated() {
    this.start();
  },

  computed: {
    iconName() {
      const { mode } = this;
      let iconName;
      if (mode === "closeable") {
        iconName = "close";
      } else if (mode === "link") {
        iconName = "chevron-right";
      }
      return iconName;
    },
    barStyle() {
      return {
        color: this.color,
        background: this.background
      };
    },
    contentStyle() {
      return {
        transform: this.offset ? `translateX(${this.offset}px)` : "",
        transitionDuration: this.duration + "s"
      };
    }
  },

  methods: {
    onClick(event) {
      this.$emit("click", event);
    },

    onClickIcon(event) {
      if (this.mode === "closeable") {
        this.show = false;
        this.$emit("close", event);
      }
    },

    onTransitionEnd() {
      this.offset = this.wrapWidth;
      this.duration = 0;

      // wait for Vue to render offset
      // using nextTick won't work in iOS14
      raf(() => {
        // use double raf to ensure animation can start
        doubleRaf(() => {
          this.offset = -this.contentWidth;
          this.duration = (this.contentWidth + this.wrapWidth) / this.speed;
          this.$emit("replay");
        });
      });
    },

    reset() {
      this.offset = 0;
      this.duration = 0;
      this.wrapWidth = 0;
      this.contentWidth = 0;
    },

    start() {
      const delay = isDef(this.delay) ? this.delay * 1000 : 0;

      this.reset();

      clearTimeout(this.startTimer);
      this.startTimer = setTimeout(() => {
        const { wrap, content } = this.$refs;
        if (!wrap || !content || this.scrollable === false) {
          return;
        }

        const wrapWidth = wrap.getBoundingClientRect().width;
        const contentWidth = content.getBoundingClientRect().width;

        if (this.scrollable || contentWidth > wrapWidth) {
          doubleRaf(() => {
            this.offset = -contentWidth;
            this.duration = contentWidth / this.speed;
            this.wrapWidth = wrapWidth;
            this.contentWidth = contentWidth;
          });
        }
      }, delay);
    }
  }
});
</script>
