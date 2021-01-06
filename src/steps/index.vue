<template>
  <div :class="b([direction])">
    <div :class="b('items')">
      <slot />
    </div>
  </div>
</template>
<script>
import create from "../utils/create";
import { ParentMixin } from "../mixins/relation";

export default create({
  mixins: [ParentMixin("vmSteps")],
  name: "steps",
  props: {
    activeColor: String,
    inactiveIcon: String,
    inactiveColor: String,
    active: {
      type: [Number, String],
      default: 0
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    activeIcon: {
      type: String,
      default: "check-circle"
    }
  }
});
</script>
