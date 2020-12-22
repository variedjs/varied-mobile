<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-button
        class="bg-blue"
        :text="t('showOverlay')"
        style="margin-left: 16px;"
        @click="show = true"
      />

      <vm-overlay :show="show" @click="show = false" />
    </demo-block>

    <demo-block :title="t('embeddedContent')">
      <vm-button
        class="bg-blue"
        :text="t('embeddedContent')"
        style="margin-left: 16px;"
        @click="showEmbedded = true"
      />

      <vm-overlay :show="showEmbedded" @click="showEmbedded = false">
        <div class="wrapper">
          <div class="block" />
        </div>
      </vm-overlay>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        showOverlay: "显示遮罩层",
        embeddedContent: "嵌入内容"
      },
      show: false,
      showEmbedded: false
    };
  },
  methods: {
    t(name) {
      return this.info[name];
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-overlay {
  background: @white;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: @white;
  }
}
</style>
