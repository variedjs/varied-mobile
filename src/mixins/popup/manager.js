import Vue from "vue";
import context from "./context";
import Overlay from "../../overlay";

const defaultConfig = {
  className: "",
  customStyle: {}
};

export default {
  open(vm, config) {
    /* istanbul ignore next */
    if (!context.stack.some(item => item.vm === vm)) {
      const el = vm.$el;
      const target = el && el.parentNode ? el.parentNode : document.body;
      context.stack.push({ vm, config, target });
      this.update();
    }
  },

  close(vm) {
    const { stack } = context;
    // console.log(vm.close());
    if (stack.length) {
      if (context.top.vm === vm) {
        stack.pop();
        this.update();
      } else {
        context.stack = stack.filter(item => item.vm !== vm);
      }
    }
  },

  update() {
    let { modal } = context;

    if (!modal) {
      modal = new (Vue.extend(Overlay))({
        el: document.createElement("div")
      });
      modal.$on("click", this.onClick);

      context.modal = modal;
    }

    if (modal.$el.parentNode) {
      modal.show = false;
    }

    if (context.top) {
      const { target, config } = context.top;

      target.appendChild(modal.$el);
      Object.assign(modal, defaultConfig, config, {
        show: true
      });
    }
  },

  // close popup when click modal && closeOnClickOverlay is true
  onClick() {
    /* istanbul ignore else */
    if (context.top) {
      const { vm } = context.top;
      vm.$emit("click-overlay");

      if (vm.closeOnClickOverlay) {
        if (vm.onClickOverlay) {
          vm.onClickOverlay();
        } else {
          vm.close();
        }
      }
    }
  }
};
