<template>
  <input class="van-doc-search" :placeholder="placeholder" />
</template>

<script>
export default {
  name: "van-doc-search",

  props: {
    lang: String,
    searchConfig: Object
  },

  computed: {
    placeholder() {
      return this.searchConfig.placeholder || "Search...";
    }
  },

  watch: {
    lang(lang) {
      if (this.docsearchInstance) {
        this.docsearchInstance.algoliaOptions.facetFilters = [`lang:${lang}`];
      }
    }
  },

  mounted() {
    if (this.searchConfig) {
      this.docsearchInstance = window.docsearch({
        ...this.searchConfig,
        inputSelector: ".van-doc-search"
      });
    }
  }
};
</script>
