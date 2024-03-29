## Tab 标签页

> 0.0.6 版本开始支持此组件。

### 引入

```js
import Vue from "vue";
import { Tab, Tabs } from "@varied/mobile";

Vue.use(Tab);
Vue.use(Tabs);
```

## 代码演示

### 基础用法

通过 `v-model` 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。

```html
<vm-tabs v-model="active">
  <vm-tab title="标签 1">内容 1</vm-tab>
  <vm-tab title="标签 2">内容 2</vm-tab>
  <vm-tab title="标签 3">内容 3</vm-tab>
  <vm-tab title="标签 4">内容 4</vm-tab>
</vm-tabs>
```

```js
export default {
  data() {
    return {
      active: 2
    };
  }
};
```

### 通过名称匹配

在标签指定 `name` 属性的情况下，`v-model` 的值为当前标签的 `name`（此时无法通过索引值来匹配标签）。

```html
<vm-tabs v-model="activeName">
  <vm-tab title="标签 1" name="a">内容 1</vm-tab>
  <vm-tab title="标签 2" name="b">内容 2</vm-tab>
  <vm-tab title="标签 3" name="c">内容 3</vm-tab>
</vm-tabs>
```

```js
export default {
  data() {
    return {
      activeName: "a"
    };
  }
};
```

### 标签栏滚动

标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。

```html
<vm-tabs>
  <vm-tab v-for="index in 8" :title="'标签 ' + index">
    内容 {{ index }}
  </vm-tab>
</vm-tabs>
```

### 禁用标签

设置 `disabled` 属性即可禁用标签，如果需要监听禁用标签的点击事件，可以在 `vm-tabs` 上监听`disabled` 事件。

```html
<vm-tabs @disabled="onClickDisabled">
  <vm-tab title="标签 1">内容 1</vm-tab>
  <vm-tab title="标签 2" disabled>内容 2</vm-tab>
  <vm-tab title="标签 3">内容 3</vm-tab>
</vm-tabs>
```

```js
import { Toast } from "@varied/mobile";

export default {
  methods: {
    onClickDisabled(name, title) {
      Toast(name + "已被禁用");
    }
  }
};
```

### 样式风格

`Tab` 支持两种样式风格：`line` 和`card`，默认为 `line` 样式，可以通过 `type` 属性切换样式风格。

```html
<vm-tabs type="card">
  <vm-tab title="标签 1">内容 1</vm-tab>
  <vm-tab title="标签 2">内容 2</vm-tab>
  <vm-tab title="标签 3">内容 3</vm-tab>
</vm-tabs>
```

### 点击事件

可以在 `vm-tabs` 上绑定 `click` 事件，事件传参为标签对应的标识符和标题。

```html
<vm-tabs @click="onClick">
  <vm-tab title="标签 1">内容 1</vm-tab>
  <vm-tab title="标签 2">内容 2</vm-tab>
</vm-tabs>
```

```js
import { Toast } from "@varied/mobile";

export default {
  methods: {
    onClick(name, title) {
      Toast(title);
    }
  }
};
```

### 粘性布局

通过 `sticky` 属性可以开启粘性布局，粘性布局下，标签页滚动到顶部时会自动吸顶。

```html
<vm-tabs v-model="active" sticky>
  <vm-tab v-for="index in 4" :title="'选项 ' + index">
    内容 {{ index }}
  </vm-tab>
</vm-tabs>
```

### 自定义标签

通过 `title` 插槽可以自定义标签内容。

```html
<vm-tabs v-model="active">
  <template v-slot:title="{ title }">
    <vm-icon name="address-book" />{{ title }}
  </template>
  <vm-tab
    v-for="(item, index) in [{ title: 'a标签' }, { title: 'b标签' }]"
    :key="index"
    :title="item.title"
  >
    内容 {{ index }}
  </vm-tab>
</vm-tabs>
```

### 切换动画

通过 `animated` 属性可以开启切换标签内容时的转场动画。

```html
<vm-tabs v-model="active" animated>
  <vm-tab v-for="index in 4" :title="'选项 ' + index">
    内容 {{ index }}
  </vm-tab>
</vm-tabs>
```

### 滑动切换

通过 `swipeable` 属性可以开启滑动切换标签页。

```html
<vm-tabs v-model="active" swipeable>
  <vm-tab v-for="index in 4" :title="'选项 ' + index">
    内容 {{ index }}
  </vm-tab>
</vm-tabs>
```

### 滚动导航

通过 `scrollspy` 属性可以开启滚动导航模式，该模式下，内容将会平铺展示。

```html
<vm-tabs v-model="active" scrollspy sticky>
  <vm-tab v-for="index in 8" :title="'选项 ' + index">
    内容 {{ index }}
  </vm-tab>
</vm-tabs>
```

### 异步切换

通过 `before-change` 属性可以在切换标签前执行特定的逻辑。

```html
<vm-tabs :before-change="beforeChange">
  <vm-tab v-for="index in 4" :title="'选项 ' + index">
    内容 {{ index }}
  </vm-tab>
</vm-tabs>
```

