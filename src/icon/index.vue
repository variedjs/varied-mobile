<template>
  <i
    :class="b([name], classPrefix)"
    :style="style"
    v-on="$listeners"
  >
    <vm-info :info="info"/>
  </i>
</template>
<script>
  import Info from '../info';
  import create from '../utils/create-basic';
  import {addUnit} from '../utils/format/unit';

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
    },
    computed: {
      style() {
        const {size, color} = this;
        const fontSize = addUnit(size);
        return {
          fontSize,
          color
        }
      }
    }
  });
</script>
