<template>
  <div class="demo">
    <demo-block
      title="日期（年月日时分）">
      <vm-field
        v-model="value"
        placeholder="选择日期"
        :readonly="true"
        @click="select"/>
      <vm-date-picker
        v-model="show"
        @getDate="getDate"
        type="datetime"
        :is-period="true"
        :is-range="false"
        :is-zero="true"/>
    </demo-block>
    <demo-block
      title="日期（年月日）">
      <vm-field
        v-model="value1"
        placeholder="选择日期"
        :readonly="true"
        @click="select1"/>
      <vm-date-picker
        v-model="show1"
        @getDate="getDate1"
        type="date"
        :is-period="true"
        :is-range="false"
        :is-zero="true"/>
    </demo-block>
    <demo-block
      title="日期（时分）">
      <vm-field
        v-model="value2"
        placeholder="选择日期"
        :readonly="true"
        @click="select2"/>
      <vm-date-picker
        v-model="show2"
        @getDate="getDate2"
        type="time"
        :is-period="true"
        :is-range="false"
        :is-zero="true"/>
    </demo-block>
    <demo-block
      title="日期（年月日时分）范围">
      <vm-field
        v-model="value3"
        placeholder="选择日期"
        :readonly="true"
        @click="select3"/>
      <vm-date-picker
        v-model="show3"
        @getDate="getDate3"
        type="datetime"
        :is-period="true"
        :is-range="true"
        :is-zero="true"/>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        title: 'vmp UI框架demo',
        show: false,
        value: '',
        show1: false,
        value1: '',
        show2: false,
        value2: '',
        show3: false,
        value3: '',
      }
    },
    methods: {//方法
      getDate(val) {
        this.value = val.date;
      },
      select() {
        this.show = true;
      },
      getDate1(val) {
        this.value1 = val.date;
      },
      select1() {
        this.show1 = true;
      },
      getDate2(val) {
        this.value2 = val.date;
      },
      select2() {
        this.show2 = true;
      },
      getDate3(val) {
        this.value3 = val.start.date + ' - ' + val.end.date;
      },
      select3() {
        this.show3 = true;
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
<style scoped lang="less">
  .demo {
    width: 100%;
    min-height: 100%;
    background-color: #f4f4f4;
    position: absolute;

    p {
      margin: 10px;
      color: #666666;
    }
  }
</style>
