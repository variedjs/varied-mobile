<template>
  <div :style="{height: height + 'px'}">
    <div
      ref="tabbar"
      class="vm-hairline-top-bottom"
      :class="b({ fixed,'safe-area-inset-bottom': safeAreaInsetBottom})"
      :style="style"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
  import create from '../utils/create';

  export default create({
    name: 'tabbar',

    data() {
      return {
        items: [],
        height: null
      };
    },

    props: {
      route: Boolean,
      activeColor: String,
      inactiveColor: String,
      safeAreaInsetBottom: Boolean,
      placeholder: Boolean,
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
      zIndex: {
        type: Number,
        default: 1
      }
    },

    mounted() {
      if (this.placeholder) {
        this.height = this.$refs.tabbar.getBoundingClientRect().height;
      }
    },

    computed: {
      style() {
        return {
          zIndex: this.zIndex
        };
      }
    },

    watch: {
      items() {
        this.setActiveItem();
      },

      value() {
        this.setActiveItem();
      }
    },

    methods: {
      setActiveItem() {
        this.items.forEach((item, index) => {
          item.active = index === this.value;
        });
      },

      onChange(active) {
        if (active !== this.value) {
          this.$emit('input', active);
          this.$emit('change', active);
        }
      }
    }
  });
</script>
