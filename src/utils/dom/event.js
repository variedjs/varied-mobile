/* eslint-disable no-empty */
/* eslint-disable getter-return */
import { isServer } from "../index";

export let supportsPassive = false;

if (!isServer) {
  try {
    const opts = {};
    Object.defineProperty(opts, "passive", {
      get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {}
}

export function on(target, event, handler, passive = false) {
  !isServer &&
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    );
}

export function off(target, event, handler) {
  !isServer && target.removeEventListener(event, handler);
}

export function stopPropagation(event) {
  event.stopPropagation();
}

export function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}
