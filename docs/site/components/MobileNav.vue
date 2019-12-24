<template>
  <vm-collapse
    v-model="active"
    :border="false"
    class="mobile-nav"
  >
    <vm-collapse-item
      class="mobile-nav__item"
      :title="group.groupName"
      :name="group.groupName"
    >
      <vm-icon
        :name="group.icon"
        slot="right-icon"
        class="mobile-nav__icon"
      />
      <template v-for="(navItem, index) in group.list">
        <vm-cell
          v-if="!navItem.disabled"
          :key="index"
          :to="navItem.path"
          :title="navItem.title"
          is-link
        />
      </template>
    </vm-collapse-item>
  </vm-collapse>
</template>

<script>
export default {
  props: {
    base: String,
    group: Object
  },

  data() {
    return {
      active: []
    };
  }
};
</script>

<style lang="less">
.mobile-nav {
  &__item {
    margin-bottom: 16px;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 0 1px 5px #ebedf0;
  }

  &__icon {
    font-size: 24px;

    img {
      width: 100%;
    }
  }

  .vm-collapse-item__content {
    padding: 0;
  }

  .vm-collapse-item__title {
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 40px;
    border-radius: 2px;
  }
}
</style>
