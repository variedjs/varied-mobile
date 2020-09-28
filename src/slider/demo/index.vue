<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-slider
        v-model="value"
        @change="onChange"/>
    </demo-block>
    <demo-block title="指定组件高度">
      <vm-slider
        v-model="value7"
        @change="onChange"
        height="80px"/>
    </demo-block>
    <demo-block title="指定选择范围">
      <vm-slider
        v-model="value1"
        :min="-50"
        :max="50"
        @input="onChange"/>
    </demo-block>
    <demo-block title="禁用">
      <vm-slider
        v-model="value2"
        disabled
        @input="onChange"/>
    </demo-block>
    <demo-block title="指定步长">
      <vm-slider
        v-model="value3"
        :step="10"
        @input="onChange"/>
    </demo-block>
    <demo-block title="自定义样式">
      <vm-slider
        v-model="value4"
        inactive-color="#333"
        button-size="50px"
        bar-height="4px"
        @input="onChange"
        active-color="#ee0a24"/>
    </demo-block>
    <demo-block title="自定义按钮">
      <vm-slider
        v-model="value5"
        active-color="#ee0a24"
        @input="onChange">
        <template #button>
          <vm-icon name="asterisk" :size="50"/>
        </template>
      </vm-slider>
    </demo-block>
    <demo-block title="垂直方向">
      <vm-slider
        v-model="value6"
        @input="onChange"
        height="100px"
        vertical/>
    </demo-block>
  </demo-section>
</template>

<script>
  export default {
    data() {
      return {
        value: 50,
        value1: 50,
        value2: 50,
        value3: 50,
        value4: 50,
        value5: 50,
        value6: 50,
        value7: 50,
      };
    },

    methods: {
      onChange(value) {
        this.$toast('当前值：' + value);
      },
    }
  };
</script>
