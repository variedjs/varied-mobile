<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-radio-group v-model="radio1" class="demo-radio-group">
        <vm-radio name="1">{{ t("radio") }} 1</vm-radio>
        <vm-radio name="2">{{ t("radio") }} 2</vm-radio>
      </vm-radio-group>
    </demo-block>

    <demo-block :title="t('horizontal')">
      <vm-radio-group
        v-model="radioHorizontal"
        class="demo-radio-group"
        direction="horizontal"
      >
        <vm-radio name="1">{{ t("radio") }} 1</vm-radio>
        <vm-radio name="2">{{ t("radio") }} 2</vm-radio>
      </vm-radio-group>
    </demo-block>

    <demo-block :title="t('disabled')">
      <vm-radio-group v-model="radio2" class="demo-radio-group" disabled>
        <vm-radio name="1">{{ t("radio") }} 1</vm-radio>
        <vm-radio name="2">{{ t("radio") }} 2</vm-radio>
      </vm-radio-group>
    </demo-block>

    <demo-block :title="t('customShape')">
      <vm-radio-group v-model="radioShape" class="demo-radio-group">
        <vm-radio name="1" shape="square">{{ t("radio") }} 1</vm-radio>
        <vm-radio name="2" shape="square">{{ t("radio") }} 2</vm-radio>
      </vm-radio-group>
    </demo-block>

    <demo-block :title="t('customColor')">
      <vm-radio-group v-model="radio3" class="demo-radio-group">
        <vm-radio name="1" checked-color="#07c160">
          {{ t("radio") }} 1
        </vm-radio>
        <vm-radio name="2" checked-color="#07c160">
          {{ t("radio") }} 2
        </vm-radio>
      </vm-radio-group>
    </demo-block>

    <demo-block :title="t('customIconSize')">
      <vm-radio-group v-model="radioIconSize" class="demo-radio-group">
        <vm-radio name="1" checked-color="#07c160" icon-size="24px">
          {{ t("radio") }} 1
        </vm-radio>
        <vm-radio name="2" checked-color="#07c160" icon-size="24px">
          {{ t("radio") }} 2
        </vm-radio>
      </vm-radio-group>
    </demo-block>

    <demo-block :title="t('customIcon')">
      <vm-radio-group v-model="radio4" class="demo-radio-group">
        <vm-radio name="1">
          {{ t("radio") }} 1
          <template #icon="{ checked }">
            <img :src="checked ? icon.active : icon.inactive" />
          </template>
        </vm-radio>
        <vm-radio name="2">
          {{ t("radio") }} 2
          <template #icon="{ checked }">
            <img :src="checked ? icon.active : icon.inactive" />
          </template>
        </vm-radio>
      </vm-radio-group>
    </demo-block>

    <demo-block :title="t('disableLabel')">
      <vm-radio-group v-model="radioLabel" class="demo-radio-group">
        <vm-radio name="1" label-disabled>{{ t("radio") }} 1</vm-radio>
        <vm-radio name="2" label-disabled>{{ t("radio") }} 2</vm-radio>
      </vm-radio-group>
    </demo-block>

    <demo-block :title="t('withCell')">
      <vm-radio-group v-model="radio5">
        <vm-cell-group>
          <vm-cell clickable :title="t('radio') + 1" @click="radio5 = '1'">
            <vm-radio name="1" slot="right-icon" />
          </vm-cell>
          <vm-cell clickable :title="t('radio') + 2" @click="radio5 = '2'">
            <vm-radio name="2" slot="right-icon" />
          </vm-cell>
        </vm-cell-group>
      </vm-radio-group>
    </demo-block>
  </demo-section>
</template>
<script>
export default {
  data() {
    return {
      text: {
        radio: "单选框",
        text1: "未选中禁用",
        text2: "选中且禁用",
        withCell: "与 Cell 组件一起使用",
        horizontal: "水平排列",
        customIcon: "自定义图标",
        customColor: "自定义颜色",
        customShape: "自定义形状",
        customIconSize: "自定义大小",
        disableLabel: "禁用文本点击"
      },
      radio1: "1",
      radio2: "2",
      radio3: "1",
      radio4: "1",
      radio5: "1",
      radioLabel: "1",
      radioShape: "1",
      radioIconSize: "1",
      radioHorizontal: "1",
      icon: {
        active:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/active-tick.svg",
        inactive:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/inactive-tick.svg"
      }
    };
  },
  methods: {
    t(name) {
      return this.text[name];
    }
  }
};
</script>
<style lang="less">
@import "../../style/theme";

.demo-radio {
  background: @white;

  &-group {
    padding: 0 16px;

    .vm-radio {
      margin-bottom: 8px;
    }
  }

  img {
    height: 20px;
  }

  .vm-doc-demo-block__title {
    margin-top: -8px;
  }
}
</style>
