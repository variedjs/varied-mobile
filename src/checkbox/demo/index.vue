<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <demo-section>
    <demo-block title="基础用法">
      <vm-checkbox v-model="checked">复选框</vm-checkbox>
    </demo-block>
    <demo-block title="禁用状态">
      <vm-checkbox :value="false" disabled>
        复选框
      </vm-checkbox>
      <vm-checkbox :value="true" disabled>
        复选框
      </vm-checkbox>
    </demo-block>
    <demo-block title="形状">
      <vm-checkbox v-model="checked" shape="square">
        复选框
      </vm-checkbox>
    </demo-block>
    <demo-block title="自定义颜色">
      <vm-checkbox v-model="checked" checked-color="#4b0">
        复选框
      </vm-checkbox>
    </demo-block>
    <demo-block title="自定义大小">
      <vm-checkbox v-model="checked" icon-size="30">
        复选框
      </vm-checkbox>
    </demo-block>
    <demo-block title="自定义图标">
      <vm-checkbox class="my-checkbox" v-model="checked">
        自定义图标
        <template v-slot:icon="slotProps">
          <img :src="slotProps.checked ? icon.active : icon.normal" />
        </template>
      </vm-checkbox>
    </demo-block>
    <demo-block title="复选框">
      <vm-checkbox-group v-model="result">
        <vm-checkbox v-for="item in list" :key="item" :name="item">
          复选框 {{ item }}
        </vm-checkbox>
      </vm-checkbox-group>
    </demo-block>
    <demo-block title="水平排列">
      <vm-checkbox-group v-model="result" direction="horizontal">
        <vm-checkbox v-for="item in list" :key="item" :name="item">
          复选框 {{ item }}
        </vm-checkbox>
      </vm-checkbox-group>
    </demo-block>
    <demo-block title="最大数量">
      <vm-checkbox-group v-model="result2" :max="2">
        <vm-checkbox v-for="item in list" :key="item" :name="item">
          复选框 {{ item }}
        </vm-checkbox>
      </vm-checkbox-group>
    </demo-block>
    <demo-block title="配合单元格组件">
      <vm-checkbox-group v-model="result3">
        <vm-cell-group>
          <vm-cell
            v-for="(item, index) in list"
            clickable
            :key="index"
            :title="'复选框' + item"
            @click="toggle(index)"
          >
            <vm-checkbox ref="checkboxes" :name="item" />
          </vm-cell>
        </vm-cell-group>
      </vm-checkbox-group>
    </demo-block>
  </demo-section>
</template>
<script>
export default {
  data() {
    return {
      checked: true,
      list: ["a", "b", "c"],
      result: ["a", "b"],
      result2: [],
      result3: [],
      icon: {
        normal:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/inactive-tick.svg",
        active:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/active-tick.svg"
      }
    };
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    }
  }
};
</script>
<style lang="less">
.demo-checkbox {
  .vm-checkbox {
    margin: 10px 0 0 20px;
  }

  .my-checkbox .vm-checkbox-icon {
    width: 30px;
    height: 30px;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .vm-cell {
    .vm-checkbox {
      margin: 0;
    }

    .vm-cell-value {
      flex: none;
    }
  }
}
</style>
