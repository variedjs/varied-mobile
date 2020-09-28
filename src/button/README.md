## Button 按钮

### 使用指南
``` javascript
import { Button } from '@varied/mobile';

Vue.use(Button);
```
通过加入全局样式`bg-`控制按钮颜色
### 代码演示

#### 按钮形状
支持`round`、`fab`

```html
<vm-button
  class="bg-cyan">
  默认
</vm-button>

<vm-button
  round
  class="bg-cyan">
  小圆角
</vm-button>

<vm-button
  radius="sc"
  class="bg-cyan">
  半圆角
</vm-button>

<vm-button
  radius="fc"
  class="bg-cyan shadow-blue">
  <vm-icon name="opera" />
</vm-button>
```

#### 朴素按钮
只需要加入我们提供的全局样式`plain-`即可变为朴素按钮
```html
<vm-button
  class="border-blue">
  海蓝
</vm-button>

<vm-button
  class="border-red">
  嫣红
</vm-button>

<vm-button
  class="border-orange">
  桔橙
</vm-button>

<vm-button
  class="border-yellow">
  明黄
</vm-button>
```
#### 按钮阴影
只需要加入我们提供的全局样式`shadow`
```html
<vm-button 
  class="bg-purple shadow">
  姹紫
</vm-button>

<vm-button 
  class="bg-mauve shadow">
  木槿
</vm-button>

<vm-button 
  class="bg-pink shadow">
  桃粉
</vm-button>

<vm-button 
  class="bg-brown shadow">
  棕褐
</vm-button>
```


#### 大小

通过设置size属性控制按钮大小, 可选值`sm`,`md`,`lg`, 默认`md`

```html
<vm-button
  class="bg-green"
  size="sm"
>
  小尺寸
</vm-button>

<vm-button
  class="bg-green">
  默认
</vm-button>

<vm-button
  class="bg-green"
  size="lg"
>
  大尺寸
</vm-button>
```

#### 块状按钮

```html 
<vm-button
  block
  size="lg"
  class="bg-blue"
>
  块状
</vm-button>
```


#### 加载
```html
<vm-button
  class="bg-green"
  loading
/>

<vm-button
  class="bg-red"
  loading
  loading-text="加载中..."
/>
```

### 禁用

```html
<vm-button
  class="bg-green"
  disabled
>
  禁用状态
</vm-button>
```

### 高级
```html
<vm-button class="bg-green">
  <vm-icon name="search"/>
  <span>按钮</span>
</vm-button>
```

### 自定义宽高
```html
<vm-button
  width="100px"
  height="30px"
  class="bg-cyan">
  默认
</vm-button>
```

### 长按事件
```html
<vm-button
  @longPress="onLongPress"
  :longPressTime="500"
  class="bg-cyan">
  长按
</vm-button>
```

```js
import { Toast } from '@varied/mobile';

export default {
  methods: {
    onLongPress(){
      Toast('长按');
    }
  },
};
```

### API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| size | 尺寸，可选值为 `lg` `sm` | `String` | `md` | - |
| tag | HTML 标签 | `String` | `button` | - |
| disabled | 是否禁用按钮 | `Boolean` | `false` | - |
| loading | 是否显示为加载状态 | `Boolean` | `false` | - |
| loading-text | 加载文字 | `String` | | - |
| block | 是否为块级元素 | `Boolean` | `false` | - |
| radius | 圆角，可选值为 `mc` `sc` `fc` | `String` | `nc` | - |
| width | 宽度 | _String \| Number_ | `-` | `v0.0.6` |
| height | 高度 | _String \| Number_ | `-` | `v0.0.6` |
| longPress | 是否开启长按 | `Boolean` | `true` | `v0.0.6` |
| longPressTime | 长按时间 | `Number` | `1000` | `v0.0.6` |

### Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| click | 点击按钮且按钮状态不为加载或禁用时触发 | - |
| longPress | 长按按钮且按钮状态不为加载或禁用时触发并长按事件已开启 | - |
