<template>
  <transition :name="closeable ? 'van-fade' : null">
    <span
      key="content"
      :style="style"
      :class="b([classes, type])"
      @click="onClick"
    >
      <slot></slot>
      <Icon
        v-if="closeable"
        name="close"
        :class="b('close')"
        @click="onClose"
      />
    </span>
  </transition>
</template>
<script>
import create from "../utils/create";

// Components
import Icon from "../icon";

export default create({
  components: { Icon },
  name: "tag",
  props: {
    size: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean,
    type: {
      type: String,
      default: "default"
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    onClose(event) {
      event.stopPropagation();
      this.$emit("close");
    }
  },
  computed: {
    style() {
      const { plain, color } = this;
      const key = plain ? "color" : "backgroundColor";
      const style = { [key]: color };

      if (this.textColor) {
        style.color = this.textColor;
      }
      return style;
    },
    classes() {
      const { mark, plain, round, size } = this;
      const classes = { mark, plain, round };
      if (size) {
        classes[size] = size;
      }
      return classes;
    }
  }
});
</script>
