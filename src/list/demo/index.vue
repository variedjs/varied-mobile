<template>
  <demo-section>
    <vm-tabs>
      <vm-tab :title="t('basicUsage')">
        <vm-list
          v-model="list[0].loading"
          :finished="list[0].finished"
          :finished-text="t('finishedText')"
          @load="onLoad(0)"
        >
          <vm-cell v-for="item in list[0].items" :key="item" :title="item" />
        </vm-list>
      </vm-tab>

      <vm-tab :title="t('errorInfo')">
        <vm-list
          v-model="list[1].loading"
          :finished="list[1].finished"
          :error.sync="list[1].error"
          :error-text="t('errorText')"
          @load="onLoad(1)"
        >
          <vm-cell v-for="item in list[1].items" :key="item" :title="item" />
        </vm-list>
      </vm-tab>

      <vm-tab :title="t('pullRefresh')">
        <vm-pull-refresh v-model="list[2].refreshing" @refresh="onRefresh(2)">
          <vm-list
            v-model="list[2].loading"
            :finished="list[2].finished"
            :finished-text="t('finishedText')"
            @load="onLoad(2)"
          >
            <vm-cell v-for="item in list[2].items" :key="item" :title="item" />
          </vm-list>
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
        errorInfo: "错误提示",
        errorText: "请求失败，点击重新加载",
        pullRefresh: "下拉刷新",
        finishedText: "没有更多了"
      },
      list: [
        {
          items: [],
          refreshing: false,
          loading: false,
          error: false,
          finished: false
        },
        {
          items: [],
          refreshing: false,
          loading: false,
          error: false,
          finished: false
        },
        {
          items: [],
          refreshing: false,
          loading: false,
          error: false,
          finished: false
        }
      ]
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    onLoad(index) {
      console.log(index);
      const list = this.list[index];
      list.loading = true;

      setTimeout(() => {
        if (list.refreshing) {
          list.items = [];
          list.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          const text = list.items.length + 1;
          list.items.push(text < 10 ? "0" + text : text);
        }

        list.loading = false;
        list.refreshing = false;

        // show error info in second demo
        if (index === 1 && list.items.length === 10 && !list.error) {
          list.error = true;
        } else {
          list.error = false;
        }

        if (list.items.length >= 40) {
          list.finished = true;
        }
      }, 1000);
    },

    onRefresh(index) {
      this.list[index].finished = false;
      this.onLoad(index);
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-list {
  .vm-cell {
    text-align: center;
  }

  .page-desc {
    margin: 0;
    padding: 5px 0;
    color: @gray-7;
    font-size: 14px;
    text-align: center;

    &-text {
      margin: 0;
    }

    &-option {
      margin: 12px;
    }
  }

  .vm-checkbox-label {
    color: @gray-7;
  }
}
</style>
