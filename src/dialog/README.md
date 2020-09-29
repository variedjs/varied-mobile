# Dialog 弹出框

### 介绍

弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。

弹出框组件支持函数调用和组件调用两种方式。

### 函数调用

Dialog 是一个函数，调用后会直接在页面中弹出相应的模态框。

```js
import { Dialog } from "@varied/mobile";

Dialog({ message: "提示" });
```

### 组件调用

通过组件调用 Dialog 时，可以通过下面的方式进行注册：

```js
import Vue from "vue";
import { Dialog } from "@varied/mobile";

// 全局注册
Vue.use(Dialog);

// 局部注册
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
};
```

## 代码演示

### 消息提示

用于提示一些消息，只包含一个确认按钮。

```js
Dialog.alert({
  title: "标题",
  message: "弹窗内容"
}).then(() => {
  // on close
});

Dialog.alert({
  message: "弹窗内容"
}).then(() => {
  // on close
});
```

### 消息确认

用于确认消息，包含取消和确认按钮。

```js
Dialog.confirm({
  title: "标题",
  message: "弹窗内容"
})
  .then(() => {
    // on confirm
  })
  .catch(() => {
    // on cancel
  });
```

### 异步关闭

通过 `beforeClose` 属性可以传入一个回调函数，在弹窗关闭前进行特定操作。

```js
function beforeClose(action, done) {
  if (action === "confirm") {
    setTimeout(done, 1000);
  } else {
    done();
  }
}

Dialog.confirm({
  title: "标题",
  message: "弹窗内容",
  beforeClose
});
```

### 全局方法

引入 Dialog 组件后，会自动在 Vue 的 prototype 上挂载 `$dialog` 方法，在所有组件内部都可以直接调用此方法。

```js
export default {
  mounted() {
    this.$dialog.alert({
      message: "弹窗内容"
    });
  }
};
```

### 组件调用

如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式。

```html
<vm-dialog v-model="show" title="标题" show-cancel-button>
  <img src="https://img.yzcdn.cn/@varied/mobile/apple-3.jpg" />
</vm-dialog>
```

```js
export default {
  data() {
    return {
      show: false
    };
  }
};
```

## 方法

| 方法名                     | 参数      | 返回值    | 介绍                             |
| -------------------------- | --------- | --------- | -------------------------------- |
| Dialog                     | `options` | `Promise` | 展示弹窗                         |
| Dialog.alert               | `options` | `Promise` | 展示消息提示弹窗                 |
| Dialog.confirm             | `options` | `Promise` | 展示消息确认弹窗                 |
| Dialog.setDefaultOptions   | `options` | `void`    | 修改默认配置，对所有 Dialog 生效 |
| Dialog.resetDefaultOptions | -         | `void`    | 重置默认配置，对所有 Dialog 生效 |
| Dialog.close               | -         | `void`    | 关闭弹窗                         |

## Options

| 参数                | 说明                                                                            | 类型                      | 默认值   | 版本 |
| ------------------- | ------------------------------------------------------------------------------- | ------------------------- | -------- | ---- |
| title               | 标题                                                                            | `String`                  | -        | -    |
| message             | 内容                                                                            | `String`                  | -        | -    |
| messageAlign        | 内容对齐方式，可选值为`left` `right`                                            | `String`                  | `center` | -    |
| className           | 自定义类名                                                                      | `String | Array | Object` | -        | -    |
| showConfirmButton   | 是否展示确认按钮                                                                | `Boolean`                 | `true`   | -    |
| showCancelButton    | 是否展示取消按钮                                                                | `Boolean`                 | `false`  | -    |
| confirmButtonText   | 确认按钮的文案                                                                  | `String`                  | `确认`   | -    |
| cancelButtonText    | 取消按钮的文案                                                                  | `String`                  | `取消`   | -    |
| overlay             | 是否展示蒙层                                                                    | `Boolean`                 | `true`   | -    |
| closeOnClickOverlay | 点击蒙层时是否关闭弹窗                                                          | `Boolean`                 | `false`  | -    |
| lockScroll          | 是否锁定背景滚动                                                                | `Boolean`                 | `true`   | -    |
| beforeClose         | 关闭前的回调函数，<br>调用 done() 后关闭弹窗，<br>调用 done(false) 阻止弹窗关闭 | `(action, done) => void`  | -        | -    |

## API

| 参数                   | 说明                                                                            | 类型                         | 默认值   | 版本 |
| ---------------------- | ------------------------------------------------------------------------------- | ---------------------------- | -------- | ---- |
| v-model                | 是否显示弹窗                                                                    | `Boolean`                    | -        | -    |
| title                  | 标题                                                                            | `String`                     | -        | -    |
| message                | 内容                                                                            | `String`                     | -        | -    |
| message-align          | 内容对齐方式，可选值为`left` `right`                                            | `String`                     | `center` | -    |
| show-confirm-button    | 是否展示确认按钮                                                                | `Boolean`                    | `true`   | -    |
| show-cancel-button     | 是否展示取消按钮                                                                | `Boolean`                    | `false`  | -    |
| confirm-button-text    | 确认按钮的文案                                                                  | `String`                     | `确认`   | -    |
| cancel-button-text     | 取消按钮的文案                                                                  | `String`                     | `取消`   | -    |
| overlay                | 是否展示蒙层                                                                    | `Boolean`                    | `true`   | -    |
| close-on-click-overlay | 是否在点击蒙层后关闭                                                            | `Boolean`                    | `false`  | -    |
| lock-scroll            | 是否锁定背景滚动                                                                | `Boolean`                    | `true`   | -    |
| before-close           | 关闭前的回调函数，<br>调用 done() 后关闭弹窗，<br>调用 done(false) 阻止弹窗关闭 | `(action, done) => void`     | -        | -    |
| get-container          | 指定挂载的节点，可以传入选择器，<br>或一个返回节点的函数                        | `String | () => HTMLElement` | -        | -    |

## Event

| 事件    | 说明               | 回调参数 |
| ------- | ------------------ | -------- |
| confirm | 点击确认按钮时触发 | -        |
| cancel  | 点击取消按钮时触发 | -        |
