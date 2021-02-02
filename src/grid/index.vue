<template>
  <div
    :style="style"
    :class="[b(), { ['vm-hairline-top']: border && !gutter }]"
  >
    <slot />
  </div>
</template>
<script>
import create from "../utils/create";
import { addUnit } from "../utils/format/unit";
import { ParentMixin } from "../mixins/relation";

export default create({
  mixins: [ParentMixin("vmGrid")],
  name: "grid",
  props: {
    square: Boolean,
    gutter: [Number, String],
    iconSize: [Number, String],
    direction: String,
    clickable: Boolean,
    columnNum: {
      type: [Number, String],
      default: 4
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    style() {
      const { gutter } = this;

      if (gutter) {
        return {
          paddingLeft: addUnit(gutter)
        };
      }
    }
  }
});
</script>
