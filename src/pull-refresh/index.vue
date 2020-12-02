<template>
  <div :class="b()">
    <div ref="track" :class="b('track')" :style="trackStyle">
      <div :class="b('head')" :style="headStyle">
        <slot v-if="status === 'normal'" name="normal">
          <div :class="b('text')">{{ statusText }}</div>
        </slot>
        <slot v-if="status === 'pulling'" name="pulling">
          <div :class="b('text')">{{ statusText }}</div>
        </slot>
        <slot v-if="status === 'loosing'" name="loosing">
          <div :class="b('text')">{{ statusText }}</div>
        </slot>
        <slot v-if="status === 'loading'" name="loading">
          <Loading size="16">{{ statusText }}</Loading>
        </slot>
        <slot v-if="status === 'success'" name="success">
          <div :class="b('text')">{{ statusText }}</div>
        </slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import create from "../utils/create";
import { preventDefault } from "../utils/dom/event";
import Scroll from "../utils/dom/scroll";

// Mixins
import { TouchMixin } from "../mixins/touch";

// Components
import Loading from "../loading";

const DEFAULT_HEAD_HEIGHT = 50;
const TEXT_STATUS = ["pulling", "loosing", "success"];
export default create({
  components: { Loading },
  name: "pull-refresh",
  mixins: [TouchMixin],
  props: {
    disabled: Boolean,
    successText: String,
    pullingText: String,
    loosingText: String,
    loadingText: String,
    value: {
      type: Boolean,
      required: true
    },
    successDuration: {
      type: [Number, String],
      default: 500
    },
    animationDuration: {
      type: [Number, String],
      default: 300
    },
    headHeight: {
      type: [Number, String],
      default: DEFAULT_HEAD_HEIGHT
    }
  },
  created() {
    console.log(this.status, this.statusText);
  },
  data() {
    return {
      status: "normal",
      distance: 0,
      duration: 0
    };
  },
  computed: {
    trackStyle() {
      return {
        transitionDuration: `${this.duration}ms`,
        transform: this.distance ? `translate3d(0,${this.distance}px, 0)` : ""
      };
    },
    statusText() {
      const {
        status,
        successText,
        pullingText,
        loosingText,
        loadingText
      } = this;
      let text = "";
      switch (status) {
        case "loosing":
          text = loosingText || "释放即可刷新...";
          break;
        case "pulling":
          text = pullingText || "下拉即可刷新...";
          break;
        case "loading":
          text = loadingText || "加载中...";
          break;
        case "success":
          text = successText;
          break;
      }
      return text;
    },

    touchable() {
      return (
        this.status !== "loading" && this.status !== "success" && !this.disabled
      );
    },

    headStyle() {
      if (this.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: `${this.headHeight}px`
        };
      }
    }
  },
  watch: {
    value(loading) {
      this.duration = this.animationDuration;

      if (loading) {
        this.setStatus(+this.headHeight, true);
      } else if (this.$slots["success"] || this.successText) {
        this.showSuccessTip();
      } else {
        this.setStatus(0, false);
      }
    }
  },
  mounted() {
    this.bindTouchEvent(this.$refs.track);
    this.scrollEl = Scroll.getScrollEventTarget(this.$el);
  },
  methods: {
    checkPullStart(event) {
      this.ceiling = Scroll.getScrollTop(this.scrollEl) === 0;

      if (this.ceiling) {
        this.duration = 0;
        this.touchStart(event);
      }
    },

    onTouchStart(event) {
      if (this.touchable) {
        this.checkPullStart(event);
      }
    },

    onTouchMove(event) {
      if (!this.touchable) {
        return;
      }

      if (!this.ceiling) {
        this.checkPullStart(event);
      }

      this.touchMove(event);

      if (this.ceiling && this.deltaY >= 0 && this.direction === "vertical") {
        preventDefault(event);
        this.setStatus(this.ease(this.deltaY));
      }
    },

    onTouchEnd() {
      if (this.touchable && this.ceiling && this.deltaY) {
        this.duration = this.animationDuration;

        if (this.status === "loosing") {
          this.setStatus(+this.headHeight, true);
          this.$emit("input", true);

          // ensure value change can be watched
          this.$nextTick(() => {
            this.$emit("refresh");
          });
        } else {
          this.setStatus(0);
        }
      }
    },

    ease(distance) {
      const headHeight = +this.headHeight;

      if (distance > headHeight) {
        if (distance < headHeight * 2) {
          distance = headHeight + (distance - headHeight) / 2;
        } else {
          distance = headHeight * 1.5 + (distance - headHeight * 2) / 4;
        }
      }

      return Math.round(distance);
    },

    setStatus(distance, isLoading) {
      let status;
      if (isLoading) {
        status = "loading";
      } else if (distance === 0) {
        status = "normal";
      } else {
        status = distance < this.headHeight ? "pulling" : "loosing";
      }

      this.distance = distance;

      if (status !== this.status) {
        this.status = status;
      }
    },
    showSuccessTip() {
      this.status = "success";

      setTimeout(() => {
        this.setStatus(0);
      }, this.successDuration);
    }
  }
});
</script>
