import Vue, { CreateElement } from "vue";
import { mount, later } from ".";

const Empty = {
  render(h) {
    return h("div", [this.$slots.default]);
  },
  inheritAttrs: false
};

Vue.component("demo-block", Empty);
Vue.component("demo-section", Empty);

export function snapshotDemo(Demo, option = {}) {
  test("renders demo correctly", async () => {
    if (option.beforeTest) {
      option.beforeTest();
    }

    if (Demo.i18n) {
      Locale.add(Demo.i18n);
    }

    const wrapper = mount(Demo);

    await later();

    expect(wrapper).toMatchSnapshot();

    if (option.afterTest) {
      option.afterTest();
    }
  });
}
