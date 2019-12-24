## Collapse 折叠面板

### 使用指南
``` javascript
import { Collapse, CollapseItem } from '@varied/mobile';

Vue.use(Collapse).use(CollapseItem);
```

### 代码演示

#### 基础用法
通过`v-model`控制展开的面板列表，`active1`为数组格式

```html
<vm-collapse v-model="active1">
  <vm-collapse-item title="标题">内容</vm-collapse-item>
  <vm-collapse-item title="标题">内容</vm-collapse-item>
  <vm-collapse-item
    title="标题"
    disabled
  >
    内容
  </vm-collapse-item>
</vm-collapse>
```

``` javascript
export default {
  data() {
    return {
      active1: ['1']
    };
  }
};
```

#### 手风琴
通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`active2`为字符串格式

```html
<vm-collapse
  v-model="active2"
  accordion
>
  <vm-collapse-item short-border title="标题1">内容1</vm-collapse-item>
  <vm-collapse-item short-border title="标题2">内容2</vm-collapse-item>
  <vm-collapse-item short-border title="标题3">内容3</vm-collapse-item>
</vm-collapse>
```

``` javascript
export default {
  data() {
    return {
      active2: '1'
    };
  }
};
```

#### 自定义标题内容

```html
<vm-collapse v-model="active3">
  <vm-collapse-item>
    <template v-slot:title>标题<vm-icon name="question" /></template>
    内容
  </vm-collapse-item>
  <vm-collapse-item
    title="标题"
    value="内容"
    icon="shop"
  >
    内容
  </vm-collapse-item>
```



### Collapse API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 当前展开面板的 name | `Array | String | Number` | - |
| accordion | 是否开启手风琴模式 | `Boolean` | `false` |

### Collapse Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| change | 切换面板时触发 | activeNames: `string | array` |

### CollapseItem API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|------|
| name | 唯一标识符，默认为索引值 | `String | Number` | `index` | - |
| icon | 标题栏左侧图标名称或图片链接，可选值见 Icon 组件 | `String` | - | - |
| title | 标题栏左侧内容 | `String | Number` | - | - |
| value | 标题栏右侧内容 | `String | Number` | - | - |
| label | 标题栏描述信息 | `String | Number`  | - | - |
| border | 是否显示内边框 | `Boolean` | `true` | - |
| is-link | 是否展示标题栏右侧箭头并开启点击反馈 | `Boolean` | `true` | - |
| disabled | 是否禁用面板 | `Boolean` | `false` |- |
| title-class | 左侧标题额外类名 | `String` | - |- |
| value-class | 右侧内容额外类名 | `String` | - |- |
| label-class | 描述信息额外类名 | `String` | - |- |
| short-border | 短边框 | `Boolean` | - |- |

### CollapseItem Slot

| 名称 | 说明 |
|------|------|
| - | 面板内容 |
| value | 自定义显示内容 |
| icon | 自定义`icon` |
| title | 自定义`title` |
| right-icon | 自定义右侧按钮，默认是`arrow` |

