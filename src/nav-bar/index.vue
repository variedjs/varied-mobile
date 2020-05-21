<template>
  <div :style="{height: height + 'px'}">
    <div
      ref="navBar"
      :class="[b({ fixed }), { 'vm-hairline-bottom': border }]"
      :style="style"
    >
      <div
        :class="b('action')"
        @click="$emit('click-left')"
      >
        <slot name="left">
          <icon
            v-if="leftArrow"
            :class="b('angle-left')"
            name="angle-left"
          />
          <span
            v-if="leftText"
            v-text="leftText"
          />
        </slot>
      </div>
      <div
        :class="b('title')"
        class="vm-ellipsis"
      >
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        :class="b('action')"
        @click="$emit('click-right')"
      >
        <slot name="right">
        <span
          v-if="rightText"
          v-text="rightText"
        />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import create from '../utils/create';

  export default create({
    name: 'nav-bar',

    props: {
      title: String,
      fixed: Boolean,
      leftText: String,
      rightText: String,
      leftArrow: Boolean,
      border: {
        type: Boolean,
        default: true
      },
      zIndex: {
        type: Number,
        default: 1
      },
      backgroundColor: {
        type: String,
        default: '#FFFFFF'
      },
      color: {
        type: String,
        default: '#000000'
      },
    },

    data() {
      return {
        height: null
      }
    },

    mounted() {
      if (this.fixed) {
        this.height = this.$refs.navBar.getBoundingClientRect().height;
      }
    },

    computed: {
      style() {
        return {
          zIndex: this.zIndex,
          backgroundColor: this.backgroundColor,
          color: this.color,
        };
      }
    }
  });
</script>
