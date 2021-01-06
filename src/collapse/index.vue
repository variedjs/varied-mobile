<template>
  <div :class="[b(), { 'vm-hairline-top-bottom': border }]">
    <slot />
  </div>
</template>

<script>
import create from "../utils/create";
import { ParentMixin } from "../mixins/relation";

export default create({
  name: "collapse",
  mixins: [ParentMixin("vmCollapse")],

  props: {
    accordion: Boolean,
    value: [String, Number, Array],
    border: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      items: []
    };
  },

  methods: {
    switch(name, expanded) {
      if (!this.accordion) {
        name = expanded
          ? this.value.concat(name)
          : this.value.filter(activeName => activeName !== name);
      }
      this.$emit("change", name);
      this.$emit("input", name);
    }
  }
});
</script>
