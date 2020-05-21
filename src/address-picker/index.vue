<!--/* eslint-disable */-->
<template>
  <div
    v-if="isShow"
    :class="b()"
    @touchmove.prevent
    @click="hide">
    <div
      :class="b('content')"
      @click.stop>
      <p
        :class="b('content-title')">
        请选择
        <icon
          :class="b('content-close')"
          @click="hide"
          name="close"
          color="#707070"
          size="30"/>
      </p>
      <ul
        :class="b('content-tab',{'landscape':landscape})">
        <li
          v-for="(item,index) in tabList"
          :key="index"
          @click="selectTab(index)"
          :class="{'selected':tabIndex===index}">
          {{item.name}}
        </li>
      </ul>
      <ul
        :class="b('content-data')">
        <li
          :class="index%2 === 0?'two':''"
          v-for="(item,index) in showData"
          :key="index"
          @click.stop="select(item)">
          <span
            :class="{'selected':item.name === tabList[tabIndex].name}">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {$RemoveItem} from '../utils/commonUtils';
  import province from '../data/province.json';
  import city from '../data/city.json';
  import county from '../data/county.json';
  import create from '../utils/create';

  export default create({
    name: 'address-picker',
    props: {
      value: Boolean,
      provinceName: {
        type: String,
        default: ''
      },
      landscape: {
        type: Boolean,
        default: false
      },
      level: {
        type: Number,
        default: 3
      },
    },
    watch: {
      address() {
        this.$emit('changeAddress', this.address, this.addressList);
        if (this.level === this.addressList.length) {
          this.$emit('getAddress', this.address, this.addressList);
        } else {
          if (this.isEnd) {
            this.isEnd = false;
            this.$emit('getAddress', this.address, this.addressList);
          }
        }
      },
      value() {
        this.isShow = this.value;
      },
      isShow() {
        this.$emit('input', this.isShow);
      },
    },
    data() {
      return {
        showData: [],
        tabList: [{name: '请选择省份'}],
        address: '',
        addressList: [],
        tabIndex: 0,
        isShow: false,
        isEnd: false,
      }
    },
    methods: {//方法
      selectTab(index) {
        switch (index) {
          case 0:
            if (this.provinceName === '') {
              this.tabIndex = index;
              this.get(0);
            }
            break;
          case 1:
            this.tabIndex = index;
            this.get(1, this.tabList[index - 1].id);
            break;
          case 2:
            this.tabIndex = index;
            this.get(2, this.tabList[index - 1].id);
            break;
          default:
            break;
        }
      },
      select(item) {
        switch (this.tabIndex) {
          case 0:
            this.tabList[0].name = item.name;
            this.tabList[0].id = item.id;
            if (this.level === 1) {
              this.hide();
            } else {
              this.get(1, item.id, true);
            }
            break;
          case 1:
            this.tabList[1].name = item.name;
            this.tabList[1].id = item.id;
            if (this.level === 2) {
              this.hide();
            } else {
              this.get(2, item.id, true);
            }
            break;
          case 2:
            this.tabList[2].name = item.name;
            this.tabList[2].id = item.id;
            this.hide();
            break;
          default:
            break;
        }
        let address = '';
        let addressList = [];
        this.tabList.forEach((val, index) => {
          if (val.name.indexOf('请选择') === -1) {
            address += val.name;
            addressList[index] = val.name;
          }
        });
        this.address = address;
        this.addressList = addressList;
      },
      hide() {
        this.isShow = false;
      },
      get(level, id, change) {
        let data = [];
        let self = this;
        switch (level) {
          case 0:
            data = province.list;
            break;
          case 1:
            data = city[id];
            break;
          case 2:
            data = county[id];
            break;
        }
        if (data && data.length > 0) {
          let showData = [];
          if (change) {
            this.tabList[this.tabIndex + 1] = {name: '请选择'};
            this.tabIndex = this.tabIndex + 1;
            this.tabList = $RemoveItem(this.tabList, this.tabIndex, 2);
          }
          data.forEach(val => {
            let obj = {};
            if (val.fullname.length > 5) {
              if (val.name) {
                obj.name = val.name;
              } else {
                obj.name = val.fullname;
              }
            } else {
              obj.name = val.fullname;
            }
            obj.id = val.id;
            showData.push(obj);
          });
          self.showData = showData.sort(
            function compareFunction(param1, param2) {
              return param1.name.localeCompare(param2.name, "zh");
            }
          );
        } else {
          self.hide();
          let address = '';
          let addressList = [];
          self.tabList.forEach((val, index) => {
            if (val.name.indexOf('请选择') === -1) {
              address += val.name;
              addressList[index] = val.name;
            }
          });
          self.address = address;
          self.addressList = addressList;
          self.isEnd = true;
        }
      },
      init() {
        if (this.provinceName) {
          province.list.forEach(val => {
            if (val.fullname === this.provinceName) {
              let obj = {};
              if (val.fullname.length > 5) {
                if (val.name) {
                  obj.name = val.name;
                } else {
                  obj.name = val.fullname;
                }
              } else {
                obj.name = val.fullname;
              }
              obj.id = val.id;
              this.select(obj);
            }
          });
        } else {
          this.get(0);
        }
      }
    },
    created() {//渲染前执行
    },
    mounted() {//渲染后执行
      let self = this;
      self.isShow = self.value;
      self.init();
    },
    computed: {},
  });
</script>
