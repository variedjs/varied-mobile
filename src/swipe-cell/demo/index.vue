<template>
  <div>
    <demo-section>
      <demo-block :title="t('basicUsage')">
        <vm-swipe-cell>
          <template #left>
            <vm-button class="bg-blue" size="lg" :text="t('select')" />
          </template>
          <vm-cell :border="false" :title="t('title')" :value="t('content')" />
          <template #right>
            <vm-button class="bg-red" size="lg" :text="t('delete')" />
            <vm-button class="bg-blue" size="lg" :text="t('collect')" />
          </template>
        </vm-swipe-cell>
      </demo-block>

      <demo-block :title="t('customContent')">
        <vm-swipe-cell>
          <vm-image
            width="100"
            height="100"
            src="https://wuner.gitee.io/static-resources/varied-mobile/static/landscape-3.jpg"
          />
          <template #right>
            <vm-button class="delete-button bg-red" :text="t('delete')" />
          </template>
        </vm-swipe-cell>
      </demo-block>

      <demo-block :title="t('beforeClose')">
        <vm-swipe-cell :before-close="beforeClose">
          <template #left>
            <vm-button size="lg" class="bg-blue" :text="t('select')" />
          </template>
          <vm-cell :border="false" :title="t('title')" :value="t('content')" />
          <template #right>
            <vm-button size="lg" class="bg-red" :text="t('delete')" />
          </template>
        </vm-swipe-cell>
      </demo-block>
    </demo-section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        select: "选择",
        delete: "删除",
        collect: "收藏",
        title: "单元格",
        confirm: "确定删除吗？",
        cardTitle: "商品标题",
        beforeClose: "异步关闭",
        customContent: "自定义内容"
      },
      imageURL:
        "https://wuner.gitee.io/static-resources/varied-mobile/static/ipad.jpeg"
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.$dialog
            .confirm({
              message: this.t("confirm")
            })
            .then(() => {
              instance.close();
            });
          break;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-swipe-cell {
  user-select: none;

  .vm-card {
    margin: 0;
    background-color: @white;
  }

  .delete-button {
    height: 100%;
  }
}
</style>
