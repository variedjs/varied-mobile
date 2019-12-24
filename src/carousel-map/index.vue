<!--/* eslint-disable */-->
<template>
  <div
    @touchmove.prevent
    :class="b()">
    <ul
      :id="b('ul')">
      <li
        @touchstart="start"
        @touchmove="move"
        @touchend="end"
        :class="b('li')"
        v-for="(item,index) in images"
        :key="index">
        <img
          :src="item"
          alt=""/>
      </li>
    </ul>
  </div>
</template>

<script>
  import create from '../utils/create';

  export default create({
    name: 'carousel-map',
    watch: {
      index() {
        this.$emit('getIndex', this.index);
      },
    },
    props: {
      imgs: {
        type: Array,
        default: () => []
      },
      imgWidth: {
        type: Number,
        default: 315
      },
      imgHeight: {
        type: Number,
        default: 200
      },
      boxHeight: {
        type: Number,
        default: 250
      },
      offset: {
        type: Number,
        default: 50
      },
      unlimited: {
        type: Boolean,
        default: true
      },
      infinitesimal: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        index: 1,
        startX: 0,
        startY: 0,
        moveX: 0,
        marginLeft: 0,
        initMarginLeft: 0,
        images: [],
      }
    },
    methods: {//方法
      onClick() {
        this.$emit('onClick', this.index);
      },
      start(e) {
        this.startX = e.changedTouches[0].pageX;
        this.startY = e.changedTouches[0].pageY;
        this.moveX = 0;
      },
      move(e) {
        let moveY = e.changedTouches[0].pageY - this.startY;
        if (moveY > this.offset || moveY < -this.offset) {
          return;
        }
        this.moveX = e.changedTouches[0].pageX - this.startX;
        let CarouselMapLis = document.getElementsByClassName('vm-carousel-map-li');
        if (this.moveX > 0) {
          let index = this.index - 1;
          CarouselMapLis[this.index].style.height = (this.unlimited ? (this.boxHeight - this.moveX) : (this.boxHeight - this.moveX) < this.imgHeight ? this.imgHeight : (this.boxHeight - this.moveX)) + 'px';
          CarouselMapLis[index].style.height = (this.infinitesimal ? (this.imgHeight + this.moveX) : (this.imgHeight + this.moveX) > this.boxHeight ? this.boxHeight : (this.imgHeight + this.moveX)) + 'px';
        } else {
          let index = this.index + 1;
          CarouselMapLis[this.index].style.height = (this.infinitesimal ? (this.boxHeight + this.moveX) : (this.boxHeight + this.moveX) < this.imgHeight ? this.imgHeight : (this.boxHeight + this.moveX)) + 'px';
          CarouselMapLis[index].style.height = (this.unlimited ? (this.imgHeight - this.moveX) : (this.imgHeight - this.moveX) > this.boxHeight ? this.boxHeight : (this.imgHeight - this.moveX)) + 'px';
        }
        let ulE = document.getElementById('vm-carousel-map-ul');
        let leftX = this.marginLeft + this.moveX;
        if (leftX > this.imgWidth * this.index || leftX < -this.imgWidth * (this.index + 1)) {
          leftX = this.marginLeft + this.imgWidth;
        }
        ulE.style.marginLeft = leftX + 'px';
      },
      end() {
        if (this.moveX === 0) {
          this.onClick();
          return;
        }
        let num = Math.round(this.moveX / this.imgWidth);
        num = num > 1 ? 1 : num;
        num = num < -1 ? -1 : num;
        this.marginLeft += num * this.imgWidth;
        let ulE = document.getElementById('vm-carousel-map-ul');
        ulE.style.marginLeft = this.marginLeft + 'px';
        let CarouselMapLis = document.getElementsByClassName('vm-carousel-map-li');
        for (let i = 0; i < CarouselMapLis.length; i++) {
          CarouselMapLis[i].style.height = this.imgHeight + 'px';
        }
        if (this.moveX > 0) {
          let index = this.index - 1;
          CarouselMapLis[this.index].style.height = this.boxHeight - num * (this.boxHeight - this.imgHeight) + 'px';
          if (index === 0) {
            this.marginLeft = this.initMarginLeft - this.imgWidth * (CarouselMapLis.length - 3);
            ulE.style.marginLeft = this.marginLeft + 'px';
            CarouselMapLis[index].style.height = this.imgHeight + 'px';
            CarouselMapLis[CarouselMapLis.length - 2].style.height = this.boxHeight + 'px';
            this.index = CarouselMapLis.length - 2;
          } else {
            CarouselMapLis[index].style.height = this.imgHeight + num * (this.boxHeight - this.imgHeight) + 'px';
            this.index += -num;
          }
        } else {
          let index = this.index + 1;
          CarouselMapLis[this.index].style.height = this.boxHeight + num * (this.boxHeight - this.imgHeight) + 'px';
          if (index === 4) {
            this.marginLeft = this.initMarginLeft;
            ulE.style.marginLeft = this.marginLeft + 'px';
            CarouselMapLis[index].style.height = this.imgHeight + 'px';
            CarouselMapLis[1].style.height = this.boxHeight + 'px';
            this.index = 1;
          } else {
            CarouselMapLis[index].style.height = this.imgHeight - num * (this.boxHeight - this.imgHeight) + 'px';
            this.index += -num;
          }
        }
      },
    },
    created() {//渲染前执行
      this.images[0] = this.imgs[this.imgs.length - 1];
      this.imgs.forEach((val, index) => {
        this.images[index + 1] = val;
      });
      this.images[this.imgs.length + 1] = this.imgs[0];
    },
    mounted() {//渲染后执行
      let CarouselMapLis = document.getElementsByClassName('vm-carousel-map-li');
      let ulE = document.getElementById('vm-carousel-map-ul');
      for (let i = 0; i < CarouselMapLis.length; i++) {
        CarouselMapLis[i].style.height = this.imgHeight + 'px';
        CarouselMapLis[i].style.width = this.imgWidth + 'px';
      }
      ulE.style.width = this.imgWidth * CarouselMapLis.length + 'px';
      ulE.style.height = this.boxHeight + 'px';
      this.initMarginLeft = this.marginLeft = -(this.imgWidth - (document.getElementsByClassName('vm-carousel-map')[0].clientWidth - this.imgWidth) / 2);
      ulE.style.marginLeft = this.initMarginLeft + 'px';
      CarouselMapLis[this.index].style.height = this.boxHeight + 'px';
    },
    computed: {},
  })
</script>
