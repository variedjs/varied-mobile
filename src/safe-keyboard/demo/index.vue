<template>
  <demo-section>
    <demo-block title="弹出默认键盘">
      <vm-cell plain type="primary" @touchstart.native.stop="show(true,0)">
        点击弹出键盘
      </vm-cell>
      <vm-safe-keyboard
        :show="shows[0]"
        @blur="show(false)"
        @getKey="onInput"
        @delete="onDelete"/>
    </demo-block>
    <demo-block title="弹出英文键盘">
      <vm-cell plain type="primary" @touchstart.native.stop="show(true,6)">
        点击弹出键盘
      </vm-cell>
      <vm-safe-keyboard
        theme="letter"
        :show="shows[6]"
        @blur="show(false)"
        @getKey="onInput"
        @delete="onDelete"/>
    </demo-block>
    <demo-block title="弹出数字键盘">
      <vm-cell plain type="primary" @touchstart.native.stop="show(true,7)">
        点击弹出键盘
      </vm-cell>
      <vm-safe-keyboard
        theme="number"
        :show="shows[7]"
        @blur="show(false)"
        @getKey="onInput"
        @delete="onDelete"/>
    </demo-block>
    <demo-block title="弹出英文数字键盘">
      <vm-cell plain type="primary" @touchstart.native.stop="show(true,8)">
        点击弹出键盘
      </vm-cell>
      <vm-safe-keyboard
        theme="letter-number"
        :show="shows[8]"
        @blur="show(false)"
        @getKey="onInput"
        @delete="onDelete"/>
    </demo-block>
    <demo-block title="带右侧栏的键盘">
      <vm-cell plain type="primary" @touchstart.native.stop="show(true,1)">
        点击弹出键盘
      </vm-cell>
      <vm-safe-keyboard
        :show="shows[1]"
        theme="custom"
        extra-key="."
        close-button-text="完成"
        @blur="show(false)"
        @getKey="onInput"
        @delete="onDelete"
      />
    </demo-block>
    <demo-block title="身份证号键盘">
      <vm-cell plain type="primary" @touchstart.native.stop="show(true,2)">
        点击弹出键盘
      </vm-cell>
      <vm-safe-keyboard
        :show="shows[2]"
        extra-key="X"
        close-button-text="完成"
        @blur="show(false)"
        @getKey="onInput"
        @delete="onDelete"
      />
    </demo-block>
    <demo-block title="键盘标题">
      <vm-cell plain type="primary" @touchstart.native.stop="show(true,3)">
        点击弹出键盘
      </vm-cell>
      <vm-safe-keyboard
        :show="shows[3]"
        title="键盘标题"
        close-button-text="完成"
        @blur="show(false)"
        @getKey="onInput"
        @delete="onDelete"
      />
    </demo-block>
    <demo-block title="配置多个按键">
      <vm-cell plain type="primary" @touchstart.native.stop="show(true,4)">
        点击弹出键盘
      </vm-cell>
      <vm-safe-keyboard
        :show="shows[4]"
        title="键盘标题"
        theme="custom"
        :extra-key="['00', '.']"
        close-button-text="完成"
        @blur="show(false)"
        @getKey="onInput"
        @delete="onDelete"
      />
    </demo-block>
    <demo-block title="双向绑定">
      <vm-field
        label="双向绑定"
        placeholder="点击输入"
        readonly
        clickable
        v-model="value"
        @touchstart.native.stop="show(true,5)"
      />
      <vm-safe-keyboard
        :show="shows[5]"
        title="键盘标题"
        v-model="value"
        theme="custom"
        :extra-key="['00', '.']"
        close-button-text="完成"
        @blur="show(false)"
        @getKey="onInput"
        @delete="onDelete"
        maxlength="7"
      />
    </demo-block>
  </demo-section>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        shows: [false, false, false, false, false, false, false, false, false]
      };
    },

    methods: {
      onInput(value) {
        this.$toast(value)
      },
      onDelete() {
        this.$toast('删除');
      },
      show(show, num) {
        this.shows = [false, false, false, false, false, false, false, false, false];
        if (show) {
          this.shows[num] = show;
        }
      }
    }

  };
</script>
