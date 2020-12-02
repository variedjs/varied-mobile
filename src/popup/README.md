## Popup 弹出层

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
| round `v0.0.8`               | 是否显示圆角                                                     | `boolean`                    | `false`     |
| closeable `v0.0.8`           | 是否显示关闭图标                                                 | `boolean`                    | `false`     |
| close-icon `v0.0.8`          | 关闭图标名称或图片链接                                           | `string`                     | `cross`     |
| close-icon-position `v0.0.8` | 关闭图标位置，可选值为`top-left`<br>`bottom-left` `bottom-right` | `string`                     | `top-right` |

### Event

| 事件名        | 说明           | 参数 |
| ------------- | -------------- | ---- |
| click-overlay | 点击蒙层时触发 | -    |
