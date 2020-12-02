<template>
  <div :class="b()" role="feed" :aria-busy="innerLoading">
    <template v-if="direction === 'down'">
      <slot></slot>
      <div ref="placeholder" key="placeholder" :class="b('placeholder')" />
    </template>
    <div v-if="innerLoading && !finished" :class="b('loading')">
      <slot name="loading">
        <Loading size="16">{{ loadingText || "加载中..." }}</Loading>
      </slot>
    </div>
    <div v-if="finished" :class="b('finished-text')">
      <slot name="finished">
        {{ finishedText || "没有更多了" }}
      </slot>
    </div>
    <div v-if="error" @click="clickErrorText" :class="b('error-text')">
      <slot name="error">
        {{ errorText || "加载失败，点击重新加载" }}
      </slot>
    </div>
    <template v-if="direction === 'up'">
      <div ref="placeholder" key="placeholder" :class="b('placeholder')" />
      <slot></slot>
    </template>
  </div>
</template>
<script>
import create from "../utils/create";
import { isHidden } from "../utils/dom/style";
import Scroll from "../utils/dom/scroll";

// Mixins
import { BindEventMixin } from "../mixins/bind-event";

// Components
import Loading from "../loading";

export default create({
  components: { Loading },
  name: "list",
  mixins: [
    BindEventMixin(function(bind) {
      if (!this.scroller) {
        this.scroller = Scroll.getScrollEventTarget(this.$el);
      }

      bind(this.scroller, "scroll", this.check);
    })
  ],
  model: {
    prop: "loading"
  },
  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: [Number, String],
      default: 300
    },
    direction: {
      type: String,
      default: "down"
    }
  },
  data() {
    return {
      // use sync innerLoading state to avoid repeated loading in some edge cases
      innerLoading: this.loading
    };
  },
  updated() {
    this.innerLoading = this.loading;
  },
  mounted() {
    if (this.immediateCheck) {
      this.check();
    }
  },
  watch: {
    loading: "check",
    finished: "check"
  },
  methods: {
    // @exposed-api
    check() {
      this.$nextTick(() => {
        if (this.innerLoading || this.finished || this.error) {
          return;
        }

        const { $el: el, scroller, offset, direction } = this;
        let scrollerRect;
        console.log(direction);
        if (scroller.getBoundingClientRect) {
          scrollerRect = scroller.getBoundingClientRect();
        } else {
          scrollerRect = {
            top: 0,
            bottom: scroller.innerHeight
          };
        }

        const scrollerHeight = scrollerRect.bottom - scrollerRect.top;

        /* istanbul ignore next */
        if (!scrollerHeight || isHidden(el)) {
          return false;
        }

        let isReachEdge = false;
        const placeholderRect = this.$refs.placeholder.getBoundingClientRect();

        if (direction === "up") {
          isReachEdge = scrollerRect.top - placeholderRect.top <= offset;
        } else {
          isReachEdge = placeholderRect.bottom - scrollerRect.bottom <= offset;
        }

        if (isReachEdge) {
          this.innerLoading = true;
          this.$emit("input", true);
          this.$emit("load");
        }
      });
    },

    clickErrorText() {
      this.$emit("update:error", false);
      this.check();
    }
  }
});
</script>
