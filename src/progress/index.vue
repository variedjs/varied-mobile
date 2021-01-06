<template>
  <div :class="b()" :style="wrapperStyle">
    <span :class="b('portion')" :style="portionStyle">
      <span
        v-if="showPivot && text"
        ref="pivot"
        :style="pivotStyle"
        :class="b('pivot')"
      >
        {{ text }}
      </span>
    </span>
  </div>
</template>
<script>
import create from "../utils/create";
import { addUnit } from "../utils/format/unit";

export default create({
  name: "progress",
  props: {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    pivotColor: String,
    trackColor: String,
    strokeWidth: [Number, String],
    percentage: {
      type: [Number, String],
      required: true,
      validator: value => value >= 0 && value <= 100
    },
    showPivot: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      pivotWidth: 0,
      progressWidth: 0
    };
  },

  mounted() {
    this.resize();
  },

  watch: {
    showPivot: "resize",
    pivotText: "resize"
  },

  methods: {
    // @exposed-api
    resize() {
      this.$nextTick(() => {
        this.progressWidth = this.$el.offsetWidth;
        this.pivotWidth = this.$refs.pivot ? this.$refs.pivot.offsetWidth : 0;
      });
    }
  },
  computed: {
    wrapperStyle() {
      return { background: this.trackColor, height: addUnit(this.strokeWidth) };
    },
    portionStyle() {
      const background = this.inactive ? "#cacaca" : this.color;
      const { percentage } = this;
      return {
        background,
        width: (this.progressWidth * percentage) / 100 + "px"
      };
    },
    pivotStyle() {
      const background = this.inactive ? "#cacaca" : this.color;
      const { percentage } = this;
      return {
        color: this.textColor,
        left: `${((this.progressWidth - this.pivotWidth) * percentage) /
          100}px`,
        background: this.pivotColor || background
      };
    },
    text() {
      const { pivotText, percentage } = this;
      return pivotText || percentage + "%";
    }
  }
});
</script>
