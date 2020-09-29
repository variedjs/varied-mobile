/**
 * Demo Common Mixin && i18n
 */

import Vue from "vue";
import VueRouter from "vue-router";
import VantDoc from "@vant/doc";
import Varied from "../../../src";

Vue.use(Varied)
  .use(VantDoc)
  .use(VueRouter);

export function demoWrapper(module, name) {
  const component = module.default;
  name = "demo-" + name;
  component.name = name;
  return component;
}
