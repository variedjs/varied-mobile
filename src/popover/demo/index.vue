<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-popover
        v-model="show.lightTheme"
        trigger="click"
        :actions="t('actions')"
        placement="bottom-start"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <vm-button type="primary">
            {{ t("lightTheme") }}
          </vm-button>
        </template>
      </vm-popover>
      <vm-popover
        v-model="show.darkTheme"
        theme="dark"
        trigger="click"
        :actions="t('actions')"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <vm-button type="primary">
            {{ t("darkTheme") }}
          </vm-button>
        </template>
      </vm-popover>
    </demo-block>

    <demo-block :title="t('placement')">
      <vm-field
        is-link
        readonly
        name="picker"
        :label="t('choosePlacement')"
        @click="showPicker = true"
      />

      <vm-popup
        v-model="showPicker"
        round
        position="bottom"
        get-container="body"
      >
        <div class="demo-popover-box">
          <vm-popover
            v-model="show.placement"
            theme="dark"
            trigger="click"
            :actions="t('shortActions')"
            :placement="currentPlacement"
            @select="onSelect"
          >
            <template #reference>
              <div class="demo-popover-refer" />
            </template>
          </vm-popover>
        </div>
        <vm-picker :columns="placements" @change="onPickerChange" />
      </vm-popup>
    </demo-block>

    <demo-block :title="t('actionOptions')">
      <vm-popover
        v-model="show.showIcon"
        trigger="click"
        :actions="t('actionsWithIcon')"
        placement="bottom-start"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <vm-button type="primary">
            {{ t("showIcon") }}
          </vm-button>
        </template>
      </vm-popover>

      <vm-popover
        v-model="show.disableAction"
        trigger="click"
        :actions="t('actionsDisabled')"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <vm-button type="primary">
            {{ t("disableAction") }}
          </vm-button>
        </template>
      </vm-popover>
    </demo-block>

    <demo-block :title="t('customContent')">
      <vm-popover
        v-model="show.customContent"
        trigger="click"
        placement="top-start"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <vm-grid
          square
          clickable
          :border="false"
          column-num="3"
          style="width: 240px;"
        >
          <vm-grid-item
            v-for="i in 6"
            :key="i"
            icon="photo-o"
            :text="t('option')"
            @click="show.customContent = false"
          />
        </vm-grid>
        <template #reference>
          <vm-button type="primary">
            {{ t("customContent") }}
          </vm-button>
        </template>
      </vm-popover>
    </demo-block>
  </demo-section>
</template>

<script>
import Toast from "../../toast";

export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        actions: [{ text: "选项一" }, { text: "选项二" }, { text: "选项三" }],
        shortActions: [{ text: "选项一" }, { text: "选项二" }],
        actionsWithIcon: [
          { text: "选项一", icon: "add-o" },
          { text: "选项二", icon: "music-o" },
          { text: "选项三", icon: "more-o" }
        ],
        actionsDisabled: [
          { text: "选项一", disabled: true },
          { text: "选项二", disabled: true },
          { text: "选项三" }
        ],
        showIcon: "展示图标",
        placement: "弹出位置",
        darkTheme: "深色风格",
        lightTheme: "浅色风格",
        showPopover: "点击弹出气泡",
        actionOptions: "选项配置",
        customContent: "自定义内容",
        disableAction: "禁用选项",
        choosePlacement: "选择弹出位置"
      },
      show: {
        showIcon: false,
        placement: false,
        darkTheme: false,
        lightTheme: false,
        customContent: false,
        disableAction: false
      },
      showPicker: false,
      currentPlacement: "top",
      placements: [
        "top",
        "top-start",
        "top-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
        "bottom",
        "bottom-start",
        "bottom-end"
      ]
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    onPickerChange(picker, value) {
      setTimeout(() => {
        this.show.placement = true;
        this.currentPlacement = value;
      });
    },
    onSelect(action) {
      console.log(action);
      Toast(action.text);
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-popover {
  &-refer {
    width: 60px;
    height: 60px;
    background-color: @blue;
    border-radius: 8px;
  }

  .vm-field {
    width: auto;
    margin: 0 12px;
    overflow: hidden;
    border-radius: 8px;
  }

  &-box {
    display: flex;
    justify-content: center;
    margin: 110px 0;
  }
}
</style>
