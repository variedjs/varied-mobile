<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-cell-group>
        <vm-field
          v-model="value"
          placeholder="请输入用户名"
        />
      </vm-cell-group>
    </demo-block>

    <demo-block title="自定义类型">
      <vm-cell-group>
        <vm-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          icon="question"
          required
          @click-icon="$toast('question')"
          short-border
        />

        <vm-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </vm-cell-group>
    </demo-block>

    <demo-block title="禁用输入框">
      <vm-cell-group>
        <vm-field
          value="输入框已禁用"
          label="用户名"
          left-icon="people"
          :disabled="true"
          is-link
        />
      </vm-cell-group>
    </demo-block>

    <demo-block title="错误提示">
      <vm-cell-group>
        <vm-field
          v-model="username2"
          label="用户名"
          placeholder="请输入用户名"
          error
        />
        <vm-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          error-message="手机号错误"
        />
      </vm-cell-group>
    </demo-block>

    <demo-block title="高度自适应">
      <vm-cell-group>
        <vm-field
          v-model="message"
          label="留言"
          type="textarea"
          placeholder="请输入留言"
          rows="1"
          autosize
        />
      </vm-cell-group>
    </demo-block>

    <demo-block title="插入按钮">
      <vm-cell-group>
        <vm-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入验证码"
        >
          <vm-button
            slot="button"
            size="sm"
            class="bg-green"
          >
            发送验证码
          </vm-button>
        </vm-field>
      </vm-cell-group>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      sms: '',
      value: '',
      password: '',
      username: '',
      username2: '',
      message: '',
      phone: '1365577'
    };
  }
};
</script>

<style lang="less">
@import '../../style/var';

.demo-field {
  padding-bottom: 30px;

  .vm-field-icon .vm-icon {
    color: @blue;
  }
}
</style>
