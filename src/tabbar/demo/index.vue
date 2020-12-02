<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-tabbar v-model="active">
        <vm-tabbar-item icon="home">{{ t("tab") }}</vm-tabbar-item>
        <vm-tabbar-item icon="anchor">{{ t("tab") }}</vm-tabbar-item>
        <vm-tabbar-item icon="calendar-check-o">{{ t("tab") }}</vm-tabbar-item>
        <vm-tabbar-item icon="user">{{ t("tab") }}</vm-tabbar-item>
      </vm-tabbar>
    </demo-block>

    <demo-block :title="t('matchByName')">
      <vm-tabbar v-model="activeName">
        <vm-tabbar-item name="home" icon="home">
          {{ t("tab") }}
        </vm-tabbar-item>
        <vm-tabbar-item name="anchor" icon="anchor">
          {{ t("tab") }}
        </vm-tabbar-item>
        <vm-tabbar-item name="friends" icon="calendar-check-o">
          {{ t("tab") }}
        </vm-tabbar-item>
        <vm-tabbar-item name="setting" icon="user">
          {{ t("tab") }}
        </vm-tabbar-item>
      </vm-tabbar>
    </demo-block>

    <demo-block :title="t('badge')">
      <vm-tabbar v-model="active2">
        <vm-tabbar-item icon="home">{{ t("tab") }}</vm-tabbar-item>
        <vm-tabbar-item icon="anchor" dot>{{ t("tab") }}</vm-tabbar-item>
        <vm-tabbar-item icon="calendar-check-o" badge="5">
          {{ t("tab") }}
        </vm-tabbar-item>
        <vm-tabbar-item icon="user" badge="20">
          {{ t("tab") }}
        </vm-tabbar-item>
      </vm-tabbar>
    </demo-block>

    <demo-block :title="t('customIcon')">
      <vm-tabbar v-model="active3">
        <vm-tabbar-item badge="3">
          <span>{{ t("custom") }}</span>
          <template #icon="props">
            <img :src="props.active ? icon.active : icon.inactive" />
          </template>
        </vm-tabbar-item>
        <vm-tabbar-item icon="anchor">{{ t("tab") }}</vm-tabbar-item>
        <vm-tabbar-item icon="user">{{ t("tab") }}</vm-tabbar-item>
      </vm-tabbar>
    </demo-block>

    <demo-block :title="t('customColor')">
      <vm-tabbar v-model="active4" active-color="#07c160" inactive-color="#000">
        <vm-tabbar-item icon="home">{{ t("tab") }}</vm-tabbar-item>
        <vm-tabbar-item icon="anchor">{{ t("tab") }}</vm-tabbar-item>
        <vm-tabbar-item icon="calendar-check-o">{{ t("tab") }}</vm-tabbar-item>
        <vm-tabbar-item icon="user">{{ t("tab") }}</vm-tabbar-item>
      </vm-tabbar>
    </demo-block>

    <demo-block :title="t('switchEvent')">
      <vm-tabbar v-model="active5" @change="onChange">
        <vm-tabbar-item icon="home">{{ t("tab") + 1 }}</vm-tabbar-item>
        <vm-tabbar-item icon="anchor">{{ t("tab") + 2 }}</vm-tabbar-item>
        <vm-tabbar-item icon="calendar-check-o">{{
          t("tab") + 3
        }}</vm-tabbar-item>
        <vm-tabbar-item icon="user">{{ t("tab") + 4 }}</vm-tabbar-item>
      </vm-tabbar>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      active2: 0,
      active3: 0,
      active4: 0,
      active5: 0,
      activeName: "home",
      icon: {
        active:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/active-dynamic.svg",
        inactive:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/inactive-dynamic.svg"
      },
      info: {
        basicUsage: "基础用法",
        tab: "标签",
        badge: "徽标提示",
        custom: "自定义",
        customIcon: "自定义图标",
        customColor: "自定义颜色",
        matchByName: "通过名称匹配",
        switchEvent: "监听切换事件",
        selectTip: "你切换到了"
      }
    };
  },

  methods: {
    onChange(index) {},
    t(name) {
      return this.info[name];
    }
  }
};
</script>

<style lang="less">
.demo-tabbar {
  .vm-tabbar {
    position: relative;
    padding-bottom: 0;
  }
}
</style>
