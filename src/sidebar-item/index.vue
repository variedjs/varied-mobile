<template>
  <a
    :class="b({ select: this.select, disabled: this.disabled })"
    @click="onClick"
  >
    <div :class="b('text')">
      <slot name="title">
        {{ title }}
      </slot>
      <Info :dot="dot" :info="badge" :class="b('info')" />
    </div>
  </a>
</template>
<script>
import create from "../utils/create";
import { ChildrenMixin } from "../mixins/relation";
import Info from "../info";
import { route, routeProps } from "../utils/router";
export default create({
  components: { Info },
  name: "sidebar-item",
  mixins: [ChildrenMixin("vmSidebar")],
  props: {
    ...routeProps,
    dot: Boolean,
    badge: [Number, String],
    title: String,
    disabled: Boolean
  },

  computed: {
    select() {
      return this.index === +this.parents.activeKey;
    }
  },

  methods: {
    onClick() {
      if (this.disabled) {
        return;
      }

      this.$emit("click", this.index);
      this.parents.$emit("input", this.index);
      this.parents.setIndex(this.index);
      route(this.$router, this);
    }
  }
});
</script>
