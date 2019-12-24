<!--/* eslint-disable */-->
<template>
  <div>
    <demo-block title="横向展示tab">
      <vm-field v-model="value" placeholder="选择地址" :readonly="true" @click="select"/>
      <vm-address-picker
        :landscape="true"
        v-model="show"
        @getAddress="getAddress"/>
    </demo-block>
    <demo-block title="竖向展示tab">
      <vm-field v-model="value1" placeholder="选择地址" :readonly="true" @click="select1"/>
      <vm-address-picker
        v-model="show1"
        @getAddress="getAddress1"/>
    </demo-block>
    <demo-block title="限制省份">
      <vm-field v-model="value2" placeholder="选择地址" :readonly="true" @click="select2"/>
      <vm-address-picker
        v-model="show2"
        :provinceName="'北京市'"
        @getAddress="getAddress2"/>
    </demo-block>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        value: '',
        show1: false,
        value1: '',
        show2: false,
        value2: '',
      }
    },
    methods: {//方法
      getAddress(val, list) {
        this.value = val;
        console.log(val);
        console.log(list);
      },
      select() {
        this.show = true;
      },
      getAddress1(val, list) {
        this.value1 = val;
        console.log(val);
        console.log(list);
      },
      select1() {
        this.show1 = true;
      },
      getAddress2(val, list) {
        this.value2 = val;
        console.log(val);
        console.log(list);
      },
      select2() {
        this.show2 = true;
      },
    },
    created() {//渲染前执行
      document.title = this.title;
    },
    mounted() {//渲染后执行
    },
    computed: {},
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