```js
export default {
  methods: {
    beforeChange(index) {
      // 返回 false 表示阻止此次切换
      if (index === 1) {
        return false;
      }

      // 返回 Promise 来执行异步逻辑
      return new Promise(resolve => {
        // 在 resolve 函数中返回 true 或 false
        resolve(index !== 3);
      });
    }
  }
};
```

## API

### Tabs Props

| 参数                 | 说明                                                                 | 类型                           | 默认值    |
| -------------------- | -------------------------------------------------------------------- | ------------------------------ | --------- |
| v-model              | 绑定当前选中标签的标识符                                             | _number \| string_             | `0`       |
| type                 | 样式风格类型，可选值为 `card`                                        | _string_                       | `line`    |
| color                | 标签主题色                                                           | _string_                       | `#ee0a24` |
| background           | 标签栏背景色                                                         | _string_                       | `white`   |
| duration             | 动画时间，单位秒                                                     | _number \| string_             | `0.3`     |
| line-width           | 底部条宽度，默认单位 `px`                                            | _number \| string_             | `40px`    |
| line-height          | 底部条高度，默认单位 `px`                                            | _number \| string_             | `3px`     |
| animated             | 是否开启切换标签内容时的转场动画                                     | _boolean_                      | `false`   |
| border               | 是否显示标签栏外边框，仅在 `type="line"` 时有效                      | _boolean_                      | `false`   |
| ellipsis             | 是否省略过长的标题文字                                               | _boolean_                      | `true`    |
| sticky               | 是否使用粘性定位布局                                                 | _boolean_                      | `false`   |
| swipeable            | 是否开启手势滑动切换                                                 | _boolean_                      | `false`   |
| lazy-render          | 是否开启延迟渲染（首次切换到标签时才触发内容渲染）                   | _boolean_                      | `true`    |
| scrollspy            | 是否开启滚动导航                                                     | _boolean_                      | `false`   |
| offset-top           | 粘性定位布局下与顶部的最小距离，支持 `px` `vw` `rem` 单位，默认 `px` | _number \| string_             | `0`       |
| swipe-threshold      | 滚动阈值，标签数量超过阈值时开始横向滚动                             | _number \| string_             | `5`       |
| title-active-color   | 标题选中态颜色                                                       | _string_                       | -         |
| title-inactive-color | 标题默认态颜色                                                       | _string_                       | -         |
| before-change        | 切换标签前的回调函数，返回 `false` 可阻止切换，支持返回 Promise      | _(name) => boolean \| Promise_ | -         |

### Tab Props

| 参数        | 说明                                                                                      | 类型               | 默认值       |
| ----------- | ----------------------------------------------------------------------------------------- | ------------------ | ------------ |
| title       | 标题                                                                                      | _string_           | -            |
| disabled    | 是否禁用标签                                                                              | _boolean_          | `false`      |
| dot         | 是否在标题右上角显示小红点                                                                | _boolean_          | `false`      |
| badge       | 图标右上角徽标的内容                                                                      | _number \| string_ | -            |
| info        | 图标右上角徽标的内容（已废弃，请使用 badge 属性）                                         | _number \| string_ | -            |
| name        | 标签名称，作为匹配的标识符                                                                | _number \| string_ | 标签的索引值 |
| url         | 点击后跳转的链接地址                                                                      | _string_           | -            |
| to          | 点击后跳转的目标路由对象，同 vue-router 的 [to 属性](https://router.vuejs.org/zh/api/#to) | _string \| object_ | -            |
| replace     | 是否在跳转时替换当前页面历史                                                              | _boolean_          | `false`      |
| title-style | 自定义标题样式                                                                            | _any_              | -            |

### Tabs Events

| 事件名   | 说明                                             | 回调参数                                       |
| -------- | ------------------------------------------------ | ---------------------------------------------- |
| click    | 点击标签时触发                                   | name：标识符，title：标题                      |
| change   | 当前激活的标签改变时触发                         | name：标识符，title：标题                      |
| disabled | 点击被禁用的标签时触发                           | name：标识符，title：标题                      |
| rendered | 标签内容首次渲染时触发（仅在开启延迟渲染后触发） | name：标识符，title：标题                      |
| scroll   | 滚动时触发，仅在 sticky 模式下生效               | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |

### Tabs 方法

通过 ref 可以获取到 Tabs 实例并调用实例方法，详见[组件实例方法](#/quickstart#zu-jian-shi-li-fang-fa)

| 方法名   | 说明                                         | 参数         | 返回值 |
| -------- | -------------------------------------------- | ------------ | ------ |
| resize   | 外层元素大小变化后，可以调用此方法来触发重绘 | -            | void   |
| scrollTo | 滚动到指定的标签页，在滚动导航模式下可用     | name: 标识符 | void   |

### Tabs Slots

| 名称      | 说明                       |
| --------- | -------------------------- |
| nav-left  | 标题左侧内容               |
| nav-right | 标题右侧内容               |
| title     | 自定义标题，不支持动态渲染 |

### Tab Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 标签页内容 |
