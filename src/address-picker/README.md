## 地址选择器

### 使用指南

``` javascript
import { AddressPicker } from '@varied/mobile';
Vue.use(AddressPicker);
```

### demo

#### 横向展示tab
```javascript
<vm-address-picker
    :landscape="true"
    v-model="isShow"
    @getAddress="getAddress"/>
</demo-block>
```
```javascript
export default {
  data() {
    return {
      isShow: true,
    }
  },
  methods: {//方法
    getAddress(val, list) {
    },
  },
}
```
#### 竖向展示tab
```javascript
<vm-address-picker
    v-model="isShow"
    @getAddress="getAddress"/>
</demo-block>
```
```javascript
export default {
  data() {
    return {
      isShow: true,
    }
  },
  methods: {//方法
    getAddress(val, list) {
    },
  },
}
```
#### 限制省份
```javascript
<vm-address-picker
    v-model="isShow"
    :provinceName="'北京市'"
    @getAddress="getAddress"/>
</demo-block>
```
```javascript
export default {
  data() {
    return {
      isShow: true,
    }
  },
  methods: {//方法
    getAddress(val, list) {
    },
  },
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| landscape | 是否横向展示tab | `Boolean` | false |
| provinceName | 限制省份 | `String` | -- |
| isShow | 是否显示 | `Boolean` | false |

### Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| getAddress | 实时传输选择的地址 | address 详细地址,addressList array类型，省，市，区县  |
