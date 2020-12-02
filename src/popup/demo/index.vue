<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-cell @click="show1 = true" title="弹出 Popup" is-link></vm-cell>
      <vm-popup v-model="show1">内容</vm-popup>
    </demo-block>

    <demo-block title="弹出位置">
      <vm-cell @click="show2 = true" title="弹出 Dialog" is-link></vm-cell>

      <vm-popup v-model="show2" position="bottom">
        <vm-picker
          show-toolbar
          :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']"
          @confirm="show2 = false"
          @cancel="show2 = false"
        />
      </vm-popup>

      <vm-cell @click="show3 = true" title="顶部弹出" is-link></vm-cell>

      <vm-popup v-model="show3" position="top" :overlay="false">
        内容
      </vm-popup>

      <vm-cell @click="show4 = true" title="右侧弹出" is-link></vm-cell>
      <vm-popup v-model="show4" position="right">
        <vm-button @click="show4 = false">关闭弹层</vm-button>
        <vm-button @click="show5 = true">右侧弹出</vm-button>
        <vm-popup v-model="show5" position="right">
          <vm-button @click="show5 = false">关闭弹层</vm-button>
        </vm-popup>
      </vm-popup>
    </demo-block>
    <demo-block card title="关闭图标">
      <vm-cell title="关闭图标" is-link @click="showCloseIcon = true" />
      <vm-cell title="自定义图标" is-link @click="showCustomCloseIcon = true" />
      <vm-cell
        title="图标位置"
        is-link
        @click="showCustomIconPosition = true"
      />

      <vm-popup
        v-model="showCloseIcon"
        closeable
        position="bottom"
        :style="{ height: '30%' }"
      />
      <vm-popup
        v-model="showCustomCloseIcon"
        closeable
        close-icon="window-close"
        position="bottom"
        :style="{ height: '30%' }"
      />
      <vm-popup
        v-model="showCustomIconPosition"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '30%' }"
      />
    </demo-block>
    <demo-block card title="圆角弹窗">
      <vm-cell title="圆角弹窗" is-link @click="showRoundCorner = true" />
      <vm-popup
        v-model="showRoundCorner"
        round
        position="bottom"
        :style="{ height: '30%' }"
      />
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      showRoundCorner: false,
      showCloseIcon: false,
      showCustomCloseIcon: false,
      showCustomIconPosition: false
    };
  },

  watch: {
    show3(val) {
      if (val) {
        setTimeout(() => {
          this.show3 = false;
        }, 2000);
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-popup {
  .vm-button {
    margin: 10px 0 10px 15px;
  }

  .vm-popup {
    width: 60%;
    padding: 20px;
    box-sizing: border-box;

    &-bottom {
      width: 100%;
      padding: 0;
    }

    .vm-tabs__content {
      height: 156px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .vm-tab-pane:not(:first-child) {
      padding: 10px;
      line-height: 1.4;
      color: @gray-6;
    }

    &-top {
      color: @white;
      width: 100%;
      border-radius: 0;
      line-height: 20px;
      background-color: rgba(0, 0, 0, 0.8);
    }

    &-left,
    &-right {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
