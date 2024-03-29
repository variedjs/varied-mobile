import Vue from "vue";
import VueImagePreview from "./ImagePreview";
import { isServer } from "../utils";

let instance;

const defaultConfig = {
  loop: true,
  value: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onClose: null,
  onChange: null,
  className: "",
  showIndex: true,
  closeable: false,
  closeIcon: "close",
  asyncClose: false,
  getContainer: "body",
  startPosition: 0,
  swipeDuration: 500,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: "top-right"
};

const initInstance = () => {
  instance = new (Vue.extend(VueImagePreview))({
    el: document.createElement("div")
  });
  document.body.appendChild(instance.$el);
};

const ImagePreview = (images, startPosition = 0) => {
  /* istanbul ignore if */
  if (isServer) {
    return;
  }

  if (!instance) {
    initInstance();
  }

  const options = Array.isArray(images) ? { images, startPosition } : images;

  Object.assign(instance, defaultConfig, options);

  instance.$once("input", show => {
    instance.value = show;
  });

  instance.$once("closed", () => {
    instance.images = [];
  });

  if (options.onClose) {
    instance.$off("close");
    instance.$once("close", options.onClose);
  }

  return instance;
};

ImagePreview.install = () => {
  Vue.use(VueImagePreview);
};

export default ImagePreview;
