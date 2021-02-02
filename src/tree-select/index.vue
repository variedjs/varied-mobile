<template>
  <div :class="b()" :style="{ height: addUnit(height) }">
    <Sidebar :class="b('nav')" :activeKey="mainActiveIndex" @change="onChange">
      <SidebarItem
        v-for="(item, index) in items"
        :key="index"
        :dot="item.dot"
        :badge="item.badge"
        :title="item.text"
        :disabled="item.disabled"
        :class="[b('nav-item'), item.className]"
      />
    </Sidebar>
    <div :class="b('content')">
      <slot name="content">
        <div
          v-for="item in subItems"
          :key="item.id"
          :class="[
            'vm-ellipsis',
            b('item', {
              active: isActiveItem(item.id),
              disabled: item.disabled
            })
          ]"
          @click="onClick(item)"
        >
          {{ item.text }}
          <Icon
            v-if="isActiveItem(item.id)"
            :name="selectedIcon"
            :class="b('selected')"
          />
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import create from "../utils/create";

// Components
import Icon from "../icon";
import Sidebar from "../sidebar";
import SidebarItem from "../sidebar-item";

import { addUnit } from "../utils/format/unit";

export default create({
  components: { Icon, Sidebar, SidebarItem },
  name: "tree-select",
  props: {
    max: {
      type: [Number, String],
      default: Infinity
    },
    items: {
      type: Array,
      default: () => []
    },
    height: {
      type: [Number, String],
      default: 300
    },
    activeId: {
      type: [Number, String, Array],
      default: 0
    },
    selectedIcon: {
      type: String,
      default: "check"
    },
    mainActiveIndex: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    addUnit,
    isActiveItem(id) {
      return this.isMultiple
        ? this.activeId.indexOf(id) !== -1
        : this.activeId === id;
    },
    onChange(index) {
      this.$emit("update:main-active-index", index);
      this.$emit("click-nav", index);
    },
    onClick(item) {
      if (!item.disabled) {
        let newActiveId = item.id;
        if (this.isMultiple) {
          newActiveId = this.activeId.slice();

          const index = newActiveId.indexOf(item.id);

          if (index !== -1) {
            newActiveId.splice(index, 1);
          } else if (newActiveId.length < this.max) {
            newActiveId.push(item.id);
          }
        }

        this.$emit("update:active-id", newActiveId);
        this.$emit("click-item", item);
      }
    }
  },
  computed: {
    isMultiple() {
      return Array.isArray(this.activeId);
    },
    subItems() {
      const selectedItem = this.items[+this.mainActiveIndex] || {};
      return selectedItem.children || [];
    }
  }
});
</script>
