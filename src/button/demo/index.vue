<template>
  <demo-section>
    <demo-block title="按钮形状">
      <vm-row type="flex" align="center">
        <vm-button tag="span" class="bg-cyan">默认</vm-button>
        <vm-button radius="mc" class="bg-cyan">
          小圆角
        </vm-button>
        <vm-button radius="sc" class="bg-cyan">
          半圆角
        </vm-button>
        <vm-button radius="fc" class="bg-cyan shadow-blue">
          <vm-icon name="opera" />
        </vm-button>
      </vm-row>
    </demo-block>
    <demo-block title="朴素按钮">
      <vm-button class="border-blue">
        海蓝
      </vm-button>
      <vm-button class="border-red">
        嫣红
      </vm-button>
      <vm-button class="border-orange">
        桔橙
      </vm-button>
      <vm-button class="border-yellow">
        明黄
      </vm-button>
    </demo-block>
    <demo-block title="阴影">
      <vm-button class="bg-purple shadow">
        姹紫
      </vm-button>
      <vm-button class="bg-mauve shadow">
        木槿
      </vm-button>
      <vm-button class="bg-pink shadow">
        桃粉
      </vm-button>
      <vm-button class="bg-brown shadow">
        棕褐
      </vm-button>
    </demo-block>
    <demo-block title="大小">
      <vm-button class="bg-green" size="sm">
        小尺寸
      </vm-button>
      <vm-button class="bg-green">默认</vm-button>
      <vm-button class="bg-green" size="lg">
        大尺寸
      </vm-button>
    </demo-block>
    <demo-block title="块状按钮">
      <vm-button block size="lg" class="bg-blue">
        块状
      </vm-button>
    </demo-block>
    <demo-block title="加载">
      <vm-button class="bg-green" loading />
      <vm-button class="bg-red" loading loading-text="加载中..." />
    </demo-block>
    <demo-block title="禁用状态">
      <vm-button class="bg-green" disabled>
        禁用状态
      </vm-button>
    </demo-block>
    <demo-block title="高级">
      <vm-button class="bg-green">
        <vm-icon name="search" />
        <span>按钮</span>
      </vm-button>
    </demo-block>
    <demo-block title="自定义宽高">
      <vm-button width="100px" height="30px" class="bg-cyan">
        默认
      </vm-button>
    </demo-block>
    <demo-block title="自定义宽高">
      <vm-button @longPress="onLongPress" :longPressTime="500" class="bg-cyan">
        长按
      </vm-button>
    </demo-block>
  </demo-section>
</template>
<script>
export default {
  methods: {
    onLongPress() {
      this.$toast("长按");
    }
  }
};
</script>
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
