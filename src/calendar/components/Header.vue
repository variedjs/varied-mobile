<template>
  <div :class="b('header')">
    <div v-if="showTitle" :class="b('header-title')">
      <slot name="title">
        <span>{{ title || "日期选择" }}</span>
      </slot>
    </div>
    <div v-if="showSubtitle" :class="b('header-subtitle')">
      {{ subtitle }}
    </div>
    <div :class="b('weekdays')">
      <span
        v-for="(item, index) in renderWeekDays"
        :key="index"
        :class="b('weekday')"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "vm-header",
  props: {
    b: Function,
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  data() {
    return {
      weekdays: ["日", "一", "二", "三", "四", "五", "六"]
    };
  },
  computed: {
    renderWeekDays() {
      const { firstDayOfWeek, weekdays } = this;

      return [
        ...weekdays.slice(firstDayOfWeek, 7),
        ...weekdays.slice(0, firstDayOfWeek)
      ];
    }
  }
};
</script>
