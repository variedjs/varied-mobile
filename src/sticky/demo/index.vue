<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-sticky>
        <vm-button class="bg-blue" style="margin-left: 15px;">
          基础用法
        </vm-button>
      </vm-sticky>
    </demo-block>

    <demo-block title="吸顶距离">
      <vm-sticky :offset-top="50">
        <vm-button class="bg-red" style="margin-left: 115px;">
          吸顶距离
        </vm-button>
      </vm-sticky>
    </demo-block>

    <demo-block title="指定容器">
      <div ref="container" style="height: 150px; background-color: #fff;">
        <vm-sticky :container="container">
          <vm-button class="bg-yellow" style="margin-left: 215px;">
            指定容器
          </vm-button>
        </vm-sticky>
      </div>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      container: null
    };
  },

  mounted() {
    this.container = this.$refs.container;
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-sticky {
  height: 200vh;

  .vm-button {
    margin-left: @padding-md;
  }
}
</style>
