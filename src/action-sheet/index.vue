<template>
  <Popup
    :class="b()"
    position="bottom"
    :round="round"
    :value="value"
    :overlay="overlay"
    :duration="duration"
    :lazyRender="lazyRender"
    :lockScroll="lockScroll"
    :getContainer="getContainer"
    :closeOnPopstate="closeOnPopstate"
    :closeOnClickOverlay="closeOnClickOverlay"
    :safeAreaInsetBottom="safeAreaInsetBottom"
    @input="togglePopup"
    @open="onOpen('open')"
    @opened="onOpen('opened')"
    @close="onOpen('close')"
    @closed="onOpen('closed')"
  >
    <div v-if="title" :class="b('header')">
      {{ title }}
      <Icon
        v-if="closeable"
        :name="closeIcon"
        :class="b('close')"
        @click="onCancel"
      />
    </div>
    <div v-if="$slots.description || description" :class="b('description')">
      <slot name="description">
        {{ description }}
      </slot>
    </div>
    <div :class="b('content')">
      <button
        v-if="actions"
        v-for="(item, index) in actions"
        :key="index"
        type="button"
        :class="[
          b('item', { disabled: item.disabled, loading: item.loading }),
          item.className
        ]"
        :style="{ color: item.color }"
        @click="onClickOption($event, item, index)"
      >
        <Loading v-if="item.loading" :class="b('loading-icon')" />
        <template v-else>
          <span :class="b('name')">{{ item.name }}</span>
          <div v-if="item.subname" :class="b('subname')">
            {{ item.subname }}
          </div>
        </template>
      </button>
      <slot></slot>
    </div>
    <template v-if="cancelText">
      <div :class="b('gap')" />
      <button type="button" :class="b('cancel')" @click="onCancel">
        {{ cancelText }}
      </button>
    </template>
  </Popup>
</template>
<script>
import create from "../utils/create";

// Mixins
import popupMixin from "../mixins/popup";

// Components
import Icon from "../icon";
import Popup from "../popup";
import Loading from "../loading";

export default create({
  components: { Icon, Popup, Loading },
  name: "action-sheet",
  props: {
    ...popupMixin.props,
    title: String,
    actions: Array,
    duration: [Number, String],
    cancelText: String,
    description: String,
    getContainer: [String, Function],
    closeOnPopstate: Boolean,
    closeOnClickAction: Boolean,
    round: {
      type: Boolean,
      default: true
    },
    closeable: {
      type: Boolean,
      default: true
    },
    closeIcon: {
      type: String,
      default: "close"
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    togglePopup(val) {
      this.$emit("input", val);
    },
    onOpen(name) {
      this.$emit(name);
    },
    onCancel() {
      this.$emit("input", false);
      this.$emit("cancel");
    },
    onClickOption(event, item, index) {
      event.stopPropagation();
      const { disabled, callback, loading } = item;
      if (disabled || loading) {
        return;
      }

      if (callback) {
        callback(item);
      }

      this.$emit("select", item, index);

      if (this.closeOnClickAction) {
        this.$emit("input", false);
      }
    }
  }
});
</script>
