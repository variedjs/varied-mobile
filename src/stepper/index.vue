<template>
  <div :class="b([theme])">
    <div
      v-show="showMinus"
      @click.stop="onChange('minus')"
      @touchstart="onTouchStart('minus')"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      ref="minus">
      <slot name="left" :disabled="minusDisabled">
        <button
          :style="buttonStyle"
          :class="b('minus', { disabled: minusDisabled })"
        />
      </slot>
    </div>
    <input
      ref="input"
      :type="integer ? 'tel' : 'text'"
      role="spinbutton"
      :class="b('input')"
      :value="currentValue"
      :style="inputStyle"
      :disabled="disabled"
      :readonly="disableInput"
      :inputmode="integer ? 'numeric' : 'decimal'"
      :aria-valuemax="max"
      :aria-valuemin="min"
      :aria-valuenow="currentValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div
      v-show="showPlus"
      @click.stop="onChange('plus')"
      @touchstart="onTouchStart('plus')"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      ref="plus">
      <slot name="right" :disabled="plusDisabled">
        <button
          :style="buttonStyle"
          :class="b('plus', { disabled: plusDisabled })"
        />
      </slot>
    </div>
  </div>
</template>

<script>
  import create from '../utils/create';
  import {isDef} from '../utils';
  import {addUnit} from '../utils/format/unit';
  import {formatNumber} from '../utils/format/number';

  const LONG_PRESS_START_TIME = 600;
  const LONG_PRESS_INTERVAL = 200;

  function equal(value1, value2) {
    return String(value1) === String(value2);
  }

  // add num and avoid float number
  function add(num1, num2) {
    const cardinal = 10 ** 10;
    return Math.round((num1 + num2) * cardinal) / cardinal;
  }

  export default create({
    name: "stepper",
    props: {
      value: null,
      theme: String,
      integer: Boolean,
      disabled: Boolean,
      inputWidth: [Number, String],
      buttonSize: [Number, String],
      asyncChange: Boolean,
      disablePlus: Boolean,
      disableMinus: Boolean,
      disableInput: Boolean,
      decimalLength: [Number, String],
      name: {
        type: [Number, String],
        default: '',
      },
      min: {
        type: [Number, String],
        default: 1,
      },
      max: {
        type: [Number, String],
        default: Infinity,
      },
      step: {
        type: [Number, String],
        default: 1,
      },
      defaultValue: {
        type: [Number, String],
        default: 1,
      },
      showPlus: {
        type: Boolean,
        default: true,
      },
      showMinus: {
        type: Boolean,
        default: true,
      },
      longPress: {
        type: Boolean,
        default: true,
      },
    },

    data() {
      const defaultValue = isDef(this.value) ? this.value : this.defaultValue;
      const value = this.format(defaultValue);

      if (!equal(value, this.value)) {
        this.$emit('input', value);
      }

      return {
        currentValue: value,
        height: ''
      };
    },

    computed: {
      minusDisabled() {
        return (
          this.disabled || this.disableMinus || this.currentValue <= this.min
        );
      },

      plusDisabled() {
        return this.disabled || this.disablePlus || this.currentValue >= this.max;
      },

      inputStyle() {
        const style = {};

        if (this.inputWidth) {
          style.width = addUnit(this.inputWidth);
        }

        if (this.height) {
          style.height = this.height;
        }

        return style;
      },

      buttonStyle() {
        if (this.buttonSize) {
          const size = addUnit(this.buttonSize);

          return {
            width: size,
            height: size,
          };
        }
      },
    },

    watch: {
      max: 'check',
      min: 'check',
      integer: 'check',
      decimalLength: 'check',

      value(val) {
        if (!equal(val, this.currentValue)) {
          this.currentValue = this.format(val);
        }
      },

      currentValue(val) {
        this.$emit('input', val);
        this.$emit('change', val, {name: this.name});
      },
    },

    methods: {
      check() {
        const val = this.format(this.currentValue);
        if (!equal(val, this.currentValue)) {
          this.currentValue = val;
        }
      },

      // formatNumber illegal characters
      formatNumber(value) {
        return formatNumber(String(value), !this.integer);
      },

      format(value) {
        value = this.formatNumber(value);

        // format range
        value = value === '' ? 0 : +value;
        value = isNaN(value) ? this.min : value;
        value = Math.max(Math.min(this.max, value), this.min);

        // format decimal
        if (isDef(this.decimalLength)) {
          value = value.toFixed(this.decimalLength);
        }

        return value;
      },

      onInput(event) {
        const {value} = event.target;

        let formatted = this.formatNumber(value);

        // limit max decimal length
        if (isDef(this.decimalLength) && formatted.indexOf('.') !== -1) {
          const pair = formatted.split('.');
          formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`;
        }

        if (!equal(value, formatted)) {
          event.target.value = formatted;
        }

        this.emitChange(formatted);
      },

      emitChange(value) {
        if (this.asyncChange) {
          this.$emit('input', value);
          this.$emit('change', value, {name: this.name});
        } else {
          this.currentValue = value;
        }
      },

      onChange(type) {

        if (this[`${type}Disabled`]) {
          this.$emit('overlimit', type);
          return;
        }

        const diff = type === 'minus' ? -this.step : +this.step;

        const value = this.format(add(+this.currentValue, diff));

        this.emitChange(value);
        this.$emit(type);
      },

      onFocus(event) {
        // readonly not work in lagacy mobile safari
        if (this.disableInput && this.$refs.input) {
          this.$refs.input.blur();
        } else {
          this.$emit('focus', event);
        }
      },

      onBlur(event) {
        const value = this.format(event.target.value);
        event.target.value = value;
        this.currentValue = value;
        this.$emit('blur', event);
      },

      longPressStep(type) {
        this.longPressTimer = setTimeout(() => {
          this.onChange(type);
          this.longPressStep(type);
        }, LONG_PRESS_INTERVAL);
      },

      onTouchStart(type) {
        if (!this.longPress) {
          return;
        }

        clearTimeout(this.longPressTimer);
        this.isLongPress = false;

        this.longPressTimer = setTimeout(() => {
          this.isLongPress = true;
          this.onChange(type);
          this.longPressStep(type);
        }, LONG_PRESS_START_TIME);
      },

      onTouchEnd() {
        if (!this.longPress) {
          return;
        }

        clearTimeout(this.longPressTimer);
      },
    },

    mounted() {
      const plus = this.$refs.plus;
      const minus = this.$refs.minus;
      if (plus && minus) {
        let plusHeight = plus.clientHeight;
        let minusHeight = minus.clientHeight;
        if (plusHeight > minusHeight) {
          this.height = addUnit(plusHeight);
        } else {
          this.height = addUnit(minusHeight);
        }
      }
    }
  });
</script>
