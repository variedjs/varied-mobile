<template>
  <div :class="[b({ square: parents.square })]" :style="style">
    <div
      :style="contentStyle"
      :role="parents.clickable ? 'button' : null"
      :tabindex="parents.clickable ? 0 : null"
      :class="[
        b('content', [
          parents.direction,
          {
            center: parents.center,
            square: parents.square,
            clickable: parents.clickable,
            surround: parents.border && parents.gutter
          }
        ]),
        { ['vm-hairline']: parents.border }
      ]"
      @click="onClick"
    >
      <slot>
        <div v-if="$slots['icon']" :class="b('icon-wrapper')">
          <slot name="icon" />
          <Info :dot="dot" :info="badge" />
        </div>
        <Icon
          v-if="icon"
          :name="icon"
          :dot="dot"
          :badge="badge"
          :size="parents.iconSize"
          :class="b('icon')"
          :classPrefix="iconPrefix"
        />
        <slot name="text">
          <span v-if="text" :class="b('text')">{{ text }}</span>
        </slot>
      </slot>
    </div>
  </div>
</template>
<script>
import create from "../utils/create";
import { addUnit } from "../utils/format/unit";
import { route, routeProps } from "../utils/router";

// Mixins
import { ChildrenMixin } from "../mixins/relation";

// Components
import Info from "../info";
import Icon from "../icon";

export default create({
  components: { Info, Icon },
  mixins: [ChildrenMixin("vmGrid")],
  name: "grid-item",
  props: {
    ...routeProps,
    dot: Boolean,
    text: String,
    icon: String,
    iconPrefix: String,
    badge: [Number, String]
  },
  computed: {
    style() {
      const { square, gutter, columnNum } = this.parents;
      const percent = `${100 / columnNum}%`;

      const style = {
        flexBasis: percent
      };

      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        const gutterValue = addUnit(gutter);
        style.paddingRight = gutterValue;

        if (this.index >= columnNum) {
          style.marginTop = gutterValue;
        }
      }

      return style;
    },

    contentStyle() {
      const { square, gutter } = this.parents;

      if (square && gutter) {
        const gutterValue = addUnit(gutter);

        return {
          right: gutterValue,
          bottom: gutterValue,
          height: "auto"
        };
      }
    }
  },

  methods: {
    onClick(event) {
      this.$emit("click", event);
      route(this.$router, this);
    }
  }
});
</script>
