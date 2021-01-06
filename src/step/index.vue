<template>
  <div :class="['vm-hairline', b([parents.direction, { [status]: status }])]">
    <div
      :class="b('title', { active })"
      :style="titleStyle"
      @click="onClickStep"
    >
      <slot />
    </div>
    <div :class="b('circle-container')" @click="onClickStep">
      <slot v-if="active" name="active-icon">
        <Icon
          :class="b('icon', 'active')"
          :name="parents.activeIcon"
          :color="parents.activeColor"
        />
      </slot>
      <slot
        v-else-if="parents.inactiveIcon || $slots['inactive-icon']"
        name="inactive-icon"
      >
        <Icon :class="b('icon')" :name="parents.inactiveIcon" />
      </slot>
      <i v-else :class="b('circle')" :style="lineStyle" />
    </div>
    <div :class="b('line')" :style="lineStyle" />
  </div>
</template>
<script>
import create from "../utils/create";

import { ChildrenMixin } from "../mixins/relation";
import Icon from "../icon";

export default create({
  components: { Icon },
  mixins: [ChildrenMixin("vmSteps")],
  name: "step",
  computed: {
    status() {
      if (this.index < this.parents.active) {
        return "finish";
      }
      if (this.index === +this.parents.active) {
        return "process";
      }
    },

    active() {
      return this.status === "process";
    },

    lineStyle() {
      if (this.status === "finish") {
        return { background: this.parents.activeColor };
      }
      return { background: this.parents.inactiveColor };
    },

    titleStyle() {
      if (this.active) {
        return { color: this.parents.activeColor };
      }
      if (!this.status) {
        return { color: this.parents.inactiveColor };
      }
    }
  },
  methods: {
    onClickStep() {
      this.parents.$emit("click-step", this.index);
    }
  }
});
</script>
