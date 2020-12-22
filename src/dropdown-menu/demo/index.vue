<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-dropdown-menu>
        <vm-dropdown-item v-model="value1" :options="option1" />
        <vm-dropdown-item v-model="value2" :options="option2" />
      </vm-dropdown-menu>
    </demo-block>

    <demo-block :title="t('customContent')">
      <vm-dropdown-menu>
        <vm-dropdown-item v-model="value1" :options="option1" />
        <vm-dropdown-item :title="t('itemTitle')" ref="item">
          <vm-cell center :title="t('switchTitle1')">
            <template #right-icon>
              <vm-switch v-model="switch1" size="24" :active-color="RED" />
            </template>
          </vm-cell>
          <vm-cell center :title="t('switchTitle2')">
            <template #right-icon>
              <vm-switch v-model="switch2" size="24" :active-color="RED" />
            </template>
          </vm-cell>
          <div style="padding: 5px 16px;">
            <vm-button
              class="bg-blue"
              block
              round
              style="height: 40px;"
              @click="onConfirm"
            >
              {{ t("confirm") }}
            </vm-button>
          </div>
        </vm-dropdown-item>
      </vm-dropdown-menu>
    </demo-block>

    <demo-block :title="t('customActiveColor')">
      <vm-dropdown-menu active-color="#1989fa">
        <vm-dropdown-item v-model="value1" :options="option1" />
        <vm-dropdown-item v-model="value2" :options="option2" />
      </vm-dropdown-menu>
    </demo-block>

    <demo-block :title="t('expandDirection')">
      <vm-dropdown-menu direction="up">
        <vm-dropdown-item v-model="value1" :options="option1" />
        <vm-dropdown-item v-model="value2" :options="option2" />
      </vm-dropdown-menu>
    </demo-block>

    <demo-block :title="t('disableMenu')">
      <vm-dropdown-menu>
        <vm-dropdown-item v-model="value1" disabled :options="option1" />
        <vm-dropdown-item v-model="value2" disabled :options="option2" />
      </vm-dropdown-menu>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        disableMenu: "禁用菜单",
        switchTitle1: "包邮",
        switchTitle2: "团购",
        itemTitle: "筛选",
        confirm: "确认",
        expandDirection: "向上展开",
        customContent: "自定义菜单内容",
        customActiveColor: "自定义选中态颜色",
        option1: [
          { text: "全部商品", value: 0 },
          { text: "新款商品", value: 1 },
          { text: "活动商品", value: 2 }
        ],
        option2: [
          { text: "默认排序", value: "a" },
          { text: "好评排序", value: "b" },
          { text: "销量排序", value: "c" }
        ]
      },
      RED: "#ee0a24",
      switch1: true,
      switch2: false,
      value1: 0,
      value2: "a"
    };
  },

  computed: {
    option1() {
      return this.t("option1");
    },

    option2() {
      return this.t("option2");
    }
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    onConfirm() {
      this.$refs.item.toggle();
    }
  }
};
</script>
