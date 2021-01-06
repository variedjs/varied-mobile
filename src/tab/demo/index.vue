<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-tabs v-model="active">
        <vm-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('matchByName')">
      <vm-tabs v-model="activeName">
        <vm-tab name="a" :title="t('tab') + 1"> {{ t("content") }} 1 </vm-tab>
        <vm-tab name="b" :title="t('tab') + 2"> {{ t("content") }} 2 </vm-tab>
        <vm-tab name="c" :title="t('tab') + 3"> {{ t("content") }} 3 </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('title2')">
      <vm-tabs>
        <vm-tab v-for="index in 8" :title="t('tab') + index" :key="index">
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('title3')">
      <vm-tabs @disabled="onClickDisabled">
        <vm-tab
          v-for="index in 3"
          :title="t('tab') + index"
          :disabled="index === 2"
          :key="index"
        >
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('title4')">
      <vm-tabs type="card">
        <vm-tab v-for="index in 3" :title="t('tab') + index" :key="index">
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('title5')">
      <vm-tabs @click="onClick">
        <vm-tab v-for="index in 2" :title="t('tab') + index" :key="index">
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('title6')">
      <vm-tabs :active="active" sticky>
        <vm-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('title7')">
      <vm-tabs :active="active">
        <template v-slot:title="{ title }">
          <vm-icon name="address-book" />{{ title }}
        </template>
        <vm-tab
          v-for="(item, index) in [{ title: 'a标签' }, { title: 'b标签' }]"
          :key="index"
          :title="item.title"
        >
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('title8')">
      <vm-tabs animated>
        <vm-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('title9')">
      <vm-tabs :active="active" swipeable>
        <vm-tab :title="t('tab') + index" v-for="index in tabs" :key="index">
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('title10')">
      <vm-tabs scrollspy sticky>
        <vm-tab :title="t('tab') + index" v-for="index in 8" :key="index">
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>

    <demo-block :title="t('beforeChange')">
      <vm-tabs :before-change="beforeChange">
        <vm-tab :title="t('tab') + index" v-for="index in 4" :key="index">
          {{ t("content") }} {{ index }}
        </vm-tab>
      </vm-tabs>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      activeName: "b",
      tabs: [1, 2, 3, 4],
      info: {
        basicUsage: "基础用法",
        content: "内容 ",
        tab: "标签 ",
        title2: "标签栏滚动",
        title3: "禁用标签",
        title4: "样式风格",
        title5: "点击事件",
        title6: "粘性布局",
        title7: "自定义标签",
        title8: "切换动画",
        title9: "滑动切换",
        title10: "滚动导航",
        disabled: " 已被禁用",
        matchByName: "通过名称匹配",
        beforeChange: "异步切换"
      }
    };
  },

  methods: {
    onClickDisabled(index, title) {
      this.$toast(title + this.t("disabled"));
    },

    onClick(index, title) {
      this.$toast(title);
    },

    beforeChange(name) {
      if (name === 1) {
        return false;
      }

      return new Promise(resolve => {
        resolve(name !== 3);
      });
    },
    t(name) {
      return this.info[name];
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-tab {
  margin-bottom: 80vh;

  .vm-tab .vm-icon {
    margin-right: 5px;
    vertical-align: -2px;
  }

  .vm-tab-pane {
    padding: 24px 20px;
    background-color: @white;
  }

  .vm-tabs-card .vm-tab-pane {
    background-color: transparent;
  }
}
</style>
