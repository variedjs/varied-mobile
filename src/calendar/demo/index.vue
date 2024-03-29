<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <vm-cell
        is-link
        :title="t('selectSingle')"
        :value="formatFullDate(date.selectSingle)"
        @click="show('single', 'selectSingle')"
      />

      <vm-cell
        is-link
        :title="t('selectMultiple')"
        :value="formatMultiple(date.selectMultiple)"
        @click="show('multiple', 'selectMultiple')"
      />

      <vm-cell
        is-link
        :title="t('selectRange')"
        :value="formatRange(date.selectRange)"
        @click="show('range', 'selectRange')"
      />
    </demo-block>

    <demo-block card :title="t('quickSelect')">
      <vm-cell
        is-link
        :title="t('selectSingle')"
        :value="formatFullDate(date.quickSelect1)"
        @click="show('single', 'quickSelect1')"
      />

      <vm-cell
        is-link
        :title="t('selectRange')"
        :value="formatRange(date.quickSelect2)"
        @click="show('range', 'quickSelect2')"
      />
    </demo-block>

    <demo-block card :title="t('customCalendar')">
      <vm-cell
        is-link
        :title="t('customColor')"
        :value="formatRange(date.customColor)"
        @click="show('range', 'customColor')"
      />

      <vm-cell
        is-link
        :title="t('customRange')"
        :value="formatFullDate(date.customRange)"
        @click="show('single', 'customRange')"
      />

      <vm-cell
        is-link
        :title="t('customConfirm')"
        :value="formatRange(date.customConfirm)"
        @click="show('range', 'customConfirm')"
      />

      <vm-cell
        is-link
        :title="t('customDayText')"
        :value="formatRange(date.customDayText)"
        @click="show('range', 'customDayText')"
      />

      <vm-cell
        is-link
        :title="t('customPosition')"
        :value="formatFullDate(date.customPosition)"
        @click="show('single', 'customPosition')"
      />

      <vm-cell
        is-link
        :title="t('maxRange')"
        :value="formatRange(date.maxRange)"
        @click="show('range', 'maxRange')"
      />

      <vm-cell
        is-link
        :title="t('firstDayOfWeek')"
        @click="show('single', 'firstDayOfWeek')"
      />
    </demo-block>

    <demo-block card :title="t('tiledDisplay')">
      <vm-calendar
        :title="t('calendar')"
        :poppable="false"
        :show-confirm="false"
        :min-date="tiledMinDate"
        :max-date="tiledMaxDate"
        :default-date="tiledMinDate"
        :style="{ height: '500px' }"
      />
    </demo-block>

    <vm-calendar
      v-model="showCalendar"
      :type="type"
      :color="color"
      :background="background"
      :round="round"
      :position="position"
      :min-date="minDate"
      :max-date="maxDate"
      :max-range="maxRange"
      :formatter="formatter"
      :show-confirm="showConfirm"
      :confirm-text="confirmText"
      :confirm-disabled-text="confirmDisabledText"
      :first-day-of-week="firstDayOfWeek"
      @confirm="onConfirm"
    />
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        in: "入店",
        out: "离店",
        today: "今天",
        laborDay: "劳动节",
        youthDay: "青年节",
        calendar: "日历",
        maxRange: "日期区间最大范围",
        selectSingle: "选择单个日期",
        selectMultiple: "选择多个日期",
        selectRange: "选择日期区间",
        quickSelect: "快捷选择",
        confirmText: "完成",
        customColor: "自定义颜色",
        customRange: "自定义日期范围",
        customConfirm: "自定义按钮文字",
        customDayText: "自定义日期文案",
        customPosition: "自定义弹出位置",
        customCalendar: "自定义日历",
        confirmDisabledText: "请选择结束时间",
        firstDayOfWeek: "自定义周起始日",
        tiledDisplay: "平铺展示"
      },
      date: {
        maxRange: [],
        selectSingle: null,
        selectRange: [],
        selectMultiple: [],
        quickSelect1: null,
        quickSelect2: [],
        customColor: [],
        customConfirm: [],
        customRange: null,
        customDayText: [],
        customPosition: null
      },
      type: "single",
      round: true,
      color: undefined,
      background: undefined,
      minDate: undefined,
      maxDate: undefined,
      maxRange: undefined,
      position: undefined,
      formatter: undefined,
      showConfirm: false,
      showCalendar: false,
      tiledMinDate: new Date(2012, 0, 10),
      tiledMaxDate: new Date(2012, 2, 20),
      confirmText: undefined,
      confirmDisabledText: undefined,
      firstDayOfWeek: 0
    };
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    resetSettings() {
      this.round = true;
      this.color = undefined;
      this.minDate = undefined;
      this.maxDate = undefined;
      this.maxRange = undefined;
      this.position = undefined;
      this.formatter = undefined;
      this.showConfirm = true;
      this.confirmText = undefined;
      this.confirmDisabledText = undefined;
      this.firstDayOfWeek = 0;
    },

    show(type, id) {
      this.resetSettings();
      this.id = id;
      this.type = type;
      this.showCalendar = true;

      switch (id) {
        case "quickSelect1":
        case "quickSelect2":
          this.showConfirm = false;
          break;
        case "customColor":
          this.color = "#fff";
          this.background = "#07c160";
          break;
        case "customConfirm":
          this.confirmText = this.t("confirmText");
          this.confirmDisabledText = this.t("confirmDisabledText");
          break;
        case "customRange":
          this.minDate = new Date(2010, 0, 1);
          this.maxDate = new Date(2010, 0, 31);
          break;
        case "customDayText":
          this.minDate = new Date(2010, 4, 1);
          this.maxDate = new Date(2010, 4, 31);
          this.formatter = this.dayFormatter;
          break;
        case "customPosition":
          this.round = false;
          this.position = "right";
          break;
        case "maxRange":
          this.maxRange = 3;
          break;
        case "firstDayOfWeek":
          this.firstDayOfWeek = 1;
          break;
      }
    },

    dayFormatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();

      if (month === 5) {
        if (date === 1) {
          day.topInfo = this.t("laborDay");
        } else if (date === 4) {
          day.topInfo = this.t("youthDay");
        } else if (date === 11) {
          day.text = this.t("today");
        }
      }

      if (day.type === "start") {
        day.bottomInfo = this.t("in");
      } else if (day.type === "end") {
        day.bottomInfo = this.t("out");
      }

      return day;
    },

    formatDate(date) {
      if (date) {
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }
    },

    formatFullDate(date) {
      if (date) {
        return `${date.getFullYear()}/${this.formatDate(date)}`;
      }
    },

    formatMultiple(dates) {
      if (dates.length) {
        return `选择了 ${dates.length} 个日期`;
      }
    },

    formatRange(dateRange) {
      if (dateRange.length) {
        const [start, end] = dateRange;
        return `${this.formatDate(start)} - ${this.formatDate(end)}`;
      }
    },

    onConfirm(date) {
      this.showCalendar = false;
      this.date[this.id] = date;
    }
  }
};
</script>
