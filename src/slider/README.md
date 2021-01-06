## Slider 滑块

0.0.6 版本开始支持此组件。

### 引入

```js
import Vue from "vue";
import { Slider } from "@varied/mobile";

Vue.use(Slider);
```

## 代码演示

### 基础用法

```html
<vm-slider v-model="value" @change="onChange" />
```

```js
import { Toast } from "@varied/mobile";

export default {
  data() {
    return {
      value: 50
    };
  },
  methods: {
    onChange(value) {
      Toast("当前值：" + value);
    }
  }
};
```

### 指定组件高度

```html
<vm-slider v-model="value" height="80px" />
```

### 指定选择范围

```html
<vm-slider v-model="value" :min="-50" :max="50" />
```

### 禁用

```html
<vm-slider v-model="value" disabled />
```

### 指定步长

```html
<vm-slider v-model="value" :step="10" />
```

### 自定义样式

```html
<vm-slider
  v-model="value"
  inactive-color="#333"
  button-size="50px"
  bar-height="4px"
  active-color="#ee0a24"
/>
```

### 自定义按钮

```html
<vm-slider v-model="value" active-color="#ee0a24">
  <template #button>
    <vm-icon name="asterisk" :size="50" />
  </template>
</vm-slider>
```

### 垂直方向

Slider 垂直展示时，需配合 height 使用

```html
<vm-slider v-model="value" height="100px" vertical />
```

## API

### Props

| 参数           | 说明                         | 类型               | 默认值    |
| -------------- | ---------------------------- | ------------------ | --------- |
| value          | 当前进度百分比               | _number_           | `0`       |
| max            | 最大值                       | _number \| string_ | `100`     |
| min            | 最小值                       | _number \| string_ | `0`       |
| step           | 步长                         | _number \| string_ | `1`       |
| bar-height     | 进度条高度，默认单位为`px`   | _number \| string_ | `2px`     |
| button-size    | 滑块按钮大小，默认单位为`px` | _number \| string_ | `24px`    |
| active-color   | 进度条激活态颜色             | _string_           | `#1989fa` |
| inactive-color | 进度条非激活态颜色           | _string_           | `#e5e5e5` |
| disabled       | 是否禁用滑块                 | _boolean_          | `false`   |
| vertical       | 是否垂直展示                 | _boolean_          | `false`   |
| height         | 组件高度                     | _number \| string_ | `-`       |

### Events

| 事件名     | 说明                     | 回调参数        |
| ---------- | ------------------------ | --------------- |
| input      | 进度变化时实时触发       | value: 当前进度 |
| change     | 进度变化且结束拖动后触发 | value: 当前进度 |
| drag-start | 开始拖动时触发           | -               |
| drag-end   | 结束拖动时触发           | -               |

### Slots

| 名称   | 说明           |
| ------ | -------------- |
| button | 自定义滑动按钮 |
