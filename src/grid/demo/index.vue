<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-grid>
        <vm-grid-item
          v-for="i in 4"
          :key="i"
          icon="file-image-o"
          :text="t('text')"
        />
      </vm-grid>
    </demo-block>

    <demo-block :title="t('columnNum')">
      <vm-grid :column-num="3">
        <vm-grid-item
          v-for="i in 6"
          :key="i"
          icon="file-image-o"
          :text="t('text')"
        />
      </vm-grid>
    </demo-block>

    <demo-block :title="t('customContent')">
      <vm-grid :border="false" :column-num="3">
        <vm-grid-item>
          <vm-image
            fit="contain"
            src="https://wuner.gitee.io/static-resources/varied-mobile/static/universe-1.jpg"
          />
        </vm-grid-item>
        <vm-grid-item>
          <vm-image
            fit="contain"
            src="https://wuner.gitee.io/static-resources/varied-mobile/static/universe-2.jpg"
          />
        </vm-grid-item>
        <vm-grid-item>
          <vm-image
            fit="contain"
            src="https://wuner.gitee.io/static-resources/varied-mobile/static/universe-3.jpg"
          />
        </vm-grid-item>
      </vm-grid>
    </demo-block>

    <demo-block :title="t('square')">
      <vm-grid square>
        <vm-grid-item
          v-for="i in 8"
          :key="i"
          icon="file-image-o"
          :text="t('text')"
        />
      </vm-grid>
    </demo-block>

    <demo-block :title="t('gutter')">
      <vm-grid :gutter="10">
        <vm-grid-item
          v-for="i in 8"
          :key="i"
          icon="file-image-o"
          :text="t('text')"
        />
      </vm-grid>
    </demo-block>

    <demo-block :title="t('horizontal')">
      <vm-grid direction="horizontal" :column-num="3">
        <vm-grid-item icon="file-image-o" :text="t('text')" />
        <vm-grid-item icon="file-image-o" :text="t('text')" />
        <vm-grid-item icon="file-image-o" :text="t('text')" />
      </vm-grid>
    </demo-block>

    <demo-block :title="t('route')">
      <vm-grid clickable :column-num="2">
        <vm-grid-item icon="home" :text="t('vueRoute')" to="/" />
        <vm-grid-item icon="search" :text="t('urlRoute')" url="/mobile.html" />
      </vm-grid>
    </demo-block>

    <demo-block :title="t('showBadge')">
      <vm-grid :column-num="2">
        <vm-grid-item icon="home" :text="t('text')" dot />
        <vm-grid-item icon="search" :text="t('text')" badge="99+" />
      </vm-grid>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        text: "文字",
        route: "页面导航",
        gutter: "格子间距",
        square: "正方形格子",
        columnNum: "自定义列数",
        customContent: "自定义内容",
        urlRoute: "URL 跳转",
        vueRoute: "路由跳转",
        showBadge: "徽标提示",
        horizontal: "内容横排"
      }
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
</style>
