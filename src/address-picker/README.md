## 地址选择器

### 使用指南

```javascript
import { AddressPicker } from "@varied/mobile";
Vue.use(AddressPicker);
```

### demo

#### 横向展示 tab

```vue
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
      isShow: true
    };
  },
  methods: {
    //方法
    getAddress(val, list) {}
  }
};
```

#### 竖向展示 tab

```vue
<vm-address-picker
    v-model="isShow"
    @getAddress="getAddress"/>
</demo-block>
```

```javascript
export default {
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    //方法
    getAddress(val, list) {}
  }
};
```

#### 选择省级

```vue
<vm-address-picker
    v-model="isShow"
    :level='1'
    @getAddress="getAddress"/>
</demo-block>
```

```javascript
export default {
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    //方法
    getAddress(val, list) {}
  }
};
```

#### 选择市级

```vue
<vm-address-picker
    v-model="isShow"
    :level='2'
    @getAddress="getAddress"/>
</demo-block>
```

```javascript
export default {
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    //方法
    getAddress(val, list) {}
  }
};
```

#### 限制省份

```vue
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
      isShow: true
    };
  },
  methods: {
    //方法
    getAddress(val, list) {}
  }
};
```

### API

| 参数         | 说明                                       | 类型      | 默认值 |
| ------------ | ------------------------------------------ | --------- | ------ |
| landscape    | 是否横向展示 tab                           | `Boolean` | false  |
| provinceName | 限制省份                                   | `String`  | --     |
| level        | 省市区选择,可选择项：省：1；市：2；区县：3 | `Number`  | 3      |
| isShow       | 是否显示                                   | `Boolean` | false  |

### Event

| 事件名        | 说明               | 参数                                                  |
| ------------- | ------------------ | ----------------------------------------------------- |
| getAddress    | 获取地址           | address 详细地址,addressList array 类型，省，市，区县 |
| changeAddress | 实时传输选择的地址 | address 详细地址,addressList array 类型，省，市，区县 |
