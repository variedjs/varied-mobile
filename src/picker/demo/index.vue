<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-picker
        :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']"
        @change="onChange1"
      />
    </demo-block>

    <demo-block title="禁用选项">
      <vm-picker
        :columns="[
          { text: '杭州', disabled: true },
          { text: '宁波' },
          { text: '温州' }
        ]"
      />
    </demo-block>

    <demo-block title="展示顶部栏">
      <vm-picker
        show-toolbar
        title="标题"
        :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </demo-block>

    <demo-block title="多列不联动">
      <vm-picker
        :columns="[
        {
          values: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        },
        {
          values: ['福州', '厦门', '莆田', '三明', '泉州'],
          defaultIndex: 2
        }
      ]"
        @change="onChange3"
      />
    </demo-block>

    <demo-block title="多列联动">
      <vm-picker
        :columns="columns"
        @change="onChange2"
      />
    </demo-block>

    <demo-block title="加载状态">
      <vm-picker
        loading
        :columns="columns"
      />
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  computed: {
    columns() {
      const column = {
        '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        '福建': ['福州', '厦门', '莆田', '三明', '泉州']
      };
      return [
        {
          values: Object.keys(column),
          className: 'column1'
        },
        {
          values: column[Object.keys(column)[0]],
          className: 'column2',
          defaultIndex: 2
        }
      ];
    },
  },

  methods: {
    toastContent: (value, index) => `当前值：${value}, 当前索引：${index}`,
    onChange1(picker, value, index) {
      this.$toast(this.toastContent(value, index));
    },
    onChange3(picker, value, index) {
      this.$toast(this.toastContent(picker.getColumnValue(index),picker.getColumnIndex(index)));
    },
    onChange2(picker, values) {
      const column = {
        '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        '福建': ['福州', '厦门', '莆田', '三明', '泉州']
      };
      picker.setColumnValues(1, column[values[0]]);
    },
    onConfirm(value, index) {
      this.$toast(this.toastContent(value, index));
    },
    onCancel() {
      this.$toast('取消');
    }
  }
};
</script>
