<template>
  <div class="app">
    <van-doc
      :base="base"
      :config="config"
      :github="github"
      :versions="versions"
      :simulators="simulators"
      :current-simulator="currentSimulator"
      @switch-version="onSwitchVersion"
    >
      <router-view @changeDemoURL="onChangeDemoURL" />
    </van-doc>
  </div>
</template>

<script>
import pkgJson from '../../../package.json';
import docConfig, { github, versions } from '../doc.config';

export default {
  data() {
    this.github = github;
    this.versions = versions;

    return {
      simulators: [`mobile.html${location.hash}`],
      demoURL: ''
    };
  },

  computed: {
    base() {
      return ``;
    },

    config() {
      return docConfig;
    },

    currentSimulator() {
      const { name } = this.$route;
      return name && name.indexOf('demo') !== -1 ? 1 : 0;
    }
  },

  methods: {
    onChangeDemoURL(url) {
      this.simulators = [this.simulators[0], url];
    },

    onSwitchVersion(version) {
      if (version !== pkgJson.version) {
      }
    }
  }
};
</script>

<style lang="less">
.van-doc-intro {
  padding-top: 20px;
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  text-align: center;

  p {
    margin-bottom: 20px;
  }
}
  .van-doc{
    code{
      background-color: #f2f2f2;
      padding: 10px;
      border-radius: 3px;
    }
  }
</style>
