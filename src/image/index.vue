<template>
  <div :class="b({ round })" :style="style" @click="onClick">
    <img
      v-if="!error && lazyLoad"
      ref="image"
      v-lazy="src"
      :class="b('img')"
      :attrs="{
        alt
      }"
      :style="{
        objectFit: fit
      }"
    />
    <img
      v-if="!error && !lazyLoad"
      :src="src"
      @load="onLoad"
      @error="onError"
      :class="b('img')"
      :attrs="{
        alt
      }"
      :style="{
        objectFit: fit
      }"
    />
    <div v-if="loading && showLoading" :class="b('loading')">
      <slot name="loading">
        <Icon :name="loadingIcon" :class="b('loading-icon')" />
      </slot>
    </div>
    <div v-if="error && showError" :class="b('error')">
      <slot name="error">
        <Icon :name="errorIcon" :class="b('error-icon')" />
      </slot>
    </div>
    <slot />
  </div>
</template>
<script>
import create from "../utils/create";
import { isDef, inBrowser } from "../utils";
import { addUnit } from "../utils/format/unit";
import Icon from "../icon";

export default create({
  name: "image",
  components: { Icon },
  props: {
    src: String,
    fit: String,
    alt: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    errorIcon: {
      type: String,
      default: "window-close-o"
    },
    loadingIcon: {
      type: String,
      default: "image"
    }
  },
  watch: {
    src() {
      this.loading = true;
      this.error = false;
    }
  },
  data() {
    return {
      loading: true,
      error: false
    };
  },
  methods: {
    onLoad(event) {
      this.loading = false;
      this.$emit("load", event);
    },

    onLazyLoaded({ el }) {
      if (el === this.$refs.image && this.loading) {
        this.onLoad();
      }
    },

    onLazyLoadError({ el }) {
      if (el === this.$refs.image && !this.error) {
        this.onError();
      }
    },

    onError(event) {
      this.error = true;
      this.loading = false;
      this.$emit("error", event);
    },

    onClick(event) {
      this.$emit("click", event);
    }
  },
  beforeDestroy() {
    const { $Lazyload } = this;

    if ($Lazyload) {
      $Lazyload.$off("loaded", this.onLazyLoaded);
      $Lazyload.$off("error", this.onLazyLoadError);
    }
  },
  created() {
    const { $Lazyload } = this;

    if ($Lazyload && inBrowser) {
      $Lazyload.$on("loaded", this.onLazyLoaded);
      $Lazyload.$on("error", this.onLazyLoadError);
    }
  },
  computed: {
    style() {
      const style = {};

      if (isDef(this.width)) {
        style.width = addUnit(this.width);
      }

      if (isDef(this.height)) {
        style.height = addUnit(this.height);
      }

      if (isDef(this.radius)) {
        style.overflow = "hidden";
        style.borderRadius = addUnit(this.radius);
      }

      return style;
    }
  }
});
</script>
