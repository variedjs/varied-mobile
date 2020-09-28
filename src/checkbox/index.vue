<template>
  <div :class="b(direction)">
    <div
      :style="{ fontSize: addUnits(iconSizeC) }"
      :class="b('icon', [shape, { disabled: isDisabled, checked }])"
      @click.stop="toggle"
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
      @click="toggle('label')"
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
    name: 'checkbox',

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
      checked: {
        get() {
          return this.parent
            ? this.parent.value.indexOf(this.name) !== -1
            : this.value;
        },

        set(val) {
          if (this.parent) {
            this.setParentValue(val);
          } else {
            this.$emit('input', val);
          }
        }
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

    watch: {
      value(val) {
        this.$emit('change', val);
      }
    },

    created() {
      this.findParent('vm-checkbox-group');
    },

    methods: {
      addUnits(val) {
        return addUnit(val);
      },
      toggle(target) {
        this.$emit('click');
        if (!this.isDisabled && !(target === 'label' && this.labelDisabled)) {
          this.checked = !this.checked;
        }
      },

      setParentValue(val) {
        const {parent} = this;
        const value = parent.value.slice();

        if (val) {
          if (parent.max && value.length >= parent.max) {
            return;
          }

          /* istanbul ignore else */
          if (value.indexOf(this.name) === -1) {
            value.push(this.name);
            parent.$emit('input', value);
          }
        } else {
          const index = value.indexOf(this.name);

          /* istanbul ignore else */
          if (index !== -1) {
            value.splice(index, 1);
            parent.$emit('input', value);
          }
        }
      }
    }
  });
</script>
