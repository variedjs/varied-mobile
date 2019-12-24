## 图片切换

### 使用指南

``` javascript
import { CarouselMap } from '@varied/mobile';
Vue.use(CarouselMap);
```

### demo

```javascript
<vm-carousel-map :imgs="imgs" :imgWidth="315" :imgHeight="200" :boxHeight="250"/>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| imgs | 图片数组 | `Array` | [] |
| imgWidth | 图片宽度 | `Number` | 315 |
| imgHeight | 图片高度 | `Number` | 200 |
| boxHeight | 图片突出显示高度 | `Number` | 250 |
| offset | 距离两边的宽度 | `Number` | 50 |
| unlimited | 滑动过程图片是否无限大 | `Boolean` | true |
| infinitesimal | 滑动过程图片是否无限小 | `Boolean` | true |

### Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| getIndex | 实时获取图片位置 | index  |
| onClick | 图片点击事件 | index  |
