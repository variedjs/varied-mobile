<template>
  <demo-section>
    <demo-block title="Circular">
      <vm-loading />
      <vm-loading color="white" background="rgba(0,0,0,.6)" />
    </demo-block>

    <demo-block title="Spinner">
      <vm-loading type="spinner" />
      <vm-loading
        type="spinner"
        color="white"
        background="rgba(0,0,0,.6)"
        backgroundSize="20px"
      />
    </demo-block>
    <demo-block title="加载文案">
      <vm-loading size="24px">
        加载中...
      </vm-loading>
    </demo-block>

    <demo-block title="垂直排列">
      <vm-loading size="24px" vertical>
        加载中...
      </vm-loading>
    </demo-block>
  </demo-section>
</template>
<style lang="less">
.demo-loading {
  .vm-loading {
    display: inline-block;
    margin: 5px 0 5px 20px;

    &-vertical {
      display: inline-flex;
    }
  }
}
</style>
