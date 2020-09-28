<template>
  <div :class="b()">
    <ul
      :class="[b('security'), { ['vm-hairline-surround']: !gutter }]"
      @touchstart.stop="onTouchstart"
    >
      <li v-for="(item, i) in length" :key="i" :class="{ ['vm-hairline-left']: i !== 0 && !gutter }"
          :style="i !== 0 && gutter?{marginLeft: addUnits(gutter)}:{}">
        <i v-if="mask" :style="{ visibility: value[i] ? 'visible' : 'hidden' }"/>
        <span v-else>{{value[i]}}</span>
        <div v-if="focused && i === value.length" :class="b('cursor')"/>
      </li>
    </ul>
    <div v-if="info && !errorInfo" :class="b('info')">
      {{info}}
    </div>
    <div v-if="errorInfo" :class="b('error-info')">
      {{errorInfo}}
    </div>
  </div>
</template>
<script>
  import create from '../utils/create-basic';
  import {addUnit} from '../utils/format/unit';

  export default create({
    name: 'password-input',
    data() {
      return {};
    },
    props: {
      info: String,
      gutter: [Number, String],
      focused: Boolean,
      errorInfo: String,
      mask: {
        type: Boolean,
        default: true,
      },
      value: {
        type: String,
        default: '',
      },
      length: {
        type: [Number, String],
        default: 6,
      },
    },
    computed: {},
    mounted() {
    },
    methods: {
      addUnits(val) {
        return addUnit(val);
      },
      onTouchstart() {
        this.$emit('focus');
      },
    }
  });
</script>
