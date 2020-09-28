<template>
  <div
    :class="
      b({
        on: checked,
        loading,
        disabled
      })
    "
    role="switch"
    :style="style"
    :aria-checked="String(checked)"
    @click="onClick"
  >
    <div :class="b('node')">
      <loading
        v-if="loading"
        :class="b('-loading')"
        :color="checked ? activeColor : inactiveColor"
      />
    </div>
  </div>
</template>

<script>
import create from "../utils/create";
import { addUnit } from "../utils/format/unit";
import Loading from "../loading";
import { FieldMixin } from "../mixins/field";

export default create({
  name: "switch",
  mixins: [FieldMixin],
  components: {
    Loading
  },
  props: {
    size: [Number, String],
    value: Boolean,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    activeValue: {
      type: Boolean,
      default: true
    },
    inactiveValue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue;
    },

    style() {
      return {
        fontSize: addUnit(this.size),
        backgroundColor: this.checked ? this.activeColor : this.inactiveColor
      };
    }
  },
  methods: {
    onClick(event) {
      this.$emit("click", event);

      if (!this.disabled && !this.loading) {
        const newValue = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit("input", newValue);
        this.$emit("change", newValue);
      }
    }
  }
});
</script>
