<template>
  <div
    :style="divStyle">
    <div
      :style="wrapperStyle"
      :class="b({ disabled, vertical })"
      @click.stop="onClick"
    >
      <div :class="b('bar')" :style="barStyle">
        <div
          ref="wrapper"
          role="slider"
          :tabindex="disabled ? -1 : 0"
          :aria-valuemin="min"
          :aria-valuenow="value"
          :aria-valuemax="max"
          :aria-orientation="vertical ? 'vertical' : 'horizontal'"
          @touchstart.stop="onTouchStart"
          @touchmove.prevent.stop="onTouchMove"
          @touchend.stop="onTouchEnd"
          @touchcancel.stop="onTouchEnd"
          :class="b('button-wrapper')"
        >
          <slot name="button">
            <div
              :class="b('button')"
              :style="buttonStyle"/>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import create from '../utils/create';
  import {addUnit} from '../utils/format/unit';
  import Touch from '../mixins/touch';

  export default create({
    name: "slider",
    mixins: [Touch],
    props: {
      disabled: Boolean,
      vertical: {
        type: Boolean,
        default: false
      },
      barHeight: [Number, String],
      buttonSize: {
        type: [Number, String],
        default: 30
      },
      activeColor: String,
      inactiveColor: String,
      min: {
        type: [Number, String],
        default: 0,
      },
      max: {
        type: [Number, String],
        default: 100,
      },
      step: {
        type: [Number, String],
        default: 1,
      },
      value: {
        type: Number,
        default: 0,
      },
      height: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        dragStatus: '',
        buttonSizeTemp: '',
      };
    },

    computed: {
      wrapperStyle() {
        const {vertical} = this;
        const crossAxis = vertical ? 'width' : 'height';

        return {
          background: this.inactiveColor,
          [crossAxis]: addUnit(this.barHeight),
        };
      },

      barStyle() {
        const {vertical} = this;
        const mainAxis = vertical ? 'height' : 'width';

        const barStyle = {
          [mainAxis]: `${((this.value - this.min) * 100) / this.range}%`,
          background: this.activeColor,
        };

        if (this.dragStatus) {
          barStyle.transition = 'none';
        }

        return barStyle;
      },

      range() {
        return this.max - this.min;
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

      divStyle() {
        let {buttonSizeTemp, height, vertical} = this;
        let padding, display, margin, alignItems;

        if (height) {
          margin = addUnit(buttonSizeTemp, 2);

          if (!vertical) {
            display = 'flex';
            alignItems = 'center';
          }
        } else {
          padding = addUnit(buttonSizeTemp, 2);
        }

        height = addUnit(height);

        return {
          height, margin, padding, display, alignItems
        };
      },
    },

    created() {
      // format initial value
      this.updateValue(this.value);
    },

    mounted() {
      this.buttonSizeTemp = this.$refs.wrapper.clientHeight;
    },

    methods: {
      onTouchStart(event) {
        if (this.disabled) {
          return;
        }

        this.touchStart(event);
        this.startValue = this.format(this.value);
        this.dragStatus = 'start';
      },

      onTouchMove(event) {
        if (this.disabled) {
          return;
        }

        if (this.dragStatus === 'start') {
          this.$emit('drag-start');
        }

        this.touchMove(event);
        this.dragStatus = 'draging';

        const rect = this.$el.getBoundingClientRect();
        const delta = this.vertical ? this.deltaY : this.deltaX;
        const total = this.vertical ? rect.height : rect.width;
        const diff = (delta / total) * this.range;

        this.newValue = this.startValue + diff;
        this.updateValue(this.newValue);
      },

      onTouchEnd() {
        if (this.disabled) {
          return;
        }

        if (this.dragStatus === 'draging') {
          this.updateValue(this.newValue, true);
          this.$emit('drag-end');
        }

        this.dragStatus = '';
      },

      onClick(event) {
        if (this.disabled) return;

        const rect = this.$el.getBoundingClientRect();
        const delta = this.vertical
          ? event.clientY - rect.top
          : event.clientX - rect.left;
        const total = this.vertical ? rect.height : rect.width;
        const value = +this.min + (delta / total) * this.range;

        this.startValue = this.value;
        this.updateValue(value, true);
      },

      updateValue(value, end) {
        value = this.format(value);

        if (value !== this.value) {
          this.$emit('input', value);
        }

        if (end && value !== this.startValue) {
          this.$emit('change', value);
        }
      },

      format(value) {
        return (
          Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) *
          this.step
        );
      },

    },
  });
</script>
