<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-cell-group>
        <vm-cell
          title="标题"
          value="内容"
        />
        <vm-cell
          title="标题"
          value="内容"
          label="描述"
        />
      </vm-cell-group>
    </demo-block>
    <demo-block title="短边框">
      <vm-cell-group>
        <vm-cell
          title="标题"
          value="内容"
          short-border
        />
        <vm-cell
          title="标题"
          value="内容"
          label="描述"
          short-border
        />
      </vm-cell-group>
    </demo-block>
    <demo-block title="标题大小">
      <vm-cell
        title="标题"
        value="内容"
        size="large"
      />
      <vm-cell
        title="标题"
        value="内容"
        size="large"
        label="描述"
      />
    </demo-block>
    <demo-block title="展示图标">
      <vm-cell
        title="标题"
        value="内容"
        icon="address-book"
      />
    </demo-block>
    <demo-block title="只有内容">
      <vm-cell value="内容" />
    </demo-block>

    <demo-block title="显示箭头">
      <vm-cell
        title="标题"
        is-link
      />
      <vm-cell
        title="标题"
        is-link
        value="内容"
      />
      <vm-cell
        title="标题"
        is-link
        arrow-direction="down"
        value="内容"
      />
    </demo-block>

    <demo-block title="路由">
      <vm-cell
        title="标题"
        is-link
        target="https://github.com/variedjs/varied-mobile"
      />
    </demo-block>

    <demo-block title="高级用法">
      <vm-cell
        title="标题"
        icon="bank"
        is-link
      />
      <vm-cell title="标题">
        <vm-icon
          v-slot:right-icon
          name="search"
          class="custom-icon"
        />
      </vm-cell>
    </demo-block>
  </demo-section>
</template>
<style lang="less">
.demo-cell {
  .custom-text {
    margin-right: 5px;
    vertical-align: middle;
  }

  .custom-icon {
    line-height: 24px;
  }
}
</style>
