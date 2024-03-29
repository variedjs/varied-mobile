<template>
  <transition name="vm-fade">
    <div
      v-show="value"
      :class="b([style, position])"
    >
      <!-- text only -->
      <div
        v-if="style === 'text'"
        v-text="message"
      />

      <!-- html only -->
      <div
        v-if="style === 'html'"
        v-html="message"
      />

      <!-- with icon -->
      <template v-if="style === 'default'">
        <loading
          v-if="type === 'loading'"
          color="white"
          :type="loadingType"
        />
        <icon
          v-else
          :class="b('icon')"
          :name="typeIcons[type]"
        />
        <div
          v-if="isDef(message)"
          v-text="message"
          :class="b('icon-text')"
        />
      </template>
    </div>
  </transition>
</template>

<script>
  import create from '../utils/create';
  import Popup from '../mixins/popup';

  const STYLE_LIST = ['success', 'fail', 'loading'];

  export default create({
    name: 'toast',

    mixins: [Popup],

    props: {
      forbidClick: Boolean,
      message: [String, Number],
      type: {
        type: String,
        default: 'text'
      },
      loadingType: {
        type: String,
        default: 'circular'
      },
      position: {
        type: String,
        default: 'middle'
      },
      lockScroll: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        clickable: false,
        typeIcons: {
          success: 'check',
          fail: 'close'
        }
      };
    },

    computed: {
      style() {
        return STYLE_LIST.indexOf(this.type) !== -1 ? 'default' : this.type;
      }
    },

    mounted() {
      this.toggleClickale();
    },

    destroyed() {
      this.toggleClickale();
    },

    watch: {
      value() {
        this.toggleClickale();
      },

      forbidClick() {
        this.toggleClickale();
      }
    },

    methods: {
      toggleClickale() {
        const clickable = this.value && this.forbidClick;
        if (this.clickable !== clickable) {
          this.clickable = clickable;
          const action = clickable ? 'add' : 'remove';
          document.body.classList[action]('vm-toast-unclickable');
        }
      }
    }
  });
</script>
