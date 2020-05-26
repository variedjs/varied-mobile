<template>
  <div :class="b(direction)">
    <slot/>
  </div>
</template>

<script>
  import create from '../utils/create';

  export default create({
    name: 'radio-group',

    props: {
      value: null,
      disabled: Boolean,
      direction: String,
      checkedColor: String,
      iconSize: [Number, String],
    },

    watch: {
      value(value) {
        this.$emit('change', value);
      }
    }
  });
</script>
