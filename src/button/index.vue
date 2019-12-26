<template>
  <component
    :is="tag"
    :class="b([{loading,block,disabled}, size, radius])"
    :disabled="disabled"
    @click="onClick"
  >
    <template v-if="loading">
      <icon
        name="spinner"
        class="vm-icon-spin"
      />
      <span>{{ loadingText }}</span>
    </template>
    <slot v-else>{{ text }}</slot>
  </component>
</template>
<script>
  import create from '../utils/create';

  export default create({
    name: 'button',
    props: {
      tag: {
        type: String,
        default: 'button'
      },
      radius: {
        type: String,
        default: 'nc'
      },
      size: {
        type: String,
        default: 'md'
      },
      icon: String,
      block: Boolean,
      plain: Boolean,
      loading: Boolean,
      loadingText: String,
      text: String,
      disabled: Boolean
    },
    methods: {
      onClick(event) {
        if (!this.loading && !this.disabled) {
          this.$emit('click', event);
        }
      }
    }
  });
</script>
