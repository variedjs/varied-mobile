<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-count-down :time="time" />
    </demo-block>

    <demo-block :title="t('customFormat')">
      <vm-count-down :time="time" :format="t('formatWithDay')" />
    </demo-block>

    <demo-block :title="t('millisecond')">
      <vm-count-down millisecond :time="time" format="HH:mm:ss:SS" />
    </demo-block>

    <demo-block :title="t('customStyle')">
      <vm-count-down :time="time">
        <template #default="currentTime">
          <span class="block">{{ currentTime.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ currentTime.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ currentTime.seconds }}</span>
        </template>
      </vm-count-down>
    </demo-block>

    <demo-block :title="t('manualControl')">
      <vm-count-down
        ref="countDown"
        millisecond
        :time="3000"
        :auto-start="false"
        format="ss:SSS"
        @finish="$toast(t('finished'))"
      />
      <vm-col span="6" @click="start">
        <vm-icon name="play"></vm-icon>
        <span>{{ info.start }}</span>
      </vm-col>
      <vm-col span="6" @click="pause">
        <vm-icon name="pause"></vm-icon>
        <span>{{ info.pause }}</span>
      </vm-col>
      <vm-col span="6" @click="reset">
        <vm-icon name="repeat"></vm-icon>
        <span>{{ info.reset }}</span>
      </vm-col>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        millisecond: "毫秒级渲染",
        customStyle: "自定义样式",
        customFormat: "自定义格式",
        manualControl: "手动控制",
        formatWithDay: "DD 天 HH 时 mm 分 ss 秒",
        reset: "重置",
        pause: "暂停",
        start: "开始",
        finished: "倒计时结束"
      },
      time: 30 * 60 * 60 * 1000
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },

    start() {
      this.$refs.countDown.start();
    },

    pause() {
      this.$refs.countDown.pause();
    },

    reset() {
      this.$refs.countDown.reset();
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-count-down {
  background-color: @white;

  .vm-col {
    display: inline-block;
    float: none;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;

    span {
      display: block;
      height: 36px;
      margin: -4px 0 4px;
      padding: 0 5px;
      color: @gray-7;
      font-size: 12px;
      line-height: 18px;
    }

    &:active {
      background-color: @active-color;
    }

    .vm-icon {
      margin: 16px 0 16px;
      color: @text-color;
    }
  }

  .vm-count-down {
    margin-left: @padding-md;
  }

  .colon {
    display: inline-block;
    margin: 0 4px;
    color: @red;
  }

  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: @red;
    border-radius: 4px;
  }

  .vm-grid {
    margin-top: 10px;
  }
}
</style>
