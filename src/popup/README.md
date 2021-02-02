## Popup 弹出层

> 0.0.3 版本开始支持此组件。

### 使用指南

```javascript
import { Popup } from "@varied/mobile";

Vue.use(Popup);
```

### 代码演示

#### 基础用法

`popup`默认从中间弹出

```html
<vm-popup v-model="show">内容</vm-popup>
```

```javascript
export default {
  data() {
    return {
      show: false
    };
  }
};
```

#### 弹出位置

通过`position`属性设置 Popup 弹出位置

```html
<vm-popup v-model="show" position="top" :overlay="false">
  内容
</vm-popup>
```

### 关闭图标

设置`closeable`属性后，会在弹出层的右上角显示关闭图标，并且可以通过`close-icon`属性自定义图标，使用`close-icon-position`属性可以自定义图标位置

```html
<vm-popup
  v-model="show"
  closeable
  position="bottom"
  :style="{ height: '30%' }"
/>
<!-- 自定义图标 -->
<vm-popup
  v-model="show"
  closeable
  close-icon="window-close"
  position="bottom"
  :style="{ height: '30%' }"
/>
<!-- 图标位置 -->
<vm-popup
  v-model="show"
  closeable
  close-icon-position="top-left"
  position="bottom"
  :style="{ height: '30%' }"
/>
```

### 圆角弹窗

设置`round`属性后，弹窗会根据弹出位置添加不同的圆角样式

```html
<vm-popup v-model="show" round position="bottom" :style="{ height: '30%' }" />
```

### 指定挂载位置

弹出层默认挂载到组件所在位置，可以通过 `get-container` 属性指定挂载位置。

```html
<!-- 挂载到 body 节点下 -->
<vm-popup v-model="show" get-container="body" />

<!-- 挂载到 #app 节点下 -->
<vm-popup v-model="show" get-container="#app" />

<!-- 通过函数指定挂载位置 -->
<vm-popup v-model="show" :get-container="getContainer" />
```

```js
export default {
  methods: {
    // 返回一个特定的 DOM 节点，作为挂载的父节点
    getContainer() {
      return document.querySelector(".my-container");
    }
  }
};
```

> 注意：使用 get-container 属性的组件不能为根节点

### API

| 参数                         | 说明                                                             | 类型                         | 默认值      |
| ---------------------------- | ---------------------------------------------------------------- | ---------------------------- | ----------- |
| v-model                      | 当前组件是否显示                                                 | `Boolean`                    | `false`     | - |
| overlay                      | 是否显示蒙层                                                     | `Boolean`                    | `true`      | - |
| position                     | 位置，可选值为 `top` `bottom` <br> `right` `left`                | `String`                     | -           | - |
| overlay-class                | 自定义蒙层类名                                                   | `String`                     | -           | - |
| overlay-style                | 自定义蒙层样式                                                   | `Object`                     | -           | - |
| transition                   | transition 名称                                                  | `String`                     | -           | - |
| get-container                | 指定挂载的节点，可以传入选择器，<br>或一个返回节点的函数         | `String | () => HTMLElement` | -           | - |
| close-on-click-overlay       | 是否在点击蒙层后关闭                                             | `Boolean`                    | `true`      | - |
| lock-scroll                  | 是否锁定背景滚动                                                 | `Boolean`                    | `true`      | - |
| lazy-render                  | 是否在显示弹层时才渲染节点                                       | `Boolean`                    | `true`      | - |
| round `v0.0.8`               | 是否显示圆角                                                     | `Boolean`                    | `false`     |
| closeable `v0.0.8`           | 是否显示关闭图标                                                 | `Boolean`                    | `false`     |
| close-icon `v0.0.8`          | 关闭图标名称或图片链接                                           | `String`                     | `cross`     |
| close-icon-position `v0.0.8` | 关闭图标位置，可选值为`top-left`<br>`bottom-left` `bottom-right` | `String`                     | `top-right` |
| duration `v0.0.9`            | 动画时长，单位秒                                                 | `String`\|`Number`           | `top-right` |

### Event

| 事件名                    | 说明                       | 回调参数       |
| ------------------------- | -------------------------- | -------------- |
| click                     | 点击弹出层时触发           | _event: Event_ |
| click-overlay             | 点击遮罩层时触发           | -              |
| click-close-icon `v0.0.8` | 点击关闭图标时触发         | _event: Event_ |
| open `v0.0.9`             | 打开弹出层时触发           | -              |
| close `v0.0.9`            | 关闭弹出层时触发           | -              |
| opened `v0.0.9`           | 打开弹出层且动画结束后触发 | -              |
| closed `v0.0.9`           | 关闭弹出层且动画结束后触发 | -              |
