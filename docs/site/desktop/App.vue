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
      <router-view @changeDemoURL="onChangeDemoURL"/>
    </van-doc>
    <div
      @click="jump"
      class="bottom"
      style="height: 50px;
      line-height:50px;
      text-align: center;
      background-color: #fff;
      color: #108EE9;
      font-size: 12px;
      cursor: pointer">
      备案号：晋ICP备19014733号-1
    </div>
  </div>
</template>

<script>
  import pkgJson from '../../../package.json';
  import docConfig, {github, versions} from '../doc.config';

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
        const {name} = this.$route;
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
      },
      jump() {
        window.location.href = 'http://www.beian.miit.gov.cn';
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

  .van-doc {
    code {
      background-color: #f2f2f2;
      padding: 10px;
      border-radius: 3px;
    }
  }
</style>
