<template>
  <demo-section>
    <vm-tabs v-model="activeTab">
      <vm-tab :title="t('basicUsage')">
        <vm-index-bar>
          <div v-for="index in indexList" :key="index">
            <vm-index-anchor :index="index" />
            <vm-cell :title="t('text')" />
            <vm-cell :title="t('text')" />
            <vm-cell :title="t('text')" />
          </div>
        </vm-index-bar>
      </vm-tab>

      <vm-tab :title="t('customIndexList')">
        <vm-index-bar :index-list="customIndexList" @change="onChange">
          <div v-for="index in customIndexList" :key="index">
            <vm-index-anchor :index="index">
              {{ t("title") + index }}
            </vm-index-anchor>
            <vm-cell :title="t('text')" />
            <vm-cell :title="t('text')" />
            <vm-cell :title="t('text')" />
          </div>
        </vm-index-bar>
      </vm-tab>
    </vm-tabs>
  </demo-section>
</template>

<script>
export default {
  data() {
    const indexList = [];
    const charCodeOfA = "A".charCodeAt(0);

    for (let i = 0; i < 26; i++) {
      indexList.push(String.fromCharCode(charCodeOfA + i));
    }

    return {
      activeTab: 0,
      indexList,
      customIndexList: [1, 2, 3, 4, 5, 6, 8, 9, 10],
      info: {
        basicUsage: "基础用法",
        title: "标题",
        text: "文本",
        customIndexList: "自定义索引列表"
      }
    };
  },
  methods: {
    t(name) {
      return this.info[name];
    },
    onChange(data) {
      console.log(data);
    }
  }
};
</script>
