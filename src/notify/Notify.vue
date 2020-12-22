<template>
  <Popup
    :class="[b([type]), className]"
    :value="value"
    :style="style"
    position="top"
    :overlay="false"
    :duration="duration"
    :lockScroll="false"
    @open="onOpen('open')"
    @opened="onOpen('opened')"
    @close="onOpen('close')"
  >
    <slot>
      {{ message }}
    </slot>
  </Popup>
</template>
<script>
import create from "../utils/create";

// Mixins
import popupMixin from "../mixins/popup";

// Components
import Popup from "../popup";

export default create({
  components: { Popup },
  name: "notify",
  props: {
    ...popupMixin.props,
    color: String,
    message: [Number, String],
    duration: [Number, String],
    className: String,
    background: String,
    getContainer: [String, Function],
    type: {
      type: String,
      default: "danger"
    }
  },
  methods: {
    onOpen(name) {
      this.$emit(name);
    }
  },
  computed: {
    style() {
      return {
        color: this.color,
        background: this.background
      };
    }
  }
});
</script>
