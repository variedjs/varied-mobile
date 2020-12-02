## Loading 加载

### 使用指南

```javascript
import { Loading } from "@varied/mobile";

Vue.use(Loading);
```

### 代码演示

#### Circular

```html
<vm-loading /> <vm-loading color="white" background="rgba(0,0,0,.6)" />
```

#### Spinner

```html
<vm-loading type="spinner" />
<vm-loading
  type="spinner"
  color="white"
  background="rgba(0,0,0,.6)"
  backgroundSize="20px"
/>
```

### 加载文案

可以使用默认插槽在图标的右侧插入加载文案

```html
<vm-loading size="24px">加载中...</vm-loading>
```

### 垂直排列

设置`vertical`属性后，图标和文案会垂直排列

```html
<vm-loading size="24px" vertical>加载中...</vm-loading>
```

### API

| 参数               | 说明                       | 类型              | 默认值     |
| ------------------ | -------------------------- | ----------------- | ---------- |
| color              | 颜色                       | `String`          | `#c9c9c9`  | - |
| type               | 类型，可选值为 `spinner`   | `String`          | `circular` | - |
| size               | 大小                       | `String`          | `30px`     | - |
| background         | 背景色                     | `String`          | -          | - |
| backgroundSize     | 背景大小                   | `String`          | `10px`     | - |
| text-size `v0.0.8` | 文字大小，默认单位为`px`   | `Number | String` | `14px`     |
| vertical `v0.0.8`  | 是否垂直排列图标和文字内容 | `boolean`         | `false`    |

### Slots

| 名称             | 说明     |
| ---------------- | -------- |
| default `v0.0.8` | 加载文案 |
