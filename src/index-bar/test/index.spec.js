import { mount, trigger, triggerDrag, mockScrollIntoView } from "../../../test";
import indexAnchor from "../../index-anchor";
import indexBar from "../";

test("should allow to custom anchor text", () => {
  const wrapper = mount(
    {
      template: `
      <vm-index-bar>
        <vm-index-anchor index="A">Title A</vm-index-anchor>
        <vm-index-anchor index="B">Title B</vm-index-anchor>
      </vm-index-bar>
    `
    },
    {
      stubs: {
        "vm-index-bar": indexBar,
        "vm-index-anchor": indexAnchor
      }
    }
  );

  expect(wrapper).toMatchSnapshot();
});

test("should scroll to anchor and emit select event after clicking the index-bar", () => {
  const onSelect = jest.fn();
  const wrapper = mount(
    {
      template: `
      <vm-index-bar @select="onSelect">
        <vm-index-anchor index="A" />
        <vm-index-anchor index="B" />
      </vm-index-bar>
    `,
      methods: {
        onSelect
      }
    },
    {
      stubs: {
        "vm-index-bar": indexBar,
        "vm-index-anchor": indexAnchor
      }
    }
  );

  const fn = mockScrollIntoView();
  const indexes = wrapper.findAll(".vm-index-bar-index");
  indexes.at(0).trigger("click");

  expect(fn).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenCalledWith("A");
});

test("should scroll to anchor after touching the index-bar", () => {
  const onSelect = jest.fn();
  const wrapper = mount(
    {
      template: `
      <vm-index-bar @select="onSelect">
        <vm-index-anchor index="A" />
        <vm-index-anchor index="B" />
        <vm-index-anchor index="XXX" />
      </vm-index-bar>
    `,
      methods: {
        onSelect
      }
    },
    {
      stubs: {
        "vm-index-bar": indexBar,
        "vm-index-anchor": indexAnchor
      }
    }
  );

  const fn = mockScrollIntoView();
  const sidebar = wrapper.find(".vm-index-bar-sidebar");
  const indexes = wrapper.findAll(".vm-index-bar-index");

  document.elementFromPoint = function(x, y) {
    const index = y / 100;

    if (index === 1 || index === 2) {
      return indexes.at(index).element;
    }

    if (index === 3) {
      return {
        dataset: {}
      };
    }
  };

  // horizontal drag
  triggerDrag(sidebar, 100, 0);
  expect(fn).toHaveBeenCalledTimes(0);

  // vertical drag
  trigger(sidebar, "touchstart", 0, 0);
  trigger(sidebar, "touchmove", 0, 100);
  trigger(sidebar, "touchmove", 0, 200);
  trigger(sidebar, "touchmove", 0, 300);
  trigger(sidebar, "touchmove", 0, 400);
  trigger(sidebar, "touchend", 0, 400);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenCalledWith("B");
});

test("should update active anchor after page scroll", () => {
  const nativeRect = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function() {
    const { index } = this.dataset;
    return {
      top: index ? index * 10 : 0,
      height: 10
    };
  };

  const wrapper = mount(
    {
      template: `
      <vm-index-bar :sticky="sticky">
        <vm-index-anchor
          v-for="index in 4"
          :key="index"
          :index="index"
          :data-index="index - 1"
        />
      </vm-index-bar>
    `,
      data() {
        return {
          sticky: false
        };
      }
    },
    {
      stubs: {
        "vm-index-bar": indexBar,
        "vm-index-anchor": indexAnchor
      }
    }
  );

  window.scrollTop = 0;
  trigger(window, "scroll");
  expect(wrapper).toMatchSnapshot();

  wrapper.setData({ sticky: true });
  trigger(window, "scroll");
  expect(wrapper).toMatchSnapshot();
  wrapper.vm.$destroy();

  Element.prototype.getBoundingClientRect = nativeRect;
});
