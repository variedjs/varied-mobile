## SafeKeyboard 安全虚拟键盘

### 介绍

安全虚拟键盘。0.0.4 版本开始支持此组件。

### 引入

```js
import Vue from "vue";
import { SafeKeyboard } from "@varied/mobile";

Vue.use(SafeKeyboard);
```

## 代码演示

### 默认样式

数字键盘提供了 `getKey`、`delete`、`blur` 事件，分别对应输入内容、删除内容和失去焦点的动作

```html
<vm-cell plain type="primary" @touchstart.native.stop="show = true">
  点击弹出键盘
</vm-cell>
<vm-safe-keyboard
  :show="show"
  @blur="show = false"
  @getKey="onGetKey"
  @delete="onDelete"
/>
```

```js
import { Toast } from "@varied/mobile";

export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    onGetKey(value) {
      Toast(value);
    },
    onDelete() {
      Toast("删除");
    }
  }
};
```

> 点击键盘以外的区域时，键盘会自动收起，通过阻止元素上的 touchstart 事件冒泡可以避免键盘收起。

### 数字键盘

```html
<vm-safe-keyboard
  :show="show"
  theme="number"
  @blur="show = false"
  @getKey="onGetKey"
  @delete="onDelete"
/>
```

### 英文键盘

```html
<vm-safe-keyboard
  :show="show"
  theme="letter"
  @blur="show = false"
  @getKey="onGetKey"
  @delete="onDelete"
/>
```

### 英文数字键盘

```html
<vm-safe-keyboard
  :show="show"
  theme="letter-number"
  @blur="show = false"
  @getKey="onGetKey"
  @delete="onDelete"
/>
```

### 带右侧栏的键盘

将 theme 属性设置为 `custom` 来展示键盘的右侧栏，常用于输入金额的场景

```html
<vm-safe-keyboard
  :show="show"
  theme="custom"
  extra-key="."
  close-button-text="完成"
  @blur="show = false"
  @getKey="onGetKey"
  @delete="onDelete"
/>
```

### 身份证号键盘

通过 `extra-key` 属性可以设置左下角按键内容，比如需要输入身份证号时，可以将 `extra-key` 设置为 `X`

```html
<vm-cell plain type="primary" @touchstart.native.stop="show = true">
  弹出身份证号键盘
</vm-cell>
<vm-safe-keyboard
  :show="show"
  extra-key="X"
  close-button-text="完成"
  @blur="show = false"
  @getKey="onGetKey"
  @delete="onDelete"
/>
```

### 键盘标题

通过 `title` 属性可以设置键盘标题

```html
<vm-cell plain type="info" @touchstart.native.stop="show = true">
  弹出带标题的键盘
</vm-cell>
<vm-safe-keyboard
  :show="show"
  title="键盘标题"
  extra-key="."
  close-button-text="完成"
  @blur="show = false"
  @getKey="onGetKey"
  @delete="onDelete"
/>
```

### 配置多个按键

当 theme 为 `custom` 时，支持以数组的形式配置两个 `extra-key`

```html
<vm-cell plain type="primary" @touchstart.native.stop="show = true">
  弹出配置多个按键的键盘
</vm-cell>
<vm-safe-keyboard
  :show="show"
  :extra-key="['00', '.']"
  close-button-text="完成"
  @blur="show = false"
  @getKey="onGetKey"
  @delete="onDelete"
/>
```

### 双向绑定

可以通过 `v-model` 绑定键盘当前输入值

```html
<vm-field
  readonly
  clickable
  :value="value"
  @touchstart.native.stop="show = true"
/>
<vm-safe-keyboard
  v-model="value"
  :show="show"
  :maxlength="6"
  @blur="show = false"
/>
```

```js
export default {
  data() {
    return {
      show: false,
      value: ""
    };
  }
};
```

## API

### Props

| 参数                   | 说明                                                            | 类型                 | 默认值    |
| ---------------------- | --------------------------------------------------------------- | -------------------- | --------- |
| v-model (value)        | 当前输入值                                                      | _string_             | -         |
| show                   | 是否显示键盘                                                    | _boolean_            | -         |
| title                  | 键盘标题                                                        | _string_             | -         |
| theme                  | 样式风格，可选值为 `custom`,`number`,`letter`,`letter-number`   | _string_             | `default` |
| maxlength              | 输入值最大长度                                                  | _number \| string_   | -         |
| transition             | 是否开启过场动画                                                | _boolean_            | `true`    |
| z-index                | 键盘 z-index 层级                                               | _number \| string_   | `100`     |
| extra-key              | 底部额外按键的内容                                              | _string \| string[]_ | `''`      |
| close-button-text      | 关闭按钮文字，空则不展示                                        | _string_             | -         |
| delete-button-text     | 删除按钮文字，空则展示删除图标                                  | _string_             | -         |
| close-button-loading   | 是否将关闭按钮设置为加载中状态，仅在 `theme="custom"` 时有效    | _boolean_            | `false`   |
| show-delete-key        | 是否展示删除图标                                                | _boolean_            | `true`    |
| hide-on-click-outside  | 点击外部时是否收起键盘                                          | _boolean_            | `true`    |
| safe-area-inset-bottom | 是否开启[底部安全区适配](#/quickstart#di-bu-an-quan-qu-gua-pei) | _boolean_            | `true`    |

### Events

| 事件名 | 说明                           | 回调参数      |
| ------ | ------------------------------ | ------------- |
| getKey | 点击按键时触发                 | key: 按键内容 |
| delete | 点击删除键时触发               | -             |
| close  | 点击关闭按钮时触发             | -             |
| blur   | 点击关闭按钮或非键盘区域时触发 | -             |
| show   | 键盘完全弹出时触发             | -             |
| hide   | 键盘完全收起时触发             | -             |

### Slots

| 名称       | 说明                 |
| ---------- | -------------------- |
| delete     | 自定义删除按键内容   |
| extra-key  | 自定义左下角按键内容 |
| title-left | 自定义标题栏左侧内容 |
