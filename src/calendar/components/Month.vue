<template>
  <div :class="b('month')" ref="month" :style="monthStyle">
    <div v-if="showMonthTitle" :class="b('month-title')">
      {{ title }}
    </div>
    <div v-if="shouldRender" ref="days" role="grid" :class="b('days')">
      <div v-if="showMark" :class="b('month-mark')">
        {{ date.getMonth() + 1 }}
      </div>
      <div
        v-for="(item, index) in days"
        :key="index + '' + item.text"
        ref="day"
        refInFor
        role="gridcell"
        :style="getDayStyle(item.type, index)"
        :class="[b('day', item.type), item.className]"
        :tabindex="type === 'disabled' ? null : -1"
        @click="onClick(item)"
      >
        <div
          :class="item.type === 'selected' ? b('selected-day') : ''"
          :style="item.type === 'selected' ? selectedStyle : null"
        >
          <div v-if="item.topInfo" :class="b('top-info')">
            {{ item.topInfo }}
          </div>
          {{ item.text }}
          <div v-if="item.bottomInfo" :class="b('bottom-info')">
            {{ item.bottomInfo }}
          </div>
        </div>
      </div>
    </div>
    <div v-else ref="days"></div>
  </div>
</template>

<script>
import { addUnit } from "../../utils/format/unit";
import {
  compareDay,
  getPrevDay,
  getNextDay,
  formatMonthTitle,
  getMonthEndDay
} from "../utils";
import Scroll from "../../utils/dom/scroll";

export default {
  name: "month",
  props: {
    b: Function,
    date: Date,
    type: String,
    color: String,
    minDate: Date,
    maxDate: Date,
    showMark: Boolean,
    rowHeight: [Number, String],
    formatter: Function,
    lazyRender: Boolean,
    currentDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    realRowHeight: Number,
    showMonthTitle: Boolean,
    firstDayOfWeek: Number
  },
  watch: {
    shouldRender(value) {
      if (value) {
        this.$nextTick(() => {
          if (this.$refs.day[0] && !this.realRowHeight) {
            const { height } = this.$refs.day[0].getBoundingClientRect();
            this.$emit("update-height", height);
          }
        });
      }
    },
    realRowHeight() {
      this.height = null;
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onClick(item) {
      if (item.type !== "disabled") {
        this.$emit("click", item);
      }
    },
    getHeight() {
      if (!this.height) {
        this.height = this.$el.getBoundingClientRect().height;
      }
      return this.height;
    },

    scrollIntoView(body) {
      const { days, month } = this.$refs;
      const el = this.showSubtitle ? days : month;

      const scrollTop =
        el.getBoundingClientRect().top -
        body.getBoundingClientRect().top +
        body.scrollTop;

      Scroll.setScrollTop(body, scrollTop);
    },

    getMultipleDayType(day) {
      const isSelected = date =>
        this.currentDate.some(item => compareDay(item, date) === 0);

      if (isSelected(day)) {
        const prevDay = getPrevDay(day);
        const nextDay = getNextDay(day);
        const prevSelected = isSelected(prevDay);
        const nextSelected = isSelected(nextDay);

        if (prevSelected && nextSelected) {
          return "multiple-middle";
        }

        if (prevSelected) {
          return "end";
        }

        return nextSelected ? "start" : "multiple-selected";
      }

      return "";
    },

    getRangeDayType(day) {
      const [startDay, endDay] = this.currentDate;

      if (!startDay) {
        return "";
      }

      const compareToStart = compareDay(day, startDay);

      if (!endDay) {
        return compareToStart === 0 ? "start" : "";
      }

      const compareToEnd = compareDay(day, endDay);

      if (compareToStart === 0 && compareToEnd === 0 && this.allowSameDay) {
        return "start-end";
      }

      if (compareToStart === 0) {
        return "start";
      }

      if (compareToEnd === 0) {
        return "end";
      }

      if (compareToStart > 0 && compareToEnd < 0) {
        return "middle";
      }
    },

    getDayType(day) {
      const { type, minDate, maxDate, currentDate } = this;

      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return "disabled";
      }

      if (currentDate === null) {
        return;
      }

      if (type === "single") {
        return compareDay(day, currentDate) === 0 ? "selected" : "";
      }

      if (type === "multiple") {
        return this.getMultipleDayType(day);
      }

      /* istanbul ignore else */
      if (type === "range") {
        return this.getRangeDayType(day);
      }
    },

    getBottomInfo(type) {
      if (this.type === "range") {
        if (type === "start") {
          return "开始";
        }
        if (type === "end") {
          return "结束";
        }
        if (type === "start-end") {
          return "开始/结束";
        }
      }
    },

    getDayStyle(type, index) {
      const style = {
        height: this.rowHeightWithUnit
      };

      if (index === 0) {
        style.marginLeft = `${(100 * this.offset) / 7}%`;
      }

      if (this.color) {
        if (
          type === "start" ||
          type === "end" ||
          type === "start-end" ||
          type === "multiple-selected" ||
          type === "multiple-middle"
        ) {
          style.background = this.color;
        } else if (type === "middle") {
          style.color = this.color;
        }
      }

      return style;
    }
  },
  computed: {
    selectedStyle() {
      return {
        width: this.rowHeightWithUnit,
        height: this.rowHeightWithUnit,
        background: this.color
      };
    },
    title() {
      return formatMonthTitle(this.date);
    },
    rowHeightWithUnit() {
      return addUnit(this.rowHeight);
    },
    offset() {
      const { firstDayOfWeek } = this;

      const realDay = this.date.getDay();

      if (!firstDayOfWeek) {
        return realDay;
      }

      return (realDay + 7 - this.firstDayOfWeek) % 7;
    },
    totalDay() {
      return getMonthEndDay(this.date.getFullYear(), this.date.getMonth() + 1);
    },
    shouldRender() {
      return this.visible || !this.lazyRender;
    },
    monthStyle() {
      if (!this.shouldRender) {
        const padding =
          Math.ceil((this.totalDay + this.offset) / 7) * this.realRowHeight;
        return {
          paddingBottom: `${padding}px`
        };
      }
    },
    days() {
      const days = [];
      const year = this.date.getFullYear();
      const month = this.date.getMonth();

      for (let day = 1; day <= this.totalDay; day++) {
        const date = new Date(year, month, day);
        const type = this.getDayType(date);

        let config = {
          date,
          type,
          text: day,
          bottomInfo: this.getBottomInfo(type)
        };

        if (this.formatter) {
          config = this.formatter(config);
        }

        days.push(config);
      }

      return days;
    }
  }
};
</script>
