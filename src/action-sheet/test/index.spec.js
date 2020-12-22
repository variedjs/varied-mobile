import { mount, shallowMount } from "@vue/test-utils";
import ActionSheet from "..";
import { later } from "../../../test";

test("should emit select event after clicking option", () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      actions: [{ name: "Option" }]
    }
  });

  wrapper.find(".vm-action-sheet-item").trigger("click");
  expect(wrapper.emitted("select").length).toEqual(1);
  expect(wrapper.emitted("select")[0][0]).toEqual({ name: "Option" });
});

test("should call callback function after clicking option", () => {
  const callback = jest.fn();
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      actions: [{ name: "Option", callback }]
    }
  });

  wrapper.find(".vm-action-sheet-item").trigger("click");
  expect(callback).toHaveBeenCalledTimes(1);
});

test("should not emit select event after clicking loading option", () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      actions: [{ name: "Option", loading: true }]
    }
  });

  wrapper.find(".vm-action-sheet-item").trigger("click");
  expect(wrapper.emitted("select")).toBeFalsy();
});

test("should not emit select event after clicking disabled option", () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      actions: [{ name: "Option", disabled: true }]
    }
  });

  wrapper.find(".vm-action-sheet-item").trigger("click");
  expect(wrapper.emitted("select")).toBeFalsy();
});

test("should emit cancel event after clicking cancel button", () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      actions: [{ name: "Option" }],
      cancelText: "Cancel"
    }
  });

  wrapper.find(".vm-action-sheet-cancel").trigger("click");
  expect(wrapper.emitted("cancel").length).toEqual(1);
});

test("should render subname correctly", () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      actions: [{ name: "Option", subname: "Subname" }],
      cancelText: "Cancel"
    }
  });

  expect(wrapper.find(".vm-action-sheet-item").html()).toMatchSnapshot();
});

test("should render content after disabling the lazy-render prop", async () => {
  const wrapper = mount(ActionSheet);
  expect(wrapper.find(".vm-action-sheet-content").exists()).toBeFalsy();

  await wrapper.setProps({ lazyRender: false });
  expect(wrapper.find(".vm-action-sheet-content").exists()).toBeTruthy();
});

test("should render default slot correctly", () => {
  const wrapper = shallowMount(ActionSheet, {
    props: {
      value: true,
      title: "Title"
    },
    slots: {
      default: `<div>内容</div>`
    }
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should have "vm-popup-round" class when setting the round prop', () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      round: true
    }
  });

  expect(wrapper.find(".vm-popup-round").exists()).toBeTruthy();
});

test("should change option color when using the color prop", () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      actions: [{ name: "Option", color: "red" }]
    }
  });

  expect(wrapper.find(".vm-action-sheet-item").element.style.color).toEqual(
    "red"
  );
});

test("should hide close icon when the closeable prop is false", async () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      title: "Title"
    }
  });

  expect(wrapper.find(".vm-action-sheet-close").exists()).toBeTruthy();

  await wrapper.setProps({ closeable: false });
  expect(wrapper.find(".vm-action-sheet-close").exists()).toBeFalsy();
});

test("should allow to custom close icon with closeIcon prop", () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      title: "Title",
      closeIcon: "cross"
    }
  });

  expect(wrapper.find(".vm-action-sheet-close").html()).toMatchSnapshot();
});

test("should render description correctly", () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      description: "This is a description"
    }
  });

  expect(wrapper.find(".vm-action-sheet-description").html()).toMatchSnapshot();
});

test("should render description slot when match snapshot", () => {
  const wrapper = shallowMount(ActionSheet, {
    props: {
      value: true
    },
    slots: {
      description: `<div>Custom Description</div>`
    }
  });

  expect(wrapper.find(".vm-action-sheet-description").html()).toMatchSnapshot();
});

test("should close after clicking option if close-on-click-action prop is true", () => {
  const wrapper = mount(ActionSheet, {
    propsData: {
      value: true,
      actions: [{ name: "Option" }],
      closeOnClickAction: true
    }
  });

  const option = wrapper.find(".vm-action-sheet-item");
  option.trigger("click");

  expect(wrapper.emitted("input").length).toEqual(1);
  expect(wrapper.emitted("input")[0][0]).toEqual(false);
});
