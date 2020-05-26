<template>
  <div :class="b(direction)">
    <slot/>
  </div>
</template>

<script>
  import create from '../utils/create';

  export default create({
    name: 'checkbox-group',

    props: {
      max: Number,
      value: Array,
      disabled: Boolean,
      direction: String,
      iconSize: [Number, String],
      checkedColor: String,
    },

    watch: {
      value(val) {
        this.$emit('change', val);
      }
    },
    methods: {
      toggleAll(checked) {
        if (checked === false) {
          this.$emit('input', []);
          return;
        }

        let {$children} = this;
        if (!checked) {
          $children = $children.filter((item) => !item.checked);
        }

        const names = $children.map((item) => item.name);
        this.$emit('input', names);
      },
    }
  });
</script>
