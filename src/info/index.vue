<template>
  <div v-if="dot || isDef(info)" v-text="info" :class="b({ dot })" />
</template>

<script>
import create from "../utils/create-basic";

import { isDef } from "../utils";

export default create({
  name: "info",

  props: {
    dot: Boolean,
    info: [String, Number]
  },
  methods: { isDef }
});
</script>
