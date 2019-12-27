<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-row>
        <vm-col span="8">span: 8</vm-col>
        <vm-col span="8">span: 8</vm-col>
        <vm-col span="8">span: 8</vm-col>
      </vm-row>

      <vm-row>
        <vm-col span="4">span: 4</vm-col>
        <vm-col
          span="10"
          offset="4"
        >
          offset: 4, span: 10
        </vm-col>
      </vm-row>

      <vm-row>
        <vm-col
          offset="12"
          span="12"
        >
          offset: 12, span: 12
        </vm-col>
      </vm-row>
    </demo-block>

    <demo-block title="在列元素之间增加间距">
      <vm-row gutter="20">
        <vm-col span="8">span: 8</vm-col>
        <vm-col span="8">span: 8</vm-col>
        <vm-col span="8">span: 8</vm-col>
      </vm-row>
    </demo-block>

    <demo-block title="Flex 布局">
      <vm-row type="flex">
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
      </vm-row>

      <vm-row
        type="flex"
        justify="center"
      >
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
      </vm-row>

      <vm-row
        type="flex"
        justify="end"
      >
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
      </vm-row>

      <vm-row
        type="flex"
        justify="space-between"
      >
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
      </vm-row>

      <vm-row
        type="flex"
        justify="space-around"
      >
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
        <vm-col span="6">span: 6</vm-col>
      </vm-row>
    </demo-block>
  </demo-section>
</template>

<script>
</script>

<style lang="less">
@import '../../style/theme';

.demo-col {
  .van-doc-demo-block {
    padding: 0 15px;
  }

  .van-doc-demo-block__title {
    padding-left: 0;
  }

  .vm-col {
    color: @white;
    font-size: 13px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 10px;
    background-clip: content-box;

    &:nth-child(odd) {
      background-color: #39a9ed;
    }

    &:nth-child(even) {
      background-color: #66c6f2;
    }
  }
}
</style>
