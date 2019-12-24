<template>
  <demo-section>
    <demo-block title="文字提示">
      <vm-button @click="$toast('提示内容')">文字提示</vm-button>
      <vm-button @click="$toast('这是一条长文字提示，超过一定字数就会换行')">长文字提示</vm-button>
    </demo-block>

    <demo-block title="加载提示">
      <vm-button @click="showLoadingToast">加载提示</vm-button>
    </demo-block>

    <demo-block title="成功/失败提示">
      <vm-button @click="showSuccessToast">成功提示</vm-button>
      <vm-button @click="showFailToast">失败提示</vm-button>
    </demo-block>

    <demo-block title="高级用法">
      <vm-button @click="showCustomizedToast">高级用法</vm-button>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  methods: {
    text4: second => `${second} seconds`,
    showLoadingToast() {
      this.$toast.loading({ mask: true, message: '加载中...' });
    },

    showSuccessToast() {
      this.$toast.success('成功文案');
    },

    showFailToast() {
      this.$toast.fail('失败文案');
    },

    showCustomizedToast() {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: this.text4(3)
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = this.text4(second);
        } else {
          clearInterval(timer);
          this.$toast.clear();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.demo-toast {
  .vm-button {
    margin-left: 15px;
  }
}
</style>
