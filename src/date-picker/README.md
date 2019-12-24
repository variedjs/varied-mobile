## 日期选择器

### 使用指南

``` javascript
import { DatePicker } from '@varied/mobile';
Vue.use(DatePicker);
```

### demo

#### 日期（年月日时分）
```javascript
<vm-date-picker
  v-model="show"
  @getDate="getDate"
  type="datetime"
  :is-period="true"
  :is-range="false"
  :is-zero="true"/>
```
```javascript
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {//方法
    getDate(val) {
    },
  },
}
```

#### 日期（年月日）
```javascript
<vm-date-picker
  v-model="show"
  @getDate="getDate"
  type="date"
  :is-period="true"
  :is-range="false"
  :is-zero="true"/>
```
```javascript
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {//方法
    getDate(val) {
    },
  },
}
```

#### 日期（时分）
```javascript
<vm-date-picker
  v-model="show"
  @getDate="getDate"
  type="time"
  :is-period="true"
  :is-range="false"
  :is-zero="true"/>
```
```javascript
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {//方法
    getDate(val) {
    },
  },
}
```

#### 日期（年月日时分）范围
```javascript
<vm-date-picker
  v-model="show"
  @getDate="getDate"
  type="datetime"
  :is-period="true"
  :is-range="true"
  :is-zero="true"/>
```
```javascript
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {//方法
    getDate(val) {
    },
  },
}
```

### API

| 参数 | 说明 | 类型 | 默认值 | 可选参数
|------|------|------|------|------|
| v-model | 是否显示 | `Boolean` |  |
| type | 日期类型 | `String` | 'date' | 'date','time','datetime' |
| date | 日期 | `String` | 当前时间 |
| isSelect | 是否默认选择日期 | `Boolean` | true |
| isZero | 小于0的日期是否加上0 | `Boolean` | false |
| isPeriod | 是否12小时制 | `Boolean` | false |
| isRange | 是否选择范围时间 | `Boolean` | false |

### Event

| 事件名 | 说明 | 参数 | 参数类型 |
|------|------|------|------|
| getDate | 获取日期 | time  | Object  |
