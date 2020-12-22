<template>
  <component :is="tag" v-if="$slots['default']" :class="b('wrapper')">
    <slot></slot>
    <div
      v-if="hasContent() || dot"
      :class="b({ dot, fixed: !!$slots['default'] })"
      :style="{ background: color }"
    >
      <slot name="content">
        {{ renderContent() }}
      </slot>
    </div>
  </component>
  <div
    v-else
    :class="b({ dot, fixed: !!$slots['default'] })"
    :style="{ background: color }"
  >
    <slot name="content">
      {{ renderContent() }}
    </slot>
  </div>
</template>
<script>
import create from "../utils/create";
import { isDef } from "../utils";
import { isNumeric } from "../utils/validate/number";

import Tag from "../tag";

export default create({
  components: { Tag },
  name: "badge",
  props: {
    dot: Boolean,
    max: [Number, String],
    color: String,
    content: [Number, String],
    tag: {
      type: String,
      default: "div"
    }
  },

  methods: {
    hasContent() {
      return !!(
        this.$scopedSlots.content ||
        (isDef(this.content) && this.content !== "")
      );
    },

    renderContent() {
      const { dot, max, content } = this;
      if (!dot && this.hasContent()) {
        if (isDef(max) && isNumeric(content) && +content > max) {
          return `${max}+`;
        }

        return content;
      }
    }
  }
});
</script>
