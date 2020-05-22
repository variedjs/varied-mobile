<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <transition
    :name="this.transition ? 'vm-slide-up' : ''">
    <div
      v-show="show"
      :style="{zIndex: this.zIndex}"
      :class="b({ unfit: !this.safeAreaInsetBottom})"
      @touchstart.stop
      @animationend="onAnimationEnd"
      @webkitAnimationEnd="onAnimationEnd"
    >
      <div
        :class="b('header')">
        <span
          :class="b('title-left')">
          <slot name="title-left"></slot>
        </span>
        <h2
          v-if="title"
          :class="b('title')">
          {{title}}
        </h2>
        <button
          v-if="closeButtonText"
          type="button"
          :class="b('close')"
          @click="onClose">
          {{closeButtonText}}
        </button>
      </div>
      <div
        :class="b('body')">
        <div
          :class="b('keys', item.className)"
          v-for="(item, index) in keys"
          :key="index">
          <Key
            :theme="themeTemp || theme"
            :key="j"
            :text="key.text"
            :type="key.type"
            :space="key.space"
            :wider="key.wider"
            :color="key.color"
            @press="onPress"
            v-for="(key, j) in item.list"
          >
            <template v-slot:delete>
              <slot name="delete">
              </slot>
            </template>
            <template v-slot:extraKey>
              <slot name="extraKey">
              </slot>
            </template>
          </Key>
        </div>
        <div
          v-if="theme === 'custom' || (theme === 'number' && themeTemp === 'number') || (theme === 'number' && themeTemp === '')"
          :class="b('sidebar')">
          <Key
            v-if="showDeleteKey"
            :text="deleteButtonText"
            type="delete"
            large
            @press="onPress"
          >
            <template v-slot:delete>
              <slot name="delete">
              </slot>
            </template>
          </Key>
          <Key
            :text="closeButtonText || closeButtonTextTemp"
            type="close"
            color="blue"
            large
            :loading="closeButtonLoading"
            @press="onPress"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import create from '../utils/create';
  import Key from './Key';

  const DELETE_KEY_THEME = ['delete', 'big', 'gray'];
  const CLOSE_KEY_THEME = ['blue', 'big'];

  export default create({
    name: 'safe-keyboard',
    components: {
      Key
    },

    props: {
      show: Boolean,
      title: String,
      zIndex: [Number, String],
      closeButtonText: String,
      deleteButtonText: String,
      closeButtonLoading: Boolean,
      theme: {
        type: String,
        default: 'default',
      },
      value: {
        type: [String, Number],
        default: '',
      },
      extraKey: {
        type: [String, Array],
        default: '',
      },
      maxlength: {
        type: [Number, String],
        default: Number.MAX_VALUE,
      },
      transition: {
        type: Boolean,
        default: true,
      },
      showDeleteKey: {
        type: Boolean,
        default: true,
      },
      hideOnClickOutside: {
        type: Boolean,
        default: true,
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: true,
      },
    },

    data() {
      return {
        capital: false,
        themeTemp: '',
        closeButtonTextTemp: '完成',
      };
    },

    watch: {
      show(val) {
        if (!this.transition) {
          this.$emit(val ? 'show' : 'hide');
        }
      },
    },

    methods: {
      genBasicKeys() {
        const keys = [];
        for (let i = 1; i <= 9; i++) {
          keys.push({text: i});
        }
        return keys;
      },

      genDefaultKeys() {
        let keys = [
          ...this.genBasicKeys(),
          {text: this.extraKey, type: 'extra'},
          {text: 0},
        ];
        if (this.showDeleteKey) {
          keys.push({
            text: this.deleteButtonText ? this.deleteButtonText : '',
            type: 'delete',
          })
        }

        return [{className: '', list: keys}];
      },

      genCustomKeys(array) {
        const keys = this.genBasicKeys();
        const {extraKey} = this;
        let extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
        if (array) {
          extraKeys = array;
        }
        if (extraKeys.length === 1) {
          keys.push(
            {text: 0, wider: true},
            {text: extraKeys[0], type: 'extra'}
          );
        } else if (extraKeys.length === 2) {
          keys.push(
            {text: extraKeys[0], type: 'extra'},
            {text: 0},
            {text: extraKeys[1], type: 'extra'}
          );
        }

        return [{className: '', list: keys}];
      },

      getNumberKeys() {
        let keys = this.genBasicKeys();
        keys.push({
          text: '英文',
          type: 'extra'
        }, {
          text: 0
        }, {
          text: '.',
          type: 'extra'
        });
        return [{
          className: '',
          list: keys
        }];
      },

      getLetterAndNumberKeys() {
        let keys = [{text: 0}];
        keys = keys.concat(this.genBasicKeys());
        return [{className: '', list: keys}].concat(this.getLetterKeys());
      },

      getLetterKeys() {
        let self = this;
        const letters = [
          [
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'
          ], [
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k'
          ], [
            'z', 'x', 'c', 'v', 'b', 'n', 'm'
          ]
        ];
        const keys = [];
        letters.forEach(val => {
          let key = [];
          let c = false;
          let d = false;
          val.forEach(val1 => {
            if (val1 === 'a') {
              c = true;
            }
            if (val1 === 'z') {
              d = true;
            }
            if (self.capital) {
              key.push({
                text: val1.toUpperCase()
              });
            } else {
              key.push({
                text: val1
              });
            }
          });
          if (c) {
            keys.push({className: 'letter1', list: key});
            c = false;
          } else if (d) {
            key.unshift({
              text: '',
              type: 'capital',
            });
            if (this.showDeleteKey) {
              key.push({
                text: this.deleteButtonText ? this.deleteButtonText : '',
                type: 'delete',
              });
              keys.push({className: 'letter', list: key});
              d = false;
            }
          } else {
            keys.push({className: 'letter', list: key});
          }
        });
        keys.push({
          className: 'letter',
          list: [
            {text: '123', type: ''},
            {text: ',', type: ''},
            {text: '', type: 'space', space: true},
            {text: '.', type: ''},
            {text: '', type: 'extra'},
          ]
        });
        return keys;
      },

      onBlur() {
        this.show && this.$emit('blur');
      },

      onClose() {
        this.$emit('close');
        this.onBlur();
      },

      onAnimationEnd() {
        this.$emit(this.show ? 'show' : 'hide');
      },

      onPress(text, type) {
        if (text === '' && type === 'extra') {
          this.onBlur();
          return;
        }

        const {value} = this;

        if (type === 'delete') {
          this.$emit('delete');
          this.$emit('input', value.slice(0, value.length - 1));
        } else if (type === 'close') {
          this.onClose();
        } else if (type === 'capital') {
          this.capital = !this.capital;
        } else if (text === '123') {
          this.themeTemp = 'number';
        } else if (text === '英文') {
          if (this.theme === 'letter-number') {
            this.themeTemp = this.theme;
          } else {
            this.themeTemp = 'letter';
          }
        } else if (value.length < this.maxlength) {
          this.$emit('input', value + text);
          this.$emit('getKey', text);
        }
      },
    },

    mounted() {
      if (this.hideOnClickOutside) {
        document.body.addEventListener('touchstart', this.onBlur);
      }
    },

    computed: {
      keys() {
        let keys = [];
        let theme = this.theme;
        if (this.themeTemp) {
          theme = this.themeTemp;
        }
        switch (theme) {
          case 'custom':
            keys = this.genCustomKeys();
            break;
          case 'number':
            keys = this.getNumberKeys();
            break;
          case 'letter':
            keys = this.getLetterKeys();
            break;
          case 'letter-number':
            keys = this.getLetterAndNumberKeys();
            break;
          default:
            keys = this.genDefaultKeys();
            break;
        }
        return keys;
      }
    },
  });
</script>
