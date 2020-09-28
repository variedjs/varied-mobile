/**
 * @author Wuner
 * @date 2020/9/21 11:36
 * @description
 */
import { raf, cancel } from "../utils/dom/raf";
import scrollUtils from "../utils/dom/scroll";

let scrollLeftRafId;

export function scrollLeftTo(scroller, to, duration) {
  cancel(scrollLeftRafId);

  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);

  function animate() {
    scroller.scrollLeft += (to - from) / frames;

    if (++count < frames) {
      scrollLeftRafId = raf(animate);
    }
  }

  animate();
}

export function scrollTopTo(scroller, to, duration, callback) {
  let current = scrollUtils.getScrollTop(scroller);

  const isDown = current < to;
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);
  const step = (to - current) / frames;

  function animate() {
    current += step;

    if ((isDown && current > to) || (!isDown && current < to)) {
      current = to;
    }

    scrollUtils.setScrollTop(scroller, current);

    if ((isDown && current < to) || (!isDown && current > to)) {
      raf(animate);
    } else if (callback) {
      raf(callback);
    }
  }

  animate();
}
