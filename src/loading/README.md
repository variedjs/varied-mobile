## Loading 加载

### 使用指南
``` javascript
import { Loading } from '@varied/mobile';

Vue.use(Loading);
```

### 代码演示

#### Circular

```html
<vm-loading/>
<vm-loading
  color="white"
  background="rgba(0,0,0,.6)"/>
```

#### Spinner

```html
<vm-loading
  type="spinner"/>
<vm-loading
  type="spinner"
  color="white"
  background="rgba(0,0,0,.6)"
  backgroundSize="20px"/>
```

### API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| color | 颜色 | `String` | `#c9c9c9` | - |
| type | 类型，可选值为 `spinner` | `String` | `circular` | - |
| size | 大小 | `String` | `30px` | - |
| background | 背景色 | `String` | - | - |
| backgroundSize | 背景大小 | `String` | `10px` | - |
