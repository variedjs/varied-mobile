# Tabbar 标签栏

0.0.3 版本开始支持此组件。

### 使用指南

```javascript
import { Tabbar, TabbarItem } from "@varied/mobile";

Vue.use(Tabbar).use(TabbarItem);
```

### 代码演示

#### 基础用法

```html
<vm-tabbar v-model="active">
  <vm-tabbar-item icon="home">标签</vm-tabbar-item>
  <vm-tabbar-item icon="anchor">标签</vm-tabbar-item>
  <vm-tabbar-item icon="calendar-check-o">标签</vm-tabbar-item>
  <vm-tabbar-item icon="user">标签</vm-tabbar-item>
</vm-tabbar>
```

```javascript
export default {
  data() {
    return {
      active: 0
    };
  }
};
```

### 通过名称匹配

在标签指定`name`属性的情况下，`v-model`的值为当前标签的`name`

```html
<vm-tabbar v-model="active">
  <vm-tabbar-item name="home" icon="home">标签</vm-tabbar-item>
  <vm-tabbar-item name="anchor" icon="anchor">标签</vm-tabbar-item>
  <vm-tabbar-item name="calendar-check-o" icon="calendar-check-o"
    >标签</vm-tabbar-item
  >
  <vm-tabbar-item name="user" icon="user">标签</vm-tabbar-item>
</vm-tabbar>
```

```js
export default {
  data() {
    return {
      active: "home"
    };
  }
};
```

### 徽标提示

```html
<vm-tabbar v-model="active" route>
  <vm-tabbar-item icon="home" dot>标签</vm-tabbar-item>
  <vm-tabbar-item icon="anchor" info="51">标签</vm-tabbar-item>
  <vm-tabbar-item icon="calendar-check-o" info="15">标签</vm-tabbar-item>
  <vm-tabbar-item icon="user" info="5">标签</vm-tabbar-item>
</vm-tabbar>
```

### 自定义图标

通过 icon 插槽自定义图标，可以通过 `slot-scope` 判断标签是否选中

```html
<vm-tabbar v-model="active">
  <vm-tabbar-item badge="3">
    <span>自定义</span>
    <template #icon="props">
      <img :src="props.active ? icon.active : icon.inactive" />
    </template>
  </vm-tabbar-item>
  <vm-tabbar-item icon="anchor">标签</vm-tabbar-item>
  <vm-tabbar-item icon="user">标签</vm-tabbar-item>
</vm-tabbar>
```

```js
export default {
  data() {
    return {
      active: 0,
      icon: {
        active:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/active-dynamic.svg",
        inactive:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/inactive-dynamic.svg"
      }
    };
  }
};
```

### 自定义颜色

```html
<vm-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
  <vm-tabbar-item icon="home">标签</vm-tabbar-item>
  <vm-tabbar-item icon="anchor">标签</vm-tabbar-item>
  <vm-tabbar-item icon="calendar-check-o">标签</vm-tabbar-item>
  <vm-tabbar-item icon="user">标签</vm-tabbar-item>
</vm-tabbar>
```

### 监听切换事件

```html
<vm-tabbar v-model="active" @change="onChange">
  <vm-tabbar-item icon="home">标签</vm-tabbar-item>
  <vm-tabbar-item icon="anchor">标签</vm-tabbar-item>
  <vm-tabbar-item icon="calendar-check-o">标签</vm-tabbar-item>
  <vm-tabbar-item icon="user">标签</vm-tabbar-item>
</vm-tabbar>
```

```js
import { Notify } from "@varied/mobile";

export default {
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    }
  }
};
```

### 路由模式

标签栏支持路由模式，用于搭配`vue-router`使用。路由模式下会匹配页面路径和标签的`to`属性，并自动选中对应的标签

```html
<vm-tabbar route>
  <vm-tabbar-item icon="home" replace to="">标签</vm-tabbar-item>
  <vm-tabbar-item icon="anchor" replace to="">标签</vm-tabbar-item>
  <vm-tabbar-item icon="calendar-check-o" replace to="">标签</vm-tabbar-item>
  <vm-tabbar-item icon="user" replace to="">标签</vm-tabbar-item>
</vm-tabbar>
```

### Tabbar API

| 参数                   | 说明                                               | 类型               | 默认值    |
| ---------------------- | -------------------------------------------------- | ------------------ | --------- |
| v-model                | 当前选中标签的名称或索引值                         | _string \| number_ | `0`       | - |
| fixed                  | 是否固定在底部                                     | _boolean_          | `true`    | - |
| border                 | 是否显示外边框                                     | _boolean_          | `true`    | - |
| z-index                | 元素 z-index                                       | _number_           | `1`       | - |
| active-color           | 选中标签的颜色                                     | _string_           | `#1989fa` | - |
| inactive-color         | 未选中标签的颜色                                   | _string_           | `#7d7e80` | - |
| route                  | 是否开启路由模式                                   | _boolean_          | `false`   | - |
| safe-area-inset-bottom | 是否开启底部安全区适配                             | _boolean_          | `false`   | - |
| placeholder            | 固定在底部时，是否在标签位置生成一个等高的占位元素 | _boolean_          | `false`   | - |

### Tabbar Event

| 事件名 | 说明           | 参数                 |
| ------ | -------------- | -------------------- |
| change | 切换标签时触发 | active: 当前选中标签 |

### TabbarItem API

| 参数    | 说明                                   | 类型              | 默认值  |
| ------- | -------------------------------------- | ----------------- | ------- |
| icon    | 图标名称或图片链接，可选值见 Icon 组件 | `String`          | -       | - |
| dot     | 是否显示小红点                         | `Boolean`         | -       | - |
| info    | 图标右上角提示信息                     | `String | Number` | -       | - |
| url     | 跳转链接                               | `String`          | -       | - |
| to      | 路由跳转对象，同 `vue-router` 的 to    | `String | Object` | -       | - |
| replace | 跳转时是否替换当前页面历史             | `String`          | `false` | - |

### TabbarItem Slot

| 名称 | 说明       | slot-scope             |
| ---- | ---------- | ---------------------- |
| icon | 自定义图标 | active: 是否为选中标签 |
