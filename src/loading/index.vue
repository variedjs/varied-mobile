<template>
  <div
    :class="b([type])"
    :style="style"
  >
    <span :class="b('container', type)">
      <i
        v-for="(item, index) in (type === 'spinner' ? 12 : 0)"
        :key="index"
      />
      <svg
        v-if="type === 'circular'"
        :class="b('circle')"
        viewBox="25 25 50 50"
      >
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
        />
      </svg>
    </span>
  </div>
</template>

<script>
  import create from '../utils/create-basic';

  export default create({
    name: 'loading',

    props: {
      size: String,
      type: {
        type: String,
        default: 'circular'
      },
      color: {
        type: String,
        default: '#c9c9c9'
      },
      background: String,
      backgroundSize: {
        type: String,
        default: '10px'
      },
    },

    computed: {
      style() {
        return {
          color: this.color,
          background: this.background,
          padding: this.background ? this.backgroundSize : '',
          borderRadius: this.background ? '4px' : '',
          width: this.size,
          height: this.size
        };
      }
    }
  });
</script>
