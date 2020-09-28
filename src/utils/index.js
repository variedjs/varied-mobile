import Vue from "vue";

const isServer = Vue.prototype.$isServer;
const inBrowser = typeof window !== "undefined";

function isDef(value) {
  return value !== undefined && value !== null;
}

function isObj(x) {
  const type = typeof x;
  return x !== null && (type === "object" || type === "function");
}

function get(object, path) {
  const keys = path.split(".");
  let result = object;

  keys.forEach(key => {
    result = isDef(result[key]) ? result[key] : "";
  });

  return result;
}

const camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

function isAndroid() {
  /* istanbul ignore next */
  return isServer ? false : /android/.test(navigator.userAgent.toLowerCase());
}

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function isFunction(val) {
  return typeof val === "function";
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

function isPromise(val) {
  return isObj(val) && isFunction(val.then) && isFunction(val.catch);
}

export {
  get,
  range,
  isObj,
  isDef,
  isServer,
  camelize,
  isAndroid,
  inBrowser,
  isFunction,
  noop,
  isPromise
};
