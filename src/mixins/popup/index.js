// Context
import { context } from "./context";
import {
  openOverlay,
  closeOverlay,
  updateOverlay,
  removeOverlay
} from "./overlay";
import scrollUtils from "../../utils/dom/scroll";
import { removeNode } from "../../utils/dom/node";
import { on, off, preventDefault } from "../../utils/dom/event";
import Touch from "../touch";
import { PortalMixin } from "../portal";
import { CloseOnPopstateMixin } from "../close-on-popstate";

export default {
  mixins: [
    Touch,
    CloseOnPopstateMixin,
    PortalMixin({
      afterPortal() {
        if (this.overlay) {
          updateOverlay();
        }
      }
    })
  ],

  props: {
    // whether to show popup
    value: Boolean,
    // whether to show overlay
    overlay: Boolean,
    // overlay custom style
    overlayStyle: Object,
    // overlay custom class name
    overlayClass: String,
    // whether to close popup when click overlay
    closeOnClickOverlay: Boolean,
    // z-index
    zIndex: [String, Number],
    // return the mount node for popup
    getContainer: [String, Function],
    // prevent body scroll
    lockScroll: {
      type: Boolean,
      default: true
    },
    // whether to lazy render
    lazyRender: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      inited: this.value
    };
  },

  computed: {
    shouldRender() {
      return this.inited || !this.lazyRender;
    }
  },

  watch: {
    value(val) {
      const type = val ? "open" : "close";
      this.inited = this.inited || this.value;
      this[type]();
      this.$emit(type);
    },

    overlay() {
      this.renderOverlay();
    }
  },

  mounted() {
    if (this.value) {
      this.open();
    }
  },

  activated() {
    /* istanbul ignore next */
    if (this.shouldReopen) {
      this.$emit("input", true);
      this.shouldReopen = false;
    }
  },

  beforeCreate() {
    const createEmitter = eventName => event => this.$emit(eventName, event);

    this.onClick = createEmitter("click");
    this.onOpened = createEmitter("opened");
    this.onClosed = createEmitter("closed");
  },

  beforeDestroy() {
    removeOverlay(this);

    if (this.opened) {
      this.removeLock();
    }

    if (this.getContainer) {
      removeNode(this.$el);
    }
  },

  deactivated() {
    /* istanbul ignore next */
    if (this.value) {
      this.close();
      this.shouldReopen = true;
    }
  },

  methods: {
    addLock() {
      if (this.lockScroll) {
        on(document, "touchstart", this.touchStart);
        on(document, "touchmove", this.onTouchMove);

        if (!context.lockCount) {
          document.body.classList.add("van-overflow-hidden");
        }
        context.lockCount++;
      }
    },
    removeLock() {
      if (this.lockScroll && context.lockCount) {
        context.lockCount--;
        off(document, "touchstart", this.touchStart);
        off(document, "touchmove", this.onTouchMove);

        if (!context.lockCount) {
          document.body.classList.remove("van-overflow-hidden");
        }
      }
    },
    open() {
      /* istanbul ignore next */
      if (this.$isServer || this.opened) {
        return;
      }

      // cover default zIndex
      if (this.zIndex !== undefined) {
        context.zIndex = this.zIndex;
      }

      this.opened = true;
      this.renderOverlay();
      this.addLock();
    },

    close() {
      if (!this.opened) {
        return;
      }

      closeOverlay(this);
      this.opened = false;
      this.removeLock();
      this.$emit("input", false);
    },

    onTouchMove(event) {
      this.touchMove(event);
      const direction = this.deltaY > 0 ? "10" : "01";
      const el = scrollUtils.getScrollEventTarget(event.target, this.$el);
      const { scrollHeight, offsetHeight, scrollTop } = el;
      let status = "11";

      /* istanbul ignore next */
      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? "00" : "01";
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = "10";
      }

      /* istanbul ignore next */
      if (
        status !== "11" &&
        this.direction === "vertical" &&
        !(parseInt(status, 2) & parseInt(direction, 2))
      ) {
        preventDefault(event, true);
      }
    },

    renderOverlay() {
      if (this.$isServer || !this.value) {
        return;
      }

      this.$nextTick(() => {
        this.updateZIndex(this.overlay ? 1 : 0);

        if (this.overlay) {
          openOverlay(this, {
            zIndex: context.zIndex++,
            duration: this.duration,
            className: this.overlayClass,
            customStyle: this.overlayStyle
          });
        } else {
          closeOverlay(this);
        }
      });
    },

    updateZIndex(value = 0) {
      this.$el.style.zIndex = ++context.zIndex + value;
    }
  }
};
