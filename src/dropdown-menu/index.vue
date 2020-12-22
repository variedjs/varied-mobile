<template>
  <div :class="b()">
    <div ref="bar" :style="barStyle" :class="b('bar', { opened })">
      <div
        v-for="(item, index) in children"
        :key="index"
        role="button"
        :tabindex="item.disabled ? -1 : 0"
        :class="b('item', { disabled: item.disabled })"
        @click="onClick(item, index)"
      >
        <span
          :class="[
            b('title', {
              active: item.showPopup,
              down: item.showPopup === (direction === 'down')
            }),
            item.titleClass
          ]"
          :style="{ color: item.showPopup ? activeColor : '' }"
        >
          <div class="vm-ellipsis">
            <slot name="title">
              {{ item.displayTitle }}
            </slot>
          </div>
        </span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import create from "../utils/create";
import Scroll from "../utils/dom/scroll";
import { isDef } from "../utils";

// Mixins
import { ParentMixin } from "../mixins/relation";
import { ClickOutsideMixin } from "../mixins/click-outside";

export default create({
  name: "dropdown-menu",
  mixins: [
    ParentMixin("vmDropdownMenu"),
    ClickOutsideMixin({
      event: "click",
      method: "onClickOutside"
    })
  ],
  props: {
    zIndex: [Number, String],
    activeColor: String,
    overlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.2
    },
    direction: {
      type: String,
      default: "down"
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      offset: 0
    };
  },

  computed: {
    scroller() {
      return Scroll.getScrollEventTarget(this.$el);
    },

    opened() {
      return this.children.some(item => item.showWrapper);
    },

    barStyle() {
      if (this.opened && isDef(this.zIndex)) {
        return {
          zIndex: 1 + this.zIndex
        };
      }
    }
  },

  methods: {
    onClick(item, index) {
      if (!item.disabled) {
        this.toggleItem(index);
      }
    },
    updateOffset() {
      if (!this.$refs.bar) {
        return;
      }

      const rect = this.$refs.bar.getBoundingClientRect();

      if (this.direction === "down") {
        this.offset = rect.bottom;
      } else {
        this.offset = window.innerHeight - rect.top;
      }
    },

    toggleItem(active) {
      this.children.forEach((item, index) => {
        if (index === active) {
          item.toggle();
        } else {
          item.toggle(false, { immediate: true });
        }
      });
    },

    onClickOutside() {
      this.children.forEach(item => {
        item.toggle(false);
      });
    }
  }
});
</script>
