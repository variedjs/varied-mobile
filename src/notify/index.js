import Vue from "vue";
import VmNotify from "./Notify";
import { isObj, isServer } from "../utils";
import { mount } from "../utils/functional";

let timer;
let instance;

function parseOptions(message) {
  return isObj(message) ? message : { message };
}

function Notify(options) {
  /* istanbul ignore if */
  if (isServer) {
    return;
  }

  if (!instance) {
    instance = mount(VmNotify, {
      on: {
        open(event) {
          if (instance.onClick) {
            instance.onClick(event);
          }
        },
        close() {
          if (instance.onClose) {
            instance.onClose();
          }
        },
        opened() {
          if (instance.onOpened) {
            instance.onOpened();
          }
        }
      }
    });
  }

  options = {
    ...Notify.currentOptions,
    ...parseOptions(options)
  };

  Object.assign(instance, options);
  clearTimeout(timer);

  if (options.duration && options.duration > 0) {
    timer = setTimeout(Notify.clear, options.duration);
  }

  return instance;
}

function defaultOptions() {
  return {
    type: "danger",
    value: true,
    message: "",
    color: undefined,
    background: undefined,
    duration: 3000,
    className: "",
    onClose: null,
    onClick: null,
    onOpened: null
  };
}

Notify.clear = () => {
  if (instance) {
    instance.value = false;
  }
};

Notify.currentOptions = defaultOptions();

Notify.setDefaultOptions = options => {
  Object.assign(Notify.currentOptions, options);
};

Notify.resetDefaultOptions = () => {
  Notify.currentOptions = defaultOptions();
};

Notify.install = () => {
  Vue.use(VmNotify);
};

Notify.Component = VmNotify;

Vue.prototype.$notify = Notify;

export default Notify;
