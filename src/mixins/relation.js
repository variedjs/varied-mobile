import { sortChildren } from "../utils/vnodes";

export function ChildrenMixin(parent, options = {}) {
  const indexKey = options.indexKey || "index";

  return {
    inject: {
      [parent]: {
        default: null
      }
    },

    computed: {
      parents() {
        if (this.disableBindRelation) {
          return null;
        }
        return this[parent];
      },

      [indexKey]() {
        this.bindRelation();
        if (this.parents) {
          return this.parents.children.indexOf(this);
        }

        return null;
      }
    },

    watch: {
      disableBindRelation(val) {
        if (!val) {
          this.bindRelation();
        }
      }
    },

    mounted() {
      this.bindRelation();
    },

    beforeDestroy() {
      if (this.parents) {
        this.parents.children = this.parents.children.filter(
          item => item !== this
        );
      }
    },

    methods: {
      bindRelation() {
        if (!this.parents || this.parents.children.indexOf(this) !== -1) {
          return;
        }

        const children = [...this.parents.children, this];

        sortChildren(children, this.parents);

        this.parents.children = children;
      }
    }
  };
}

export function ParentMixin(parent) {
  return {
    provide() {
      return {
        [parent]: this
      };
    },

    data() {
      return {
        children: []
      };
    }
  };
}
