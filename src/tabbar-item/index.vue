<template>
  <div
    :class="b({ active: myActive })"
    :style="{
      color
    }"
    @click="onClick"
  >
    <div :class="b('icon')">
      <slot name="icon" :active="myActive">
        <Icon v-if="icon" :name="icon" :classPrefix="iconPrefix" />
      </slot>
      <Info :dot="dot" :info="info || badge" />
    </div>
    <div :class="b('text')">
      <slot :active="myActive" />
    </div>
  </div>
</template>

<script>
import Info from "../info";
import Icon from "../icon";
import create from "../utils/create";
import { route } from "../utils/router";
import { isObj } from "../utils";
import { ChildrenMixin } from "../mixins/relation";
import { routeProps } from "../utils/router";

export default create({
  name: "tabbar-item",

  components: {
    Info,
    Icon
  },

  mixins: [ChildrenMixin("vmTabbar")],

  props: {
    ...routeProps,
    dot: Boolean,
    icon: String,
    name: [Number, String],
    info: [Number, String],
    badge: [Number, String],
    iconPrefix: String
  },

  data() {
    return {
      active: false
    };
  },

  computed: {
    routeActive() {
      const { to, $route } = this;
      if (to && $route) {
        const config = isObj(to) ? to : { path: to };
        const pathMatched = config.path === $route.path;
        const nameMatched = isObj(config.name) && config.name === $route.name;

        return pathMatched || nameMatched;
      }
    },
    color() {
      return this.parents[this.myActive ? "activeColor" : "inactiveColor"];
    },
    myActive() {
      return this.parents.route ? this.routeActive : this.active;
    }
  },

  methods: {
    onClick(event) {
      this.parents.onChange(this.name || this.index);
      this.$emit("click", event);
      route(this.$router, this);
    }
  }
});
</script>
