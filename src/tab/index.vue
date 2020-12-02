<template>
  <div :class="b()">
    <div
      v-if="parents.animated"
      role="tabpanel"
      :aria-hidden="!isActive"
      :class="b('pane-wrapper', { inactive: !isActive })"
    >
      <div :class="b('pane')">
        <slot v-if="shouldRender" />
      </div>
    </div>
    <div
      v-else
      v-show="parents.scrollspy || isActive"
      role="tabpanel"
      :class="b('pane')"
    >
      <slot v-if="shouldRender" />
    </div>
  </div>
</template>

<script>
import create from "../utils/create";
import { ChildrenMixin } from "../mixins/relation";
import { routeProps } from "../utils/router";

export default create({
  name: "tab",
  mixins: [ChildrenMixin("vmTabs")],
  props: {
    ...routeProps,
    dot: Boolean,
    name: [Number, String],
    info: [Number, String],
    badge: [Number, String],
    title: String,
    titleStyle: null,
    disabled: Boolean
  },
  watch: {
    title() {
      this.parents.setLine();
    },

    inited(val) {
      if (this.parents.lazyRender && val) {
        this.$nextTick(() => {
          this.parents.$emit("rendered", this.computedName, this.title);
        });
      }
    }
  },
  data() {
    return {
      inited: false
    };
  },
  computed: {
    shouldRender() {
      return this.inited || this.parents.scrollspy || !this.parents.lazyRender;
    },

    computedName() {
      return this.name || this.index;
    },

    isActive() {
      const active = this.computedName === this.parents.currentName;

      if (active) {
        this.inited = true;
      }
      return active;
    }
  }
});
</script>
