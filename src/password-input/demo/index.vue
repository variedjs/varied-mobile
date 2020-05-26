<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-password-input
        :value="value1"
        info="密码"
        :focused="keyboard === 'value1'"
        @focus="keyboard = 'value1'"
      />
      <vm-safe-keyboard
        :show="!!keyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="keyboard = ''"
      />
    </demo-block>
    <demo-block title="自定义长度">
      <vm-password-input
        :value="value2"
        info="密码"
        :length="4"
        gutter="15"
        :focused="keyboard === 'value2'"
        @focus="keyboard = 'value2'"
      />
    </demo-block>
    <demo-block title="明文展示">
      <vm-password-input
        :value="value3"
        info="密码"
        :mask="false"
        :focused="keyboard === 'value3'"
        @focus="keyboard = 'value3'"
      />
    </demo-block>
    <demo-block title="错误提示">
      <vm-password-input
        :value="value4"
        info="密码"
        :error-info="errorInfo"
        :mask="false"
        :focused="keyboard === 'value4'"
        @focus="keyboard = 'value4'"
      />
    </demo-block>
  </demo-section>
</template>

<script>
  export default {
    data() {
      return {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        keyboard: 'value1',
        errorInfo: '',
      };
    },
    methods: {
      onInput(key) {
        const {keyboard} = this;
        this[keyboard] = (this[keyboard] + key).slice(0, 6);
        if (this[keyboard].length === 6) {
          this.errorInfo = '密码错误';
        } else {
          this.errorInfo = '';
        }
      },

      onDelete() {
        const {keyboard} = this;
        this[keyboard] = this[keyboard].slice(0, this[keyboard].length - 1);
      },
    }
  };
</script>
