<template>
  <demo-section>
    <demo-block title="Circular">
      <vm-loading />
      <vm-loading color="white" />
    </demo-block>

    <demo-block title="Spinner">
      <vm-loading type="spinner" />
      <vm-loading
        type="spinner"
        color="white"
      />
    </demo-block>
  </demo-section>
</template>
<style lang="less">
.demo-loading {
  .vm-loading {
    display: inline-block;
    margin: 5px 0 5px 20px;
  }

  .vm-loading-white {
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .5);
  }
}
</style>
