<template>
  <component
    :is="tag"
    :class="[classPrefix, isImage(name) ? '' : `${classPrefix}-${name}`]"
    :style="style"
    v-on="$listeners"
  >
    <slot></slot>
    <img v-if="isImage(name)" :class="b('image')" :src="name" />
    <vm-info :dot="dot" :info="badge || info" />
  </component>
</template>
<script>
import Info from "../info";
import create from "../utils/create-basic";
import { addUnit } from "../utils/format/unit";

export default create({
  name: "icon",
  components: {
    [Info.name]: Info
  },
  props: {
    dot: Boolean,
    badge: [Number, String],
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    size: [String, Number],
    info: [String, Number],
    classPrefix: {
      type: String,
      default: "vm-icon"
    },
    color: {
      type: String
    }
  },
  methods: {
    isImage(name) {
      return name ? name.indexOf("/") !== -1 : false;
    }
  },
  computed: {
    style() {
      const { size, color } = this;
      const fontSize = addUnit(size);
      return {
        fontSize,
        color
      };
    }
  }
});
</script>
