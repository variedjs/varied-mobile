<template>
  <demo-section name="pull-refresh">
    <vm-tabs>
      <vm-tab :title="t('basicUsage')">
        <vm-pull-refresh v-model="isLoading" @refresh="onRefresh(true)">
          <p>{{ tips }}</p>
        </vm-pull-refresh>
      </vm-tab>

      <vm-tab :title="t('successTip')">
        <vm-pull-refresh
          v-model="isLoading"
          :success-text="t('success')"
          @refresh="onRefresh(false)"
        >
          <p>{{ tips }}</p>
        </vm-pull-refresh>
      </vm-tab>

      <vm-tab :title="t('customTips')">
        <vm-pull-refresh
          v-model="isLoading"
          head-height="80"
          @refresh="onRefresh(true)"
        >
          <template #pulling="{ distance }">
            <img
              class="doge"
              src="https://wuner.gitee.io/static-resources/varied-mobile/static/landscape.jpg"
              :style="{ transform: `scale(${distance / 80})` }"
            />
          </template>
          <template #loosing>
            <img
              src="https://wuner.gitee.io/static-resources/varied-mobile/static/landscape-1.jpg"
              class="doge"
            />
          </template>
          <template #loading>
            <img
              src="https://wuner.gitee.io/static-resources/varied-mobile/static/landscape-2.jpg"
              class="doge"
            />
          </template>
          <p>{{ tips }}</p>
        </vm-pull-refresh>
      </vm-tab>
    </vm-tabs>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        try: "下拉试试",
        text: "刷新次数",
        success: "刷新成功",
        successTip: "成功提示",
        customTips: "自定义提示"
      },
      count: 0,
      isLoading: false
    };
  },

  computed: {
    tips() {
      if (this.count) {
        return `${this.t("text")}: ${this.count}`;
      }

      return this.t("try");
    }
  },

  mounted() {
    this.preloadImage();
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    preloadImage() {
      // preload doge image
      const doge = new Image();
      const dogeFire = new Image();

      doge.src = "https://b.yzcdn.cn/vant/doge.png";
      dogeFire.src = "https://b.yzcdn.cn/vant/doge-fire.jpg";
    },

    onRefresh(showToast) {
      setTimeout(() => {
        if (showToast) {
          this.$toast(this.t("success"));
        }

        this.isLoading = false;
        this.count++;
      }, 1000);
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-pull-refresh {
  background-color: @white;

  .vm-pull-refresh {
    height: calc(100vh - 50px);
  }

  .doge {
    width: 140px;
    height: 72px;
    margin-top: 8px;
    border-radius: 4px;
  }

  p {
    margin: 0;
    padding: @padding-md 0 0 @padding-md;
  }
}
</style>
