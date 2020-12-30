<template>
  <span ref="wrapper" :class="b('wrapper')" @click="onClickWrapper">
    <Popup
      ref="popover"
      :value="value"
      :class="b([theme])"
      :overlay="overlay"
      :position="null"
      transition="vm-popover-zoom"
      :lockScroll="false"
      :getContainer="getContainer"
      @open="onOpen"
      @close="onClose"
      @input="onToggle"
      @opened="onOpened"
      @closed="onClosed"
      @touchstart.native="onTouchstart"
    >
      <div :class="b('arrow')" />
      <div :class="b('content')" role="menu">
        <slot>
          <div
            v-for="(action, index) in actions"
            :key="`action-${index}`"
            role="menuitem"
            :class="[
              b('action', {
                disabled: action.disabled,
                'with-icon': action.icon
              }),
              action.className
            ]"
            @click="onClickAction(action, index)"
          >
            <Icon
              v-if="action.icon"
              :name="action.icon"
              :class="b('action-icon')"
            />
            <div :class="[b('action-text'), 'vm-hairline-bottom']">
              {{ action.text }}
            </div>
          </div>
        </slot>
      </div>
    </Popup>
    <slot name="reference"></slot>
  </span>
</template>
<script>
import create from "../utils/create";
import { createPopper, offsetModifier } from "@vant/popperjs";

// Mixins
import { ClickOutsideMixin } from "../mixins/click-outside";

// Components
import Icon from "../icon";
import Popup from "../popup";

export default create({
  components: { Icon, Popup },
  name: "popover",
  mixins: [
    ClickOutsideMixin({
      event: "click",
      method: "onClickOutside"
    })
  ],

  props: {
    value: Boolean,
    trigger: String,
    overlay: Boolean,
    offset: {
      type: Array,
      default: () => [0, 8]
    },
    theme: {
      type: String,
      default: "light"
    },
    actions: {
      type: Array,
      default: () => []
    },
    placement: {
      type: String,
      default: "bottom"
    },
    getContainer: {
      type: [String, Function],
      default: "body"
    },
    closeOnClickAction: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    value: "updateLocation",
    placement: "updateLocation"
  },

  mounted() {
    this.updateLocation();
  },

  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  },

  methods: {
    createPopper() {
      return createPopper(this.$refs.wrapper, this.$refs.popover.$el, {
        placement: this.placement,
        modifiers: [
          {
            name: "computeStyles",
            options: {
              adaptive: false,
              gpuAcceleration: false
            }
          },
          {
            ...offsetModifier,
            options: {
              offset: this.offset
            }
          }
        ]
      });
    },

    updateLocation() {
      this.$nextTick(() => {
        if (!this.value) {
          return;
        }

        if (!this.popper) {
          this.popper = this.createPopper();
        } else {
          this.popper.setOptions({
            placement: this.placement
          });
        }
      });
    },
    onToggle(value) {
      this.$emit("input", value);
    },

    onClickWrapper() {
      if (this.trigger === "click") {
        this.onToggle(!this.value);
      }
    },

    onTouchstart(event) {
      event.stopPropagation();
      this.$emit("touchstart", event);
    },

    onClickAction(action, index) {
      if (action.disabled) {
        return;
      }

      this.$emit("select", action, index);

      if (this.closeOnClickAction) {
        this.$emit("input", false);
      }
    },

    onClickOutside() {
      this.$emit("input", false);
    },

    onOpen() {
      this.$emit("open");
    },

    /* istanbul ignore next */
    onOpened() {
      this.$emit("opened");
    },

    onClose() {
      this.$emit("close");
    },

    /* istanbul ignore next */
    onClosed() {
      this.$emit("closed");
    }
  }
});
</script>
