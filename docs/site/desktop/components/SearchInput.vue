<template>
  <div class="vm-doc-search">
    <input
      v-model="searchText"
      class="vm-doc-search-input"
      :placeholder="searchPlaceholder"
      @focus="showContent = true"
      @blur="showContent = false"
    />
    <div v-show="show" class="vm-doc-search-content">
      <div
        @mousedown="onClick(item.path)"
        class="cell"
        v-for="(item, index) in searchResults"
        :key="index"
        v-html="titleFilter(item.title)"
      ></div>
    </div>
  </div>
</template>

<script>
import config from "../../doc.config";
export default {
  name: "vm-doc-search",

  data() {
    return {
      list: [],
      showContent: false,
      searchPlaceholder: "搜索文档...",
      searchText: ""
    };
  },

  props: {
    lang: String,
    searchConfig: Object
  },

  methods: {
    titleFilter(val) {
      return val.replace(
        new RegExp(`(${this.searchText})`, "gi"),
        "<span>$1</span>"
      );
    },
    onClick(path) {
      this.showContent = false;
      path !== this.$route.path && this.$router.push(path);
    }
  },

  computed: {
    show() {
      return this.searchResults.length > 0 && this.showContent;
    },
    searchResults() {
      let result = [];
      if (this.searchText) {
        result = this.list.filter(value => {
          return (
            value.title.toLowerCase().indexOf(this.searchText.toLowerCase()) >
            -1
          );
        });
      }
      return result.splice(0, 10);
    }
  },

  mounted() {
    config.nav.forEach(nav => {
      nav.groups.forEach(group => {
        group.list.forEach(item => {
          this.list.push(item);
        });
      });
    });
  }
};
</script>

<style lang="less">
@import "../style/variable";
.vm-doc-search {
  position: relative;
  &-input {
    height: 60px;
    width: 200px;
    border: none;
    color: #fff;
    font-size: 14px;
    margin-left: 140px;
    background-color: transparent;

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 0.7;
      color: #fff;
    }
  }
  &-content {
    line-height: normal;
    position: absolute;
    top: 62px;
    left: 140px;
    width: 260px;
    background-color: #fff;
    z-index: 100000;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border-radius: 6px;

    .cell {
      color: #333;
      display: block;
      padding: 10px 16px;
      border-bottom: 1px solid #eee;

      span {
        color: #0c7cd5;
      }
    }
  }
}

.ds-dropdown-menu {
  line-height: 1.8;
}

.algolia-autocomplete {
  .algolia-docsearch-suggestion--highlight {
    color: @vm-doc-blue;
    background-color: transparent;
  }

  .algolia-docsearch-suggestion--title {
    font-weight: 500;
  }

  .algolia-docsearch-suggestion--text {
    .algolia-docsearch-suggestion--highlight {
      box-shadow: inset 0 -1px 0 0 @vm-doc-blue;
    }
  }

  .algolia-docsearch-suggestion--category-header {
    border-bottom-color: #eee;
  }

  .ds-dropdown-menu [class^="ds-dataset-"] {
    border: none;
  }

  .ds-dropdown-menu {
    top: 80% !important;
    box-shadow: 0 4px 12px #ebedf0;

    &:before {
      display: none;
    }
  }
}
</style>
