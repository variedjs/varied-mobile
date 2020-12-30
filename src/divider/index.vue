<template>
  <div
    role="separator"
    :style="{ borderColor }"
    :class="
      b({
        dashed,
        hairline,
        [`content-${contentPosition}`]: $slots.default
      })
    "
    v-on="$listeners"
  >
    <slot></slot>
  </div>
</template>
<script>
import create from "../utils/create";

export default create({
  name: "divider",
  props: {
    dashed: Boolean,
    hairline: {
      type: Boolean,
      default: true
    },
    borderColor: String,
    contentPosition: {
      type: String,
      default: "center"
    }
  }
});
</script>
