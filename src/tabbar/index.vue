<template>
  <div>
    <div
      v-if="placeholder && fixed"
      :class="b('placeholder')"
      :style="{ height: `${height}px` }"
    >
      <div
        ref="tabbar"
        :style="{ zIndex: zIndex }"
        :class="[
          { ['vm-hairline--top-bottom']: border },
          b({
            unfit: !fit,
            fixed: fixed
          })
        ]"
      >
        <slot />
      </div>
    </div>
    <div
      v-else
      ref="tabbar"
      :style="{ zIndex: zIndex }"
      :class="[
        { ['vm-hairline--top-bottom']: border },
        b({
          unfit: !fit,
          fixed: fixed
        })
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import create from "../utils/create";
import { callInterceptor } from "../utils/interceptor";
import { ParentMixin } from "../mixins/relation";

export default create({
  name: "tabbar",
  mixins: [ParentMixin("vmTabbar")],
  data() {
    return {
      height: null
    };
  },

  props: {
    route: Boolean,
    zIndex: [Number, String],
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    value: {
      type: [Number, String],
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: null
    }
  },

  mounted() {
    if (this.placeholder && this.fixed) {
      this.height = this.$refs.tabbar.getBoundingClientRect().height;
    }
  },

  computed: {
    fit() {
      if (this.safeAreaInsetBottom !== null) {
        return this.safeAreaInsetBottom;
      }
      // enable safe-area-inset-bottom by default when fixed
      return this.fixed;
    }
  },

  watch: {
    value: "setActiveItem",
    children: "setActiveItem"
  },

  methods: {
    setActiveItem() {
      this.children.forEach((item, index) => {
        item.active = (item.name || index) === this.value;
      });
    },

    onChange(active) {
      if (active !== this.value) {
        callInterceptor({
          interceptor: this.beforeChange,
          args: [active],
          done: () => {
            this.$emit("input", active);
            this.$emit("change", active);
          }
        });
      }
    }
  }
});
</script>
