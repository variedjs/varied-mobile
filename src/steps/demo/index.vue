<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-steps @click-step="onClick" :active="active">
        <vm-step>{{ t("step1") }}</vm-step>
        <vm-step>{{ t("step2") }}</vm-step>
        <vm-step>{{ t("step3") }}</vm-step>
        <vm-step>{{ t("step4") }}</vm-step>
      </vm-steps>

      <vm-button @click="nextStep">{{ t("nextStep") }}</vm-button>
    </demo-block>

    <demo-block :title="t('customStyle')">
      <vm-steps
        :active="active"
        active-icon="check"
        inactive-icon="chevron-right"
        active-color="#38f"
      >
        <vm-step>{{ t("step1") }}</vm-step>
        <vm-step>{{ t("step2") }}</vm-step>
        <vm-step>{{ t("step3") }}</vm-step>
        <vm-step>{{ t("step4") }}</vm-step>
      </vm-steps>
    </demo-block>

    <demo-block :title="t('title3')">
      <vm-steps :active="0" direction="vertical">
        <vm-step>
          <h3>{{ t("status1") }}</h3>
          <p>2016-07-12 12:40</p>
        </vm-step>
        <vm-step>
          <h3>{{ t("status2") }}</h3>
          <p>2016-07-11 10:00</p>
        </vm-step>
        <vm-step>
          <h3>{{ t("status3") }}</h3>
          <p>2016-07-10 09:30</p>
        </vm-step>
      </vm-steps>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      info: {
        basicUsage: "基础用法",
        nextStep: "下一步",
        step1: "买家下单",
        step2: "商家接单",
        step3: "买家提货",
        step4: "交易完成",
        title2: "描述信息",
        title3: "竖向步骤条",
        status1: "【城市】物流状态1",
        status2: "【城市】物流状态",
        status3: "快件已发货",
        customStyle: "自定义样式"
      }
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    nextStep() {
      this.active = ++this.active % 4;
    },
    onClick(index) {
      console.log(index);
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-steps {
  .steps-success,
  .vm-icon-location {
    color: @green;
  }

  .vm-button {
    margin: @padding-md 0 0 @padding-md;
  }

  p,
  h3 {
    margin: 0;
    font-weight: normal;
    font-size: inherit;
  }

  .vm-steps-message + p {
    margin-bottom: 10px;
  }
}
</style>
