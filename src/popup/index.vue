<template>
  <transition
    :name="currentTransition"
    @after-enter="onOpened"
    @after-leave="onClosed"
  >
    <div
      v-if="shouldRender"
      v-show="value"
      :class="b({ round, [position]: position })"
      @click="onClick"
    >
      <slot />
      <Icon
        v-if="closeable"
        role="button"
        tabindex="0"
        :name="closeIcon"
        :class="b('close-icon', closeIconPosition)"
        @click="close"
      />
    </div>
  </transition>
</template>

<script>
import create from "../utils/create";
import Popup from "../mixins/popup";
import Icon from "../icon";

export default create({
  components: { Icon },
  name: "popup",
  mixins: [Popup],
  props: {
    round: Boolean,
    duration: [Number, String],
    closeable: Boolean,
    closeIcon: {
      type: String,
      default: "close"
    },
    closeIconPosition: {
      type: String,
      default: "top-right"
    },
    position: String,
    transition: String,
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentTransition() {
      return (
        this.transition ||
        (this.position ? `popup-slide-${this.position}` : "vm-fade")
      );
    }
  }
});
</script>
