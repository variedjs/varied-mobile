<template>
  <div :class="b(direction)">
    <div
      :style="{ fontSize: addUnits(iconSizeC) }"
      :class="b('icon', [shape, { disabled: isDisabled, checked }])"
      @click.stop="onClickLabel"
    >
      <slot
        name="icon"
        :checked="checked"
      >
        <icon
          name="check"
          :style="iconStyle"
        />
      </slot>
    </div>
    <span
      v-if="$slots.default"
      :class="b('label', [{ disabled: isDisabled }])"
      @click="onClickLabel('label')"
    >
      <slot/>
    </span>
  </div>
</template>

<script>
  import create from '../utils/create';
  import findParent from '../mixins/find-parent';
  import {addUnit} from '../utils/format/unit';

  export default create({
    name: 'radio',

    mixins: [findParent],

    props: {
      name: null,
      value: null,
      disabled: Boolean,
      checkedColor: String,
      iconSize: [Number, String],
      labelDisabled: Boolean,
      shape: {
        type: String,
        default: 'round'
      }
    },

    computed: {
      iconSizeC() {
        return (this.parent && this.parent.iconSize) || this.iconSize;
      },

      currentValue: {
        get() {
          return this.parent ? this.parent.value : this.value;
        },

        set(val) {
          (this.parent || this).$emit('input', val);
        }
      },

      checked() {
        return this.currentValue === this.name;
      },

      isDisabled() {
        return (this.parent && this.parent.disabled) || this.disabled;
      },

      iconStyle() {
        const checkedColor = (this.parent && this.parent.checkedColor) || this.checkedColor;
        if (checkedColor && this.checked && !this.isDisabled) {
          return {
            borderColor: checkedColor,
            backgroundColor: checkedColor
          };
        }
      },

      direction() {
        return (this.parent && this.parent.direction) || null;
      },
    },

    created() {
      this.findParent('vm-radio-group');
    },

    methods: {
      addUnits(val) {
        return addUnit(val);
      },
      onClickLabel(target) {
        this.$emit('click');
        if (!this.isDisabled && !(target === 'label' && this.labelDisabled)) {
          this.currentValue = this.name;
        }
      }
    }
  });
</script>
