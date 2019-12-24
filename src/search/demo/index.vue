<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-search
        v-model="value"
        placeholder="请输入搜索关键词"
      />
    </demo-block>

    <demo-block title="监听对应事件">
      <form action="/">
        <vm-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </demo-block>

    <demo-block title="自定义行动按钮">
      <vm-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
      >
        <template
          v-slot:action
          @click="onSearch"
        >
          搜索
        </template>
      </vm-search>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    };
  },

  methods: {
    onSearch() {
      this.$toast(this.value);
    },
    onCancel() {
      this.$toast('取消');
    }
  }
};
</script>
