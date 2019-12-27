<template>
  <div v-if="isShow"
       :class="b()"
       @click="hide">
    <div
      :class="b('content')"
      @click.stop>
      <div
        :class="b('content-range')"
        v-if="isRange">
        <div
          :class="b('start-date',{'select':startState===0})"
          @click="switchDate(0)">
          <span>开始时间</span>
          <span>{{dateDes[0]}}</span>
        </div>
        <div
          :class="b('end-date',{'select':startState===1})"
          @click="switchDate(1)">
          <span>结束时间</span>
          <span>{{dateDes[1]}}</span>
        </div>
      </div>
      <div
        :class="b('content-date')"
        v-if="type.indexOf('date')>-1">
        <div
          :class="b('content-date-title')">
          <span
            @click="preYear(false)">
            <icon
              name="chevron-left"
              color="#707070"
              size="30"/>
          </span>
          <span>
            {{dateTime[startState].year}}年
          </span>
          <span
            @click="nextYear(false)">
            <icon
              name="chevron-right"
              color="#707070"
              size="30"/>
          </span>
          <span
            @click="preMonth(false)">
            <icon
              name="chevron-left"
              color="#707070"
              size="30"/>
          </span>
          <span>
            {{dateTime[startState].month}}月
          </span>
          <span
            @click="nextMonth(false)">
            <icon
              name="chevron-right"
              color="#707070"
              size="30"/>
          </span>
        </div>
        <div
          :class="b('content-date-week')">
          <label>周日</label>
          <label>周一</label>
          <label>周二</label>
          <label>周三</label>
          <label>周四</label>
          <label>周五</label>
          <label>周六</label>
        </div>
        <div
          :class="b('content-date-day')">
          <label
            @click="preMonth(item)"
            v-for="(item,index) in dateObj.pre"
            :key="'pre'+index"
            :class="classStyle(item,0,-1)">
            <span
              :class="classStyle(item,1,-1)">
              {{item}}
            </span>
          </label>
          <label
            @click="selectDay(item)"
            v-for="(item,index) in dateObj.cur"
            :key="'cur'+index"
            :class="classStyle(item,0,0)">
            <span
              :class="classStyle(item,1,0)">
              {{item}}
            </span>
          </label>
          <label
            @click="nextMonth(item)"
            v-for="(item,index) in dateObj.last"
            :key="'last'+index"
            :class="classStyle(item,0,1)">
            <span
              :class="classStyle(item,1,1)">
              {{item}}
            </span>
          </label>
        </div>
      </div>
      <div
        :class="b('content-time')"
        @touchmove.prevent
        v-if="type.indexOf('time')>-1">
        <div
          :class="b('content-time-hour')"
          :style="{height:labelHeight*3+'px'}">
          <label
            :style="{height:labelHeight+'px'}"
            class="select">
          </label>
          <div
            class="hour"
            :style="{top:top.hourTop}"
            @touchstart="start"
            @touchmove="move($event,0)"
            @touchend="end(0)">
            <label
              :style="{height:labelHeight+'px'}">
              {{isPeriod?timeObj.hour:timeObj.hour-1}}
            </label>
            <label
              :style="{height:labelHeight+'px'}"
              v-for="item in timeObj.hour"
              :key="item">
              {{isPeriod?item:item-1}}
            </label>
            <label
              :style="{height:labelHeight+'px'}">
              {{isPeriod?1:0}}
            </label>
          </div>
        </div>
        <div
          :class="b('content-time-min')"
          :style="{height:labelHeight*3+'px'}">
          <label
            :style="{height:labelHeight+'px'}"
            class="select">
          </label>
          <div
            class="min"
            :style="{top:top.minTop}"
            @touchstart="start"
            @touchmove="move($event,1)"
            @touchend="end(1)">
            <label
              :style="{height:labelHeight+'px'}">
              {{timeObj.min-1}}
            </label>
            <label
              :style="{height:labelHeight+'px'}"
              v-for="item in timeObj.min"
              :key="item">
              {{item-1}}
            </label>
            <label
              :style="{height:labelHeight+'px'}">
              0
            </label>
          </div>
        </div>
        <div
          :class="b('content-time-period')"
          :style="{height:labelHeight*3+'px'}"
          v-if="isPeriod">
          <label
            :style="{height:labelHeight+'px'}"
            class="select">
          </label>
          <div
            class="period"
            @touchstart="start"
            :style="{top:top.periodTop}"
            @touchmove="move($event,2)"
            @touchend="end(2)">
            <label
              :style="{height:labelHeight+'px'}">
            </label>
            <label
              :style="{height:labelHeight+'px'}">
              AM
            </label>
            <label
              :style="{height:labelHeight+'px'}">
              PM
            </label>
            <label
              :style="{height:labelHeight+'px'}">
            </label>
          </div>
        </div>
        <div
          :class="b('content-time-button')">
          <vm-button
            size="lg"
            class="bg-gray light shadow"
            tag="div"
            block
            @click="hide">
            取消
          </vm-button>
          <vm-button
            size="lg"
            class="submit bg-gradual-blue shadow"
            tag="div"
            block
            @click="submit">
            确定
          </vm-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {$GetCalendar, $ObjectFlashback} from "../utils/commonUtils";
  import create from '../utils/create';

  export default create({
    name: 'date-picker',
    watch: {
      value() {
        this.isShow = this.value;
      },
      startState() {
        this.dateTime[this.startState].year = this.dateTime[this.startState].curYear;
        this.dateTime[this.startState].month = this.dateTime[this.startState].curMonth;
        this.dateObj = $GetCalendar(
          this.dateTime[this.startState].year,
          this.dateTime[this.startState].month,
          this.isZero);
        this.changeTimeList();
      },
      dateTime: {
        handler() {
          this.dateObj = $GetCalendar(
            this.dateTime[this.startState].year,
            this.dateTime[this.startState].month,
            this.isZero);
          this.changeTimeList();
        },
        deep: true
      },
      isShow() {
        this.$emit('input', this.isShow);
      },
    },
    props: {
      value: Boolean,
      date: {
        type: String,
        default: ''
      },
      isZero: {
        type: Boolean,
        default: false
      },
      isSelect: {
        type: Boolean,
        default: true
      },
      isPeriod: {
        type: Boolean,
        default: false
      },
      isRange: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'date'
      },
    },
    data() {
      return {
        dateObj: {},
        timeObj: {
          hour: 24,
          min: 60
        },
        dateTime: {
          0: {
            curYear: 0,
            curMonth: 0,
            curDay: 0,
            day: 0,
            year: 0,
            month: 0,
            hour: 0,
            min: 0,
            period: 0,
          },
          1: {
            curYear: 0,
            curMonth: 0,
            curDay: 0,
            day: 0,
            year: 0,
            month: 0,
            hour: 0,
            min: 0,
            period: 0,
          },
        },
        startY: 0,
        moveY: 0,
        startState: 0,
        labelHeight: 40,
        dateDes: {
          0: '',
          1: ''
        },
        top: {
          hourTop: '',
          minTop: '',
          periodTop: ''
        },
        isShow: this.value,
      }
    },
    methods: {//方法
      preMonth(day) {
        if (this.dateTime[this.startState].month - 1 >= 1) {
          this.dateTime[this.startState].month--;
        } else {
          this.dateTime[this.startState].year--;
          this.dateTime[this.startState].month = 12;
        }
        if (day) {
          this.selectDay(day);
        }
      },
      nextMonth(day) {
        if (this.dateTime[this.startState].month + 1 <= 12) {
          this.dateTime[this.startState].month++;
        } else {
          this.dateTime[this.startState].year++;
          this.dateTime[this.startState].month = 1;
        }
        if (day) {
          this.selectDay(day);
        }
      },
      preYear() {
        this.dateTime[this.startState].year--;
      },
      nextYear() {
        this.dateTime[this.startState].year++;
      },
      selectDay(day) {
        this.dateTime[this.startState].day = day;
        this.dateTime[this.startState].curYear
          = this.dateTime[this.startState].year;
        this.dateTime[this.startState].curMonth
          = this.dateTime[this.startState].month;
        this.dateTime[this.startState].curDay
          = this.dateTime[this.startState].day;
        this.dateDes[this.startState]
          = this.getDate(this.startState).date;
        this.judgeDateTime();
        if (this.type === 'date') {
          this.hide();
          this.$emit('getDate', this.getDate());
        }
      },
      judgeDateTime() {
        if (this.isRange
          && new Date(this.dateDes[0])
          > new Date(this.dateDes[1])) {
          if (this.startState === 0) {
            this.startState = 1;
          } else {
            this.startState = 0;
          }
          this.dateTime = $ObjectFlashback(this.dateTime);
        }
        this.dateDes[0] = this.getDate().date;
        this.dateDes[1] = this.getDate(1).date;
      },
      switchDate(state) {
        this.startState = state;
      },
      hide() {
        this.isShow = false;
      },
      getDate(startState = 0) {
        let time = {};
        if (this.type.indexOf('time') > -1) {
          let hour = this.isPeriod
            ? 1 - this.dateTime[startState].hour
            : -this.dateTime[startState].hour;
          time.hour = this.isZero
            ? hour < 10
              ? '0' + hour
              : hour + ''
            : hour + '';
          time.min = this.isZero
            ? -this.dateTime[startState].min < 10
              ? '0' + -this.dateTime[startState].min
              : -this.dateTime[startState].min + ''
            : -this.dateTime[startState].min + '';
          if (this.isPeriod) {
            time.period = -this.dateTime[startState].period === 0 ? 'AM' : 'PM';
            time.date = time.hour + ':' + time.min + ' ' + time.period;
          } else {
            time.date = time.hour + ':' + time.min;
          }
        }
        if (this.type.indexOf('date') > -1) {
          time.year = this.dateTime[startState].curYear + '';
          time.month = this.dateTime[startState].curMonth + '';
          time.day = this.dateTime[startState].curDay;
          if (this.type === 'datetime') {
            time.date = this.dateTime[startState].curYear
              + '/' + this.dateTime[startState].curMonth
              + '/' + this.dateTime[startState].curDay
              + ' ' + time.date;
          } else {
            time.date = this.dateTime[startState].curYear
              + '/' + this.dateTime[startState].curMonth
              + '/' + this.dateTime[startState].curDay;
          }
          time.timestamp = new Date(time.date).getTime();
        }
        return time;
      },
      submit() {
        this.isRange ? this.$emit('getDate', {
          start: this.getDate(),
          end: this.getDate(1)
        }) : this.$emit('getDate', this.getDate());
        this.hide();
      },
      classStyle(item, type, m) {
        let year = this.dateTime[this.startState].year;
        let month = this.dateTime[this.startState].month + m;
        if (month < 1) {
          year--;
          month = 12;
        }
        if (month > 12) {
          year++;
          month = 1;
        }
        let day = item;
        let curYear0 = this.dateTime[0].curYear;
        let curMonth0 = this.dateTime[0].curMonth;
        let curDay0 = this.dateTime[0].curDay;
        let curYear1 = this.dateTime[1].curYear;
        let curMonth1 = this.dateTime[1].curMonth;
        let curDay1 = this.dateTime[1].curDay;
        let time = new Date(year + '/' + month + '/' + day).getTime();
        let time0 = new Date(curYear0 + '/' + curMonth0 + '/' + curDay0).getTime();
        let time1 = new Date(curYear1 + '/' + curMonth1 + '/' + curDay1).getTime();
        let a = time === time0;
        let b = time === time1;
        let c = time1 > time && time0 < time;
        let className = '';
        if (type === 0) {
          if (time0 !== time1) {
            if (a && this.isRange) {
              className = 'currentLeft';
            }
            if (b && this.isRange) {
              className = 'currentRight';
            }
            if (c) {
              className = 'currentBetween';
            }
          }
        } else {
          if (a || b) {
            className = 'current';
          }
          if (className === '' && m !== 0) {
            className = 'gray';
          }
        }
        return className;
      },
      start(e) {
        this.startY = e.changedTouches[0].pageY;
      },
      move(e, type) {
        this.moveY = e.changedTouches[0].pageY - this.startY;
        switch (type) {
          case 0:
            this.top.hourTop = this.dateTime[this.startState].hour
              * this.labelHeight
              + this.moveY
              + 'px';
            break;
          case 1:
            this.top.minTop = this.dateTime[this.startState].min
              * this.labelHeight
              + this.moveY
              + 'px';
            break;
          case 2:
            // eslint-disable-next-line no-case-declarations
            let top = this.dateTime[this.startState].period
              * this.labelHeight
              + this.moveY;
            if (top > 0) {
              top = 0;
            }
            if (top < -40) {
              top = -40;
            }
            this.top.periodTop = top + 'px';
            break;
          default:
            break;
        }
      },
      changeTimeList() {
        if (document.getElementsByClassName('hour')[0]
          && document.getElementsByClassName('hour')[0].style) {
          this.top.hourTop = this.dateTime[this.startState].hour
            * this.labelHeight
            + 'px';
          this.top.minTop = this.dateTime[this.startState].min
            * this.labelHeight
            + 'px';
          this.top.periodTop = this.dateTime[this.startState].period
            * this.labelHeight
            + 'px';
        }
      },
      end(type) {
        let num = Math.round(this.moveY / 40);
        switch (type) {
          case 0:
            this.dateTime[this.startState].hour
              = (this.dateTime[this.startState].hour + num)
              % this.timeObj.hour;
            this.dateTime[this.startState].hour
              = this.dateTime[this.startState].hour > 0
              ? 1 - this.timeObj.hour
              : this.dateTime[this.startState].hour;
            break;
          case 1:
            this.dateTime[this.startState].min
              = (this.dateTime[this.startState].min + num)
              % this.timeObj.min;
            this.dateTime[this.startState].min
              = this.dateTime[this.startState].min > 0
              ? 1 - this.timeObj.min
              : this.dateTime[this.startState].min;
            break;
          case 2:
            this.dateTime[this.startState].period
              = num >= 1
              ? 0
              : num <= -1
                ? -1
                : num;
            break;
          default:
            break;
        }
        this.changeTimeList();
        this.dateDes[this.startState] = this.getDate(this.startState).date;
        this.judgeDateTime();
      },
      dateHandle(startState, dateObj) {
        for (let key in dateObj) {
          this.dateTime[startState][key] = dateObj[key];
          if (this.isRange) {
            this.dateTime[startState + 1][key] = dateObj[key];
          }
        }
      },
      initDate() {
        if (this.date) {
          let date = this.date.split('/');
          let dateObj = {
            curYear: parseInt(date[0]),
            curMonth: parseInt(date[1]),
            curDay: this.isSelect
              ? this.isZero
                ? parseInt(date[2]) < 10
                  ? '0' + parseInt(date[2])
                  : date[2]
                : parseInt(date[2]) + ''
              : '',
          };
          dateObj.year = dateObj.curYear;
          dateObj.month = dateObj.curMonth;
          dateObj.day = dateObj.curDay;
          this.dateHandle(0, dateObj);
        } else {
          let date = new Date();
          let dateObj = {
            curYear: date.getFullYear(),
            curMonth: date.getMonth() + 1,
            curDay: this.isSelect
              ? this.isZero
                ? date.getDate() < 10
                  ? '0' + date.getDate()
                  : date.getDate() + ''
                : date.getDate() + ''
              : '',
          };
          dateObj.year = dateObj.curYear;
          dateObj.month = dateObj.curMonth;
          dateObj.day = dateObj.curDay;
          this.dateHandle(0, dateObj);
        }
      },
      initTime() {
        this.isPeriod
          ? this.timeObj.hour = 12
          : this.timeObj.hour = 24;
        this.timeObj.min = 60;
      }
    },
    created() {//渲染前执行
    },
    mounted() {//渲染后执行
      switch (this.type) {
        case 'date':
          this.initDate();
          break;
        case 'time':
          this.initTime();
          break;
        case 'datetime':
          this.initDate();
          this.initTime();
          break;
        default:
          this.initDate();
          break;
      }
      this.dateDes[this.startState] = this.getDate().date;
      this.dateDes[this.startState + 1] = this.getDate().date;
    },
    computed: {},
  })
</script>
