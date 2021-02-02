<template>
  <ul :class="b({ simple })">
    <li
      :class="[b('item', { disabled: value === 1 }), b('prev'), 'vm-hairline']"
      @click="onSelect(value - 1)"
    >
      <slot name="prev-text">
        {{ prevText || "上一页" }}
      </slot>
    </li>
    <li
      v-for="(page, index) in pages"
      :key="index"
      :class="[b('item', { active: page.active }), b('page'), 'vm-hairline']"
      @click="onSelect(page.number)"
    >
      <slot name="page" v-bind="page">
        {{ page.text }}
      </slot>
    </li>
    <li v-if="simple" :class="b('page-desc')">
      <slot name="pageDesc">
        {{ `${value} / ${count}` }}
      </slot>
    </li>
    <li
      :class="[
        b('item', { disabled: value === count }),
        b('next'),
        'vm-hairline'
      ]"
      @click="onSelect(value + 1)"
    >
      <slot name="next-text">
        {{ nextText || "下一页" }}
      </slot>
    </li>
  </ul>
</template>
<script>
import create from "../utils/create";

function makePage(number, text, active) {
  return { number, text, active };
}

export default create({
  name: "pagination",
  props: {
    prevText: String,
    nextText: String,
    forceEllipses: Boolean,
    mode: {
      type: String,
      default: "multi"
    },
    value: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: [Number, String],
      default: 0
    },
    totalItems: {
      type: [Number, String],
      default: 0
    },
    itemsPerPage: {
      type: [Number, String],
      default: 10
    },
    showPageSize: {
      type: [Number, String],
      default: 5
    }
  },

  computed: {
    simple() {
      return this.mode !== "multi";
    },

    count() {
      const count =
        this.pageCount || Math.ceil(this.totalItems / this.itemsPerPage);
      return Math.max(1, count);
    },

    pages() {
      const pages = [];
      const pageCount = this.count;
      const showPageSize = +this.showPageSize;

      if (this.mode !== "multi") {
        return pages;
      }

      // Default page limits
      let startPage = 1;
      let endPage = pageCount;
      const isMaxSized = showPageSize < pageCount;

      // recompute if showPageSize
      if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(this.value - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1;

        // Adjust if limit is exceeded
        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      }

      // Add page number links
      for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, number, number === this.value);
        pages.push(page);
      }

      // Add links to move between page sets
      if (isMaxSized && showPageSize > 0 && this.forceEllipses) {
        if (startPage > 1) {
          const previousPageSet = makePage(startPage - 1, "...", false);
          pages.unshift(previousPageSet);
        }

        if (endPage < pageCount) {
          const nextPageSet = makePage(endPage + 1, "...", false);
          pages.push(nextPageSet);
        }
      }

      return pages;
    }
  },

  watch: {
    value: {
      handler(page) {
        this.select(page || this.value);
      },
      immediate: true
    }
  },

  methods: {
    select(page, emitChange) {
      page = Math.min(this.count, Math.max(1, page));
      if (this.value !== page) {
        this.$emit("input", page);

        if (emitChange) {
          this.$emit("change", page);
        }
      }
    },
    onSelect(value) {
      this.select(value, true);
    }
  }
});
</script>
