<template>
  <Popup
    round
    :class="b()"
    :value="value"
    position="bottom"
    :overlay="overlay"
    :duration="duration"
    :lazyRender="lazyRender"
    :lockScroll="lockScroll"
    :getContainer="getContainer"
    :closeOnPopstate="closeOnPopstate"
    :closeOnClickOverlay="closeOnClickOverlay"
    :safeAreaInsetBottom="safeAreaInsetBottom"
    @input="toggle"
    @click-overlay="onClickOverlay"
  >
    <div :class="b('header')">
      <slot name="title">
        <h2 v-if="title" :class="b('title')">
          {{ title }}
        </h2>
      </slot>
      <slot name="description">
        <span v-if="description" :class="b('description')">
          {{ description }}
        </span>
      </slot>
    </div>
    <div
      v-for="(multiOption, index) in multiOptions"
      :class="b('options')"
      :key="`multiOption-${index}`"
    >
      <div
        v-for="(option, oIndex) in multiOption"
        role="button"
        tabindex="0"
        :key="`option-${oIndex}`"
        :class="[b('option'), option.className]"
        @click="onSelect(option, oIndex)"
      >
        <img :src="getIconURL(option.icon)" :class="b('icon')" />
        <span v-if="option.name" :class="b('name')">{{ option.name }}</span>
        <span v-if="option.description" :class="b('option-description')">
          {{ option.description }}
        </span>
      </div>
    </div>
    <button
      v-if="cancelText"
      type="button"
      :class="b('cancel')"
      @click="onCancel"
    >
      {{ cancelText }}
    </button>
  </Popup>
</template>
<script>
import create from "../utils/create";

// Mixins
import popupMixin from "../mixins/popup";

// Components
import Popup from "../popup";

const PRESET_ICONS = [
  "qq",
  "link",
  "weibo",
  "wechat",
  "poster",
  "qrcode",
  "weapp-qrcode"
];
export default create({
  components: { Popup },
  name: "share-sheet",
  props: {
    ...popupMixin.props,
    duration: [Number, String],
    title: String,
    cancelText: { type: String, default: "取消" },
    description: String,
    getContainer: [String, Function],
    options: {
      type: Array,
      default: () => []
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onCancel() {
      this.toggle(false);
      this.$emit("cancel");
    },
    onSelect(option, index) {
      this.$emit("select", option, index);
    },
    toggle(val) {
      this.$emit("input", val);
    },
    getIconURL(icon) {
      if (PRESET_ICONS.indexOf(icon) !== -1) {
        return `https://wuner.gitee.io/static-resources/varied-mobile/static/share-icon-${icon}.png`;
      }
      return icon;
    },
    onClickOverlay() {
      this.$emit("click-overlay");
    }
  },
  computed: {
    multiOptions() {
      return Array.isArray(this.options[0]) ? this.options : [this.options];
    }
  }
});
</script>
