<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </demo-block>
    <demo-block title="高级用法">
      <vm-nav-bar
        class="bg-gradual-blue"
        title="标题"
      >
        <template v-slot:left>
          <vm-icon
            name="home"
            v-slot:left
          />
          <span>首页</span>
        </template>
        <vm-icon
          name="search"
          v-slot:right
        />
      </vm-nav-bar>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$toast('返回');
    },
    onClickRight() {
      this.$toast('按钮');
    }
  }
};
</script>
