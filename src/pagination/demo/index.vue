<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-pagination
        v-model="currentPage1"
        :total-items="24"
        :items-per-page="5"
        :prev-text="t('prevText')"
        :next-text="t('nextText')"
      />
    </demo-block>

    <demo-block :title="t('title2')">
      <vm-pagination
        v-model="currentPage2"
        :page-count="12"
        :prev-text="t('prevText')"
        :next-text="t('nextText')"
        mode="simple"
        size="small"
      />
    </demo-block>

    <demo-block :title="t('title3')">
      <vm-pagination
        v-model="currentPage3"
        force-ellipses
        :total-items="125"
        :show-page-size="3"
        :prev-text="t('prevText')"
        :next-text="t('nextText')"
      />
    </demo-block>

    <demo-block :title="t('title4')">
      <vm-pagination
        v-model="currentPage4"
        :total-items="125"
        :show-page-size="5"
      >
        <template #prev-text>
          <vm-icon name="arrow-left" />
        </template>
        <template #next-text>
          <vm-icon name="arrow-right" />
        </template>
        <template #page="{ text }">{{ text }}</template>
      </vm-pagination>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        title2: "简单模式",
        title3: "显示省略号",
        title4: "自定义按钮",
        prevText: "上一页",
        nextText: "下一页"
      },
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPage4: 1
    };
  },
  methods: {
    t(name) {
      return this.info[name];
    }
  },
  watch: {
    currentPage4() {
      console.log(this.currentPage4);
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-pagination {
  .vm-pagination {
    width: 100%;
    margin: 5px 0;
  }

  .vm-doc-demo-block {
    padding: 0 @padding-md;
  }

  .vm-doc-demo-block__title {
    padding-left: 0;
  }
}
</style>
