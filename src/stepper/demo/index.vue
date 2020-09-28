<template>
  <demo-section>
    <vm-cell center :title="t('basicUsage')">
      <vm-stepper v-model="stepper1" />
    </vm-cell>

    <vm-cell center :title="t('step')">
      <vm-stepper v-model="stepper2" step="2" />
    </vm-cell>

    <vm-cell center :title="t('range')">
      <vm-stepper v-model="stepper3" :min="5" :max="8" />
    </vm-cell>

    <vm-cell center :title="t('integer')">
      <vm-stepper v-model="stepper4" integer />
    </vm-cell>

    <vm-cell center :title="t('disabled')">
      <vm-stepper v-model="stepper5" disabled />
    </vm-cell>

    <vm-cell center :title="t('disableInput')">
      <vm-stepper v-model="disabledInput" disable-input />
    </vm-cell>

    <vm-cell center :title="t('decimalLength')">
      <vm-stepper v-model="stepper8" :decimal-length="1" step="0.2" />
    </vm-cell>

    <vm-cell center :title="t('customSize')">
      <vm-stepper v-model="stepper7" button-size="32px" input-width="40px" />
    </vm-cell>

    <vm-cell center :title="t('asyncChange')">
      <vm-stepper :value="stepper6" async-change @change="onChange" />
    </vm-cell>

    <vm-cell v-if="!isWeapp" center :title="t('roundTheme')">
      <vm-stepper
        v-model="stepperRound"
        theme="round"
        button-size="22"
        disable-input
      />
    </vm-cell>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      stepper1: 1,
      stepper2: 1,
      stepper3: 1,
      stepper4: 1,
      stepper5: 1,
      stepper6: 1,
      stepper7: 1,
      stepper8: 1,
      stepperRound: 1,
      disabledInput: 1,
      info: {
        step: "步长设置",
        range: "限制输入范围",
        integer: "限制输入整数",
        roundTheme: "圆角风格",
        asyncChange: "异步变更",
        customSize: "自定义大小",
        disableInput: "禁用输入框",
        decimalLength: "固定小数位数"
      }
    };
  },

  methods: {
    onChange(value) {
      this.$toast.loading({ forbidClick: true });

      setTimeout(() => {
        this.stepper6 = value;
        this.$toast.clear();
      }, 500);
    },
    t(name) {
      return this.info[name];
    }
  }
};
</script>
