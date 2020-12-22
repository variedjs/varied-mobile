<template>
  <div>
    <div
      v-show="showWrapper"
      ref="wrapper"
      :style="style"
      :class="b([parents.direction])"
      @click="onClickWrapper"
    >
      <Popup
        v-model="showPopup"
        :overlay="parents.overlay"
        :class="b('content')"
        :position="parents.direction === 'down' ? 'top' : 'bottom'"
        :duration="transition ? parents.duration : 0"
        :lazyRender="lazyRender"
        :overlayStyle="{ position: 'absolute' }"
        :closeOnClickOverlay="parents.closeOnClickOverlay"
        @open="onOpen('open')"
        @opened="onOpen('opened')"
        @close="onOpen('close')"
        @closed="onOpen('closed')"
      >
        <Cell
          v-for="option in options"
          clickable
          :key="option.value"
          :icon="option.icon"
          :title="option.text"
          :class="b('option', { active: option.value === value })"
          :style="{ color: option.value === value ? parents.activeColor : '' }"
          @click="onClick(option)"
        >
          <Icon
            v-if="option.value === value"
            :class="b('icon')"
            :color="parents.activeColor"
            name="check"
          />
        </Cell>
        <slot></slot>
      </Popup>
    </div>
  </div>
</template>
<script>
import create from "../utils/create";
import { on, off } from "../utils/dom/event";

// Mixins
import { PortalMixin } from "../mixins/portal";
import { ChildrenMixin } from "../mixins/relation";

// Components
import Cell from "../cell";
import Icon from "../icon";
import Popup from "../popup";
export default create({
  components: { Cell, Icon, Popup },
  name: "dropdown-item",
  mixins: [PortalMixin({ ref: "wrapper" }), ChildrenMixin("vmDropdownMenu")],
  props: {
    value: null,
    title: String,
    disabled: Boolean,
    titleClass: String,
    options: {
      type: Array,
      default: () => []
    },
    lazyRender: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false
    };
  },

  computed: {
    style() {
      const { zIndex, offset, direction } = this.parents;
      const style = { zIndex };
      if (direction === "down") {
        style.top = `${offset}px`;
      } else {
        style.bottom = `${offset}px`;
      }
      return style;
    },
    displayTitle() {
      if (this.title) {
        return this.title;
      }

      const match = this.options.filter(option => option.value === this.value);
      return match.length ? match[0].text : "";
    }
  },

  watch: {
    showPopup(val) {
      this.bindScroll(val);
    }
  },

  methods: {
    onClick(option) {
      this.showPopup = false;

      if (option.value !== this.value) {
        this.$emit("input", option.value);
        this.$emit("change", option.value);
      }
    },
    onOpen(name) {
      if (name === "closed") {
        this.showWrapper = false;
      }
      this.$emit(name);
    },
    // @exposed-api
    toggle(show = !this.showPopup, options = {}) {
      if (show === this.showPopup) {
        return;
      }

      this.transition = !options.immediate;
      this.showPopup = show;

      if (show) {
        this.parents.updateOffset();
        this.showWrapper = true;
      }
    },

    bindScroll(bind) {
      const { scroller } = this.parents;
      const action = bind ? on : off;
      action(scroller, "scroll", this.onScroll, true);
    },

    onScroll() {
      this.parents.updateOffset();
    },

    onClickWrapper(event) {
      // prevent being identified as clicking outside and closed when use get-contaienr
      if (this.getContainer) {
        event.stopPropagation();
      }
    }
  }
});
</script>
