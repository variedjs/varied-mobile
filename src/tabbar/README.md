## Tabbar 标签栏

### 使用指南
``` javascript
import { Tabbar, TabbarItem } from '@varied/mobile';

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
    }
  }
}
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

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 当前选中标签的名称或索引值 | *string \| number* | `0` | - |
| fixed | 是否固定在底部 | *boolean* | `true` | - |
| border | 是否显示外边框 | *boolean* | `true` | - |
| z-index | 元素 z-index | *number* | `1` | - |
| active-color | 选中标签的颜色 | *string* | `#1989fa` | - |
| inactive-color | 未选中标签的颜色 | *string* | `#7d7e80` | - |
| route | 是否开启路由模式 | *boolean* | `false` | - |
| safe-area-inset-bottom | 是否开启底部安全区适配 | *boolean* | `false` | - |

### Tabbar Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| change | 切换标签时触发 | active: 当前选中标签 |

### TabbarItem API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| icon | 图标名称或图片链接，可选值见 Icon 组件| `String` | - | - |
| dot | 是否显示小红点 | `Boolean` | - | - |
| info | 图标右上角提示信息 | `String | Number` | - | - |
| url | 跳转链接 | `String` | - | - |
| to | 路由跳转对象，同 `vue-router` 的 to | `String | Object` | - | - |
| replace | 跳转时是否替换当前页面历史 | `String` | `false` | - |

### TabbarItem Slot

| 名称 | 说明 | slot-scope |
|------|------|------|
| icon | 自定义图标 | active: 是否为选中标签 |
