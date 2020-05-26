<template>
  <div
    :class="b({
    readonly,
    disabled,
    })"
    tabindex="0"
    @touchstart="onTouchStart"
    @touchmove.stop="onTouchMove"
  >
    <div
      v-for="(status, index) in list"
      ref="items"
      :key="index"
      :style="{ paddingRight: gutterWithUnit }"
      tabindex="0"
      :aria-setsize="count"
      :aria-posinset="index + 1"
      :aria-checked="String(status !== 'void')"
      :class="b('item')"
    >
      <icon
        :size="sizeWithUnit"
        :name="status === 'full' ? icon : voidIcon"
        :class="b('icon', { disabled, full: status === 'full' })"
        :color="disabled ? disabledColor : status === 'full' ? color : voidColor"
        :classPrefix="iconPrefix"
        :data-score="index + 1"
        @click="select(index + 1)"
      />
      <icon
        v-if="allowHalf"
        :size="sizeWithUnit"
        :name="status === 'void' ? voidIcon : icon"
        :class="b('icon', ['half', { disabled, full: status !== 'void' }])"
        :color="disabled ? disabledColor : status === 'void' ? voidColor : color"
        :classPrefix="iconPrefix"
        :data-score="index + 0.5"
        @click="select(index + 0.5)"
      />
    </div>
  </div>
</template>

<script>
  import {addUnit} from '../utils/unit';
  import create from '../utils/create';
  import TouchMixin from '../mixins/touch';

  function getRateStatus(value, index, allowHalf) {
    if (value >= index) {
      return 'full';
    }

    if (value + 0.5 >= index && allowHalf) {
      return 'half';
    }

    return 'void';
  }

  export default create({
    name: "rate",
    mixins: [TouchMixin],
    props: {
      size: [Number, String],
      color: String,
      gutter: [Number, String],
      readonly: Boolean,
      disabled: Boolean,
      allowHalf: Boolean,
      voidColor: String,
      iconPrefix: String,
      disabledColor: String,
      value: {
        type: Number,
        default: 0,
      },
      icon: {
        type: String,
        default: 'star',
      },
      voidIcon: {
        type: String,
        default: 'star-o',
      },
      count: {
        type: [Number, String],
        default: 5,
      },
      touchable: {
        type: Boolean,
        default: true,
      },
    },

    computed: {
      list() {
        const list = [];
        for (let i = 1; i <= this.count; i++) {
          list.push(getRateStatus(this.value, i, this.allowHalf));
        }

        return list;
      },

      sizeWithUnit() {
        return addUnit(this.size);
      },

      gutterWithUnit() {
        return addUnit(this.gutter);
      },
    },

    mounted() {
    },
    methods: {
      select(index) {
        if (!this.disabled && !this.readonly && index !== this.value) {
          this.$emit('input', index);
          this.$emit('change', index);
        }
      },

      onTouchStart(event) {
        if (this.readonly || this.disabled || !this.touchable) {
          return;
        }

        this.touchStart(event);

        const rects = this.$refs.items.map((item) =>
          item.getBoundingClientRect()
        );
        const ranges = [];

        rects.forEach((rect, index) => {
          if (this.allowHalf) {
            ranges.push(
              {score: index + 0.5, left: rect.left},
              {score: index + 1, left: rect.left + rect.width / 2}
            );
          } else {
            ranges.push({score: index + 1, left: rect.left});
          }
        });

        this.ranges = ranges;
      },

      onTouchMove(event) {
        if (this.readonly || this.disabled || !this.touchable) {
          return;
        }

        this.touchMove(event);

        if (this.direction === 'horizontal') {
          const {clientX} = event.touches[0];
          this.select(this.getScoreByPosition(clientX));
        }
      },

      getScoreByPosition(x) {
        for (let i = this.ranges.length - 1; i > 0; i--) {
          if (x > this.ranges[i].left) {
            return this.ranges[i].score;
          }
        }

        return this.allowHalf ? 0.5 : 1;
      },
    },
  });
</script>
