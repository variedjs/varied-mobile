<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <vm-cell is-link :title="t('showSheet')" @click="show.basic = true" />
      <vm-share-sheet
        v-model="show.basic"
        :title="t('title')"
        :options="options"
        @select="onSelect"
      />
    </demo-block>

    <demo-block card :title="t('multiLine')">
      <vm-cell is-link :title="t('showSheet')" @click="show.multiLine = true" />
      <vm-share-sheet
        v-model="show.multiLine"
        :title="t('title')"
        :options="multiLineOptions"
        @select="onSelect"
      />
    </demo-block>

    <demo-block card :title="t('customIcon')">
      <vm-cell
        is-link
        :title="t('showSheet')"
        @click="show.customIcon = true"
      />
      <vm-share-sheet
        v-model="show.customIcon"
        :options="customIconOptions"
        @select="onSelect"
      />
    </demo-block>

    <demo-block card :title="t('withDesc')">
      <vm-cell is-link :title="t('showSheet')" @click="show.withDesc = true" />
      <vm-share-sheet
        v-model="show.withDesc"
        :title="t('title')"
        :options="optionsWithDesc"
        :description="t('description')"
        @select="onSelect"
      />
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        qq: "QQ",
        name: "名称",
        link: "复制链接",
        title: "立即分享给好友",
        weibo: "微博",
        wechat: "微信",
        poster: "分享海报",
        qrcode: "二维码",
        multiLine: "展示多行选项",
        showSheet: "显示分享面板",
        withDesc: "展示描述信息",
        customIcon: "自定义图标",
        description: "描述信息",
        weappQrcode: "小程序码"
      },
      show: {
        basic: false,
        withDesc: false,
        multiLine: false,
        customIcon: false
      }
    };
  },

  computed: {
    options() {
      return [
        { name: this.t("wechat"), icon: "wechat" },
        { name: this.t("weibo"), icon: "weibo" },
        { name: this.t("link"), icon: "link" },
        { name: this.t("poster"), icon: "poster" },
        { name: this.t("qrcode"), icon: "qrcode" }
      ];
    },

    multiLineOptions() {
      return [
        [
          { name: this.t("wechat"), icon: "wechat" },
          { name: this.t("weibo"), icon: "weibo" },
          { name: this.t("qq"), icon: "qq" }
        ],
        [
          { name: this.t("link"), icon: "link" },
          { name: this.t("poster"), icon: "poster" },
          { name: this.t("qrcode"), icon: "qrcode" },
          { name: this.t("weappQrcode"), icon: "weapp-qrcode" }
        ]
      ];
    },

    customIconOptions() {
      return [
        {
          name: this.t("name"),
          icon: "https://img.yzcdn.cn/vant/custom-icon-fire.png"
        },
        {
          name: this.t("name"),
          icon: "https://img.yzcdn.cn/vant/custom-icon-light.png"
        },
        {
          name: this.t("name"),
          icon: "https://img.yzcdn.cn/vant/custom-icon-water.png"
        }
      ];
    },

    optionsWithDesc() {
      return [
        { name: this.t("wechat"), icon: "wechat" },
        { name: this.t("weibo"), icon: "weibo" },
        {
          name: this.t("link"),
          icon: "link",
          description: this.t("description")
        },
        { name: this.t("poster"), icon: "poster" },
        { name: this.t("qrcode"), icon: "qrcode" }
      ];
    }
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    onSelect(option) {
      this.$toast(option.name);
      this.show.basic = false;
      this.show.withDesc = false;
      this.show.multiLine = false;
      this.show.customIcon = false;
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";
</style>
