<template>
  <div :class="[b(), { 'vm-hairline-top': index }]">
    <cell
      v-bind="$props"
      :class="b('title', { disabled, expanded })"
      @click="onClick"
      :arrow-direction="show ? 'up' : 'down'"
    >
      <slot name="title" v-slot:title />
      <slot name="icon" v-slot:icon />
      <slot name="value" />
      <slot name="right-icon" v-slot:right-icon />
    </cell>
    <div
      v-if="inited"
      v-show="show"
      ref="wrapper"
      :class="b('wrapper')"
      @transitionend="onTransitionEnd"
    >
      <div ref="content" :class="b('content')">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { raf } from "../utils/dom/raf";
import create from "../utils/create";
import CellMixin from "../mixins/cell";
import { ChildrenMixin } from "../mixins/relation";

// Components
import Cell from "../cell";

export default create({
  components: { Cell },
  name: "collapse-item",

  mixins: [CellMixin, ChildrenMixin("vmCollapse")],

  props: {
    name: [String, Number],
    disabled: Boolean,
    isLink: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      show: null,
      inited: null
    };
  },

  computed: {
    items() {
      return this.parent.items;
    },

    index() {
      return this.items.indexOf(this);
    },

    currentName() {
      return this.isDef(this.name) ? this.name : this.index;
    },

    expanded() {
      if (!this.parent) {
        return null;
      }

      const { value } = this.parent;
      return this.parent.accordion
        ? value === this.currentName
        : value.some(name => name === this.currentName);
    }
  },

  created() {
    this.findParent("vm-collapse");
    this.items.push(this);
    this.show = this.expanded;
    this.inited = this.expanded;
  },

  destroyed() {
    this.items.splice(this.index, 1);
  },

  watch: {
    expanded(expanded, prev) {
      if (prev === null) {
        return;
      }

      if (expanded) {
        this.show = true;
        this.inited = true;
      }

      this.$nextTick(() => {
        const { content, wrapper } = this.$refs;
        if (!content || !wrapper) {
          return;
        }

        const contentHeight = `${content.clientHeight}px`;
        wrapper.style.height = expanded ? 0 : contentHeight;
        raf(() => {
          wrapper.style.height = expanded ? contentHeight : 0;
        });
      });
    }
  },

  methods: {
    onClick() {
      if (this.disabled) {
        return;
      }

      const { parent } = this;
      const name =
        parent.accordion && this.currentName === parent.value
          ? ""
          : this.currentName;
      const expanded = !this.expanded;
      this.parent.switch(name, expanded);
    },

    onTransitionEnd() {
      if (!this.expanded) {
        this.show = false;
      } else {
        this.$refs.wrapper.style.height = null;
      }
    }
  }
});
</script>
