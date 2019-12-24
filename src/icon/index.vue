<template>
  <i
    :class="b([name], classPrefix)"
    :style="{color,fontSize: size}"
    v-on="$listeners"
  >
    <vm-info :info="info" />
  </i>
</template>
<script>
import Info from '../info';
import create from '../utils/create-basic';

export default create({
  name: 'icon',
  components: {
    [Info.name]: Info
  },
  props: {
    name: String,
    size: [String, Number],
    info: [String, Number],
    classPrefix: {
      type: String,
      default: 'vm-icon'
    },
    color: {
      type: String
    }
  }
});
</script>
