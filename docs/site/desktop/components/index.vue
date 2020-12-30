<template>
  <div class="vm-doc">
    <vm-doc-header
      :lang="lang"
      :github="github"
      :versions="versions"
      :config="config.header"
      @switch-version="$emit('switch-version', $event)"
    />
    <vm-doc-nav :nav-config="config.nav" :base="base" />
    <vm-doc-container :has-simulator="!!(simulator || simulators.length)">
      <vm-doc-content>
        <slot />
      </vm-doc-content>
    </vm-doc-container>
    <vm-doc-simulator v-if="simulator" :src="simulator" />
    <vm-doc-simulator
      v-for="(url, index) in simulators"
      v-show="index === currentSimulator"
      :src="url"
      :key="url"
    />
  </div>
</template>

<script>
import VmDocHeader from "./Header";
import VmDocNav from "./Nav";
import VmDocContainer from "./Container";
import VmDocContent from "./Content";
import VmDocSimulator from "./Simulator";
export default {
  components: {
    VmDocHeader,
    VmDocNav,
    VmDocContainer,
    VmDocContent,
    VmDocSimulator
  },
  name: "vm-doc",

  props: {
    lang: String,
    github: String,
    versions: Array,
    currentSimulator: Number,
    simulator: String,
    config: {
      type: Object,
      required: true
    },
    simulators: {
      type: Array,
      default: () => []
    },
    base: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      nav: [],
      currentPath: null,
      leftNav: null,
      rightNav: null
    };
  },

  watch: {
    "$route.path"() {
      this.setNav();
      this.updateNav();
    }
  },

  created() {
    this.setNav();
    this.updateNav();
    this.keyboardHandler();
  },

  methods: {
    setNav() {
      const nav = this.config.nav;
      for (let i = 0; i < nav.length; i++) {
        const navItem = nav[i];
        if (!navItem.groups) {
          this.nav.push(nav[i]);
        } else {
          for (let j = 0; j < navItem.groups.length; j++) {
            this.nav = this.nav.concat(navItem.groups[j].list);
          }
        }
      }
    },

    updateNav() {
      let currentIndex;
      this.currentPath = "/" + this.$route.path.split("/").pop();
      for (let i = 0, len = this.nav.length; i < len; i++) {
        if (this.nav[i].path === this.currentPath) {
          currentIndex = i;
          break;
        }
      }
      this.leftNav = this.nav[currentIndex - 1];
      this.rightNav = this.nav[currentIndex + 1];
    },

    handleNavClick(direction) {
      const nav = direction === "prev" ? this.leftNav : this.rightNav;
      if (nav.path) {
        this.$router.push(this.base + nav.path);
      } else if (nav.link) {
        window.location.href = nav.link;
      }
    },

    keyboardHandler() {
      window.addEventListener("keyup", event => {
        switch (event.keyCode) {
          case 37: // left
            this.handleNavClick("prev");
            break;
          case 39: // right
            this.handleNavClick("next");
            break;
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../style/index";
</style>
