<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-collapse
        v-model="active1">
        <vm-collapse-item
          title="标题">
          内容
        </vm-collapse-item>
        <vm-collapse-item
          title="标题">
          内容
        </vm-collapse-item>
        <vm-collapse-item
          title="标题"
          disabled
        >
          内容
        </vm-collapse-item>
      </vm-collapse>
    </demo-block>

    <demo-block title="手风琴">
      <vm-collapse
        v-model="active2"
        accordion
      >
        <vm-collapse-item
          short-border
          title="标题1"
        >
          内容1
        </vm-collapse-item>
        <vm-collapse-item
          short-border
          title="标题2"
        >
          内容2
        </vm-collapse-item>
        <vm-collapse-item
          short-border
          title="标题3"
        >
          内容3
        </vm-collapse-item>
      </vm-collapse>
    </demo-block>

    <demo-block title="标题插槽">
      <vm-collapse v-model="active3">
        <vm-collapse-item>
          <template v-slot:title>
            标题
            <vm-icon name="map"/>
          </template>
          内容
        </vm-collapse-item>
        <vm-collapse-item
          title="标题"
          value="内容"
          icon="map"
        >
          内容
        </vm-collapse-item>
      </vm-collapse>
    </demo-block>
  </demo-section>
</template>

<script>
  export default {
    data() {
      return {
        active1: [0],
        active2: 0,
        active3: []
      };
    },
  };
</script>

<style lang="less">
  @import "../../style/theme";

  .demo-collapse {
    .vm-icon-question-o {
      color: @blue;
      vertical-align: -3px;
      margin-left: 5px;
      font-size: 15px;
    }
  }
</style>
