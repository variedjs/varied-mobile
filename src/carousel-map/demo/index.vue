<template>
  <demo-section>
    <demo-block title="基础用法">
      <vm-carousel-map
        :imgs="imgs"
        :imgWidth="315"
        :imgHeight="200"
        :boxHeight="250"/>
    </demo-block>
  </demo-section>
</template>
<script>
  export default {
    data() {
      return {
        imgs: [
          'http://img12.3lian.com/gaoqing02/02/93/37.jpg',
          'http://file02.16sucai.com/d/file/2015/0408/779334da99e40adb587d0ba715eca102.jpg',
          'http://file02.16sucai.com/d/file/2014/0829/372edfeb74c3119b666237bd4af92be5.jpg'
        ]
      }
    },
    methods: {}
  };
</script>
<style lang="less">
</style>
