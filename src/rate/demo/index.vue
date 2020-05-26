<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-rate v-model="value"/>
    </demo-block>
    <demo-block title="自定义图标">
      <vm-rate v-model="value1" icon="heart" void-icon="heart-o" />
    </demo-block>
    <demo-block title="自定义样式">
      <vm-rate
        v-model="value2"
        :size="25"
        color="#ee0a24"
        void-icon="star"
        void-color="#eee"
      />
    </demo-block>
    <demo-block title="半星">
      <vm-rate v-model="value3" allow-half void-icon="star" void-color="#eee" />
    </demo-block>
    <demo-block title="自定义数量">
      <vm-rate v-model="value4" :count="6" />
    </demo-block>
    <demo-block title="禁用状态">
      <vm-rate v-model="value5" disabled />
    </demo-block>
    <demo-block title="只读状态">
      <vm-rate v-model="value5" readonly />
    </demo-block>
  </demo-section>
</template>

<script>
  export default {
    data() {
      return {
        value: 1,
        value1: 1,
        value2: 1,
        value3: 1,
        value4: 1,
        value5: 1,
      };
    }
  };
</script>

<style lang="less">
  .vm-rate{
    padding: 0 16px;
  }
</style>
