<template>
  <div :class="[b(), { 'vm-hairline-top-bottom': border }]">
    <div
      :class="b('title')"
      v-if="title">
      {{title}}
    </div>
    <slot
      :class="b('content')"/>
  </div>
</template>

<script>
  import create from '../utils/create-basic';

  export default create({
    name: 'cell-group',

    props: {
      border: {
        type: Boolean,
        default: true
      },
      title: String,
    }
  });
</script>
