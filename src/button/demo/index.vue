<template>
  <demo-section>
    <demo-block title="按钮形状">
      <vm-row
        type="flex"
        align="center"
      >
        <vm-button class="bg-cyan">默认</vm-button>
        <vm-button
          round
          class="bg-cyan"
        >
          圆角
        </vm-button>
        <vm-button
          fab
          class="bg-cyan shadow-blur"
        >
          <vm-icon name="opera" />
        </vm-button>
      </vm-row>
    </demo-block>
    <demo-block title="朴素按钮">
      <vm-button class="plain-blue">海蓝</vm-button>
      <vm-button class="plain-red">嫣红</vm-button>
      <vm-button class="plain-orange">桔橙</vm-button>
      <vm-button class="plain-yellow">明黄</vm-button>
    </demo-block>
    <demo-block title="阴影">
      <vm-button class="bg-purple shadow-blur">姹紫</vm-button>
      <vm-button class="bg-mauve shadow-blur">木槿</vm-button>
      <vm-button class="bg-pink shadow-blur">桃粉</vm-button>
      <vm-button class="bg-brown shadow-blur">棕褐</vm-button>
    </demo-block>
    <demo-block title="大小">
      <vm-button
        class="bg-green"
        size="sm"
      >
        小尺寸
      </vm-button>
      <vm-button class="bg-green">默认</vm-button>
      <vm-button
        class="bg-green"
        size="lg"
      >
        大尺寸
      </vm-button>
    </demo-block>
    <demo-block title="块状按钮">
      <vm-button
        block
        size="lg"
        class="bg-blue"
      >
        块状
      </vm-button>
    </demo-block>
    <demo-block title="加载">
      <vm-button
        class="bg-green"
        loading
      />
      <vm-button
        class="bg-red"
        loading
        loading-text="加载中..."
      />
    </demo-block>
    <demo-block title="禁用状态">
      <vm-button
        class="bg-green"
        disabled
      >
        禁用状态
      </vm-button>
    </demo-block>
    <demo-block title="高级">
      <vm-button class="bg-green">
        <vm-icon name="search" />
        <span>按钮</span>
      </vm-button>
    </demo-block>
  </demo-section>
</template>
<style lang="less">
.demo-button {
  .vm-button {
    user-select: none;
    margin-right: 10px;
  }

  .van-doc-demo-block {
    padding: 0 15px;
  }

  .van-doc-demo-block__title {
    padding-left: 0;
  }
}
</style>
