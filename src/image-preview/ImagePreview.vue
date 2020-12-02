<template>
  <transition name="vm-fade" :@after-leave="onClosed">
    <div v-if="value" :class="[b(), className]">
      <Icon
        v-if="closeable"
        role="button"
        :name="closeIcon"
        :class="b('close-icon', closeIconPosition)"
        @click="emitClose"
      />
      <Swipe
        ref="swipe"
        lazyRender
        :loop="loop"
        :class="b('swipe')"
        :duration="swipeDuration"
        :initialSwipe="startPosition"
        :showIndicators="showIndicators"
        indicatorColor="white"
        @change="setActive"
      >
        <ImagePreviewItem
          v-for="(image, index) in images"
          :key="index"
          :b="b"
          :src="image"
          :show="value"
          :active="active"
          :maxZoom="maxZoom"
          :minZoom="minZoom"
          :rootWidth="rootWidth"
          :rootHeight="rootHeight"
          @scale="emitScale"
          @close="emitClose"
        />
      </Swipe>
      <div v-if="showIndex" :class="b('index')">
        <slot name="index">
          {{ `${active + 1} / ${images.length}` }}
        </slot>
      </div>
      <div v-if="$slots['cover']" :class="b('cover')">
        <slot name="cover"></slot>
      </div>
    </div>
  </transition>
</template>
<script>
import create from "../utils/create";

// Mixins
import PopupMixin from "../mixins/popup";
import { TouchMixin } from "../mixins/touch";
import { BindEventMixin } from "../mixins/bind-event";

// Components
import Icon from "../icon";
import Swipe from "../swipe";
import ImagePreviewItem from "./ImagePreviewItem";
export default create({
  components: { Icon, Swipe, ImagePreviewItem },
  name: "image-preview",
  mixins: [
    TouchMixin,
    PopupMixin,
    BindEventMixin(function(bind) {
      bind(window, "resize", this.resize, true);
      bind(window, "orientationchange", this.resize, true);
    })
  ],

  props: {
    className: null,
    closeable: Boolean,
    asyncClose: Boolean,
    showIndicators: Boolean,
    images: {
      type: Array,
      default: () => []
    },
    loop: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    minZoom: {
      type: [Number, String],
      default: 1 / 3
    },
    maxZoom: {
      type: [Number, String],
      default: 3
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    swipeDuration: {
      type: [Number, String],
      default: 500
    },
    startPosition: {
      type: [Number, String],
      default: 0
    },
    overlayClass: {
      type: String,
      default: "overlay"
    },
    closeIcon: {
      type: String,
      default: "close"
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeIconPosition: {
      type: String,
      default: "top-right"
    }
  },

  data() {
    return {
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      doubleClickTimer: null
    };
  },

  mounted() {
    this.resize();
  },

  watch: {
    startPosition: "setActive",

    value(val) {
      if (val) {
        this.setActive(+this.startPosition);
        this.$nextTick(() => {
          this.resize();
          this.$refs.swipe.swipeTo(+this.startPosition, { immediate: true });
        });
      } else {
        this.$emit("close", {
          index: this.active,
          url: this.images[this.active]
        });
      }
    }
  },

  methods: {
    resize() {
      if (this.$el && this.$el.getBoundingClientRect) {
        const rect = this.$el.getBoundingClientRect();
        this.rootWidth = rect.width;
        this.rootHeight = rect.height;
      }
    },

    emitClose() {
      if (!this.asyncClose) {
        this.$emit("input", false);
      }
    },

    emitScale(args) {
      this.$emit("scale", args);
    },

    setActive(active) {
      if (active !== this.active) {
        this.active = active;
        this.$emit("change", active);
      }
    },
    onClosed() {
      this.$emit("closed");
    }
  }
});
</script>
