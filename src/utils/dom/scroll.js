import { isServer } from "../index";

function isWindow(val) {
  return val === window;
}

const overflowScrollReg = /scroll|auto/i;

export default {
  // get nearest scroll element
  getScrollEventTarget(element, root = window) {
    let node = element;

    while (
      node &&
      node.tagName !== "HTML" &&
      node.nodeType === 1 &&
      node !== root
    ) {
      const { overflowY } = window.getComputedStyle(node);

      if (overflowScrollReg.test(overflowY)) {
        if (node.tagName !== "BODY") {
          return node;
        }

        // see: https://github.com/youzan/vant/issues/3823
        const { overflowY: htmlOverflowY } = window.getComputedStyle(
          node.parentNode
        );

        if (overflowScrollReg.test(htmlOverflowY)) {
          return node;
        }
      }
      node = node.parentNode;
    }

    return root;
  },

  getScrollTop(element) {
    const top =
      "scrollTop" in element ? element.scrollTop : element.pageYOffset;

    // iOS scroll bounce cause minus scrollTop
    return Math.max(top, 0);
  },

  setScrollTop(element, value) {
    "scrollTop" in element
      ? (element.scrollTop = value)
      : element.scrollTo(element.scrollX, value);
  },

  // get distance from element top to page top
  getElementTop(element) {
    return (
      (element === window ? 0 : element.getBoundingClientRect().top) +
      this.getScrollTop(window)
    );
  },

  getVisibleHeight(element) {
    return element === window
      ? element.innerHeight
      : element.getBoundingClientRect().height;
  },

  getVisibleTop(element) {
    if (isWindow(element)) {
      return 0;
    }
    return element.getBoundingClientRect().top;
  },

  setRootScrollTop(value) {
    this.setScrollTop(window, value);
    this.setScrollTop(document.body, value);
  },

  getRootScrollTop() {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  },

  getComputedStyle:
    !isServer &&
    document.defaultView.getComputedStyle.bind(document.defaultView)
};
