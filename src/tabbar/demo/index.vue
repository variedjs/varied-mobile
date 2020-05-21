<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-tabbar v-model="active">
        <vm-tabbar-item icon="home">标签</vm-tabbar-item>
        <vm-tabbar-item icon="anchor">标签</vm-tabbar-item>
        <vm-tabbar-item icon="calendar-check-o">标签</vm-tabbar-item>
        <vm-tabbar-item icon="user">标签</vm-tabbar-item>
      </vm-tabbar>
    </demo-block>
    <demo-block title="徽标提示">
      <vm-tabbar v-model="active" route>
        <vm-tabbar-item icon="home" dot>标签</vm-tabbar-item>
        <vm-tabbar-item icon="anchor" info="51">标签</vm-tabbar-item>
        <vm-tabbar-item icon="calendar-check-o" info="15">标签</vm-tabbar-item>
        <vm-tabbar-item icon="user" info="5">标签</vm-tabbar-item>
      </vm-tabbar>
    </demo-block>
    <demo-block title="路由模式">
      <vm-tabbar v-model="active" route>
        <vm-tabbar-item icon="home" replace to="">标签</vm-tabbar-item>
        <vm-tabbar-item icon="anchor" replace to="">标签</vm-tabbar-item>
        <vm-tabbar-item icon="calendar-check-o" replace to="">标签</vm-tabbar-item>
        <vm-tabbar-item icon="user" replace to="">标签</vm-tabbar-item>
      </vm-tabbar>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      active2: 0,
      active3: 0,
    };
  }
};
</script>

<style lang="less">
.demo-tabbar {
  .vvm-tabbar {
    position: relative;

    &-item {
      cursor: pointer;
    }
  }
}
</style>
